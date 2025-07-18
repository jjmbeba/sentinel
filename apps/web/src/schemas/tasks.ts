import { z } from "zod";

export const addTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	dueDate: z.date(),
	time: z.string().min(1, "Time is required"),
	priority: z.enum(["low", "medium", "high"]),
	status: z.enum(["todo", "in_progress", "completed"]),
});
