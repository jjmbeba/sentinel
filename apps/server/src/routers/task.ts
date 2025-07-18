import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { tasks } from "@/db/schema/core";
import { db } from "../db";
import { publicProcedure, router } from "../lib/trpc";

export const taskRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.session?.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		return await db
			.select()
			.from(tasks)
			.where(eq(tasks.userId, ctx.session.user.id));
	}),
	create: publicProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				dueDate: z.coerce.date(),
				time: z.string(),
				priority: z.string(),
				status: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session?.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}

			return await db.insert(tasks).values({
				name: input.title,
				description: input.description,
				dueDate: input.dueDate,
				estimatedDurationMinutes: Number.parseInt(input.time, 10),
				priority: input.priority,
				status: input.status,
				userId: ctx.session.user.id,
				recurrencePattern: null,
			});
		}),
});
