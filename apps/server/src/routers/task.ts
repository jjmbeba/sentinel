import { TRPCError } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { tags, tasks, taskTags } from "@/db/schema/core";
import { db } from "../db";
import { publicProcedure, router } from "../lib/trpc";

export const taskRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.session?.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const tasksWithTags = await db
			.select({
				task: tasks,
				tag: tags,
			})
			.from(tasks)
			.leftJoin(taskTags, eq(tasks.id, taskTags.taskId))
			.leftJoin(tags, eq(taskTags.tagId, tags.id))
			.where(eq(tasks.userId, ctx.session.user.id));

		// Group tasks with their tags
		const taskMap = new Map();

		for (const row of tasksWithTags) {
			const taskId = row.task.id;

			if (!taskMap.has(taskId)) {
				taskMap.set(taskId, {
					...row.task,
					tags: [],
				});
			}

			if (row.tag) {
				taskMap.get(taskId).tags.push(row.tag);
			}
		}

		return Array.from(taskMap.values());
	}),
	create: publicProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				dueDate: z.coerce.date(),
				tags: z.array(
					z.object({
						id: z.string(),
						text: z.string(),
					})
				),
				time: z.string(),
				priority: z.string(),
				status: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session?.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			const userId = ctx.session.user.id;

			return await db.transaction(async (tx) => {
				const tagNames = input.tags.map((tag) => tag.text);

				const existingTags = await tx
					.select()
					.from(tags)
					.where(and(eq(tags.userId, userId), inArray(tags.name, tagNames)));

				const existingTagNames = new Set(existingTags.map((tag) => tag.name));

				const newTagNames = tagNames.filter(
					(name) => !existingTagNames.has(name)
				);

				let createdTags: (typeof tags.$inferSelect)[] = [];
				if (newTagNames.length > 0) {
					const newTagsToCreate = newTagNames.map((name) => ({
						name,
						userId,
					}));

					createdTags = await tx
						.insert(tags)
						.values(newTagsToCreate)
						.returning();
				}

				const allTags = [...existingTags, ...createdTags];

				const [task] = await tx
					.insert(tasks)
					.values({
						name: input.title,
						description: input.description,
						dueDate: input.dueDate,
						estimatedDurationMinutes: Number.parseInt(input.time, 10),
						priority: input.priority,
						status: input.status,
						userId,
						recurrencePattern: null,
					})
					.returning();

				await tx.insert(taskTags).values(
					allTags.map((tag) => ({
						taskId: task.id,
						tagId: tag.id,
					}))
				);

				return {
					...task,
					tags: allTags,
				};
			});
		}),
});
