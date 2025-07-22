import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export type TaskWithTags = {
	createdAt: string | Date;
	updatedAt: string | Date;
	completedAt?: string | Date | null;
	dueDate?: string | Date | null;
	startDate?: string | Date | null;
	recurrencePattern?: unknown;
	taskTags: { tag: { id: string; name: string } }[];
	// Allow other fields
	[key: string]: unknown;
};

export type TableTask = Omit<TaskWithTags, "taskTags"> & {
	id: string;
	name: string;
	userId: string;
	parentTaskId: string | null;
	description: string;
	status: string;
	priority: string;
	dueDate: Date | null;
	startDate: Date | null;
	completedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
	estimatedDurationMinutes: number;
	recurrencePattern: unknown;
	isRecurring: boolean;
	tags: string[];
};

export const formatTaskForTable = (task: TaskWithTags): TableTask => ({
	id: task.id as string,
	name: task.name as string,
	userId: task.userId as string,
	parentTaskId:
		typeof task.parentTaskId === "string" ? task.parentTaskId : null,
	description: task.description as string,
	status: task.status as string,
	priority: task.priority as string,
	dueDate:
		task.dueDate && !Number.isNaN(Date.parse(String(task.dueDate)))
			? new Date(task.dueDate)
			: null,
	startDate:
		task.startDate && !Number.isNaN(Date.parse(String(task.startDate)))
			? new Date(task.startDate)
			: null,
	completedAt:
		task.completedAt && !Number.isNaN(Date.parse(String(task.completedAt)))
			? new Date(task.completedAt)
			: null,
	createdAt: new Date(task.createdAt),
	updatedAt: new Date(task.updatedAt),
	estimatedDurationMinutes: Number(task.estimatedDurationMinutes),
	recurrencePattern: task.recurrencePattern ?? null,
	isRecurring: Boolean(task.isRecurring),
	tags: task.taskTags?.map((tt) => tt.tag.name) ?? [],
});
