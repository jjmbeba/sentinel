import {
	type AnyPgColumn,
	boolean,
	index,
	integer,
	jsonb,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const tasks = pgTable(
	"tasks",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		parentTaskId: uuid("parent_task_id").references(
			(): AnyPgColumn => tasks.id,
			{ onDelete: "set null" }
		),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		description: text("description").notNull(),
		status: text("status").notNull().default("todo"), //todo, in_progress, done, cancelled
		priority: text("priority").notNull().default("medium"), //low, medium, high
		dueDate: timestamp("due_date"),
		startDate: timestamp("start_date"),
		completedAt: timestamp("completed_at"),
		isRecurring: boolean("is_recurring").notNull().default(false),
		recurrencePattern: jsonb("recurrence_pattern"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
		estimatedDurationMinutes: integer("estimated_duration_minutes").notNull(),
	},
	(t) => [
		index("user_tasks_idx").on(t.userId),
		index("due_date_idx").on(t.dueDate),
		index("status_idx").on(t.status),
	]
);

export const category = pgTable(
	"categories",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		colorHex: text("color_hex"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [unique("user_id_name_categories").on(t.userId, t.name)]
);

export const taskCategories = pgTable(
	"task_categories",
	{
		taskId: uuid("task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		categoryId: uuid("category_id")
			.notNull()
			.references(() => category.id, { onDelete: "cascade" }),
	},
	(t) => [
		primaryKey({
			columns: [t.taskId, t.categoryId],
		}),
	]
);

export const tags = pgTable(
	"tags",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [unique("user_id_name_tags").on(t.userId, t.name)]
);

export const taskTags = pgTable(
	"task_tags",
	{
		taskId: uuid("task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		tagId: uuid("tag_id")
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
	},
	(t) => [
		primaryKey({
			columns: [t.taskId, t.tagId],
		}),
	]
);

export const timeLogs = pgTable(
	"time_logs",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		taskId: uuid("task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		startTime: timestamp("start_time").notNull(),
		endTime: timestamp("end_time"),
		logType: text("log_type").notNull().default("timer"), //time, manual
		durationMinutes: integer("duration_minutes").notNull(),
		notes: text("notes"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("user_time_logs_idx").on(t.userId),
		index("task_time_logs_idx").on(t.taskId),
	]
);

export const activityLogs = pgTable(
	"activity_logs",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		timestamp: timestamp("timestamp").notNull(),
		activityType: text("activity_type").notNull(), //app_focus_change', 'keyboard_activity', 'mouse_activity', 'url_visited'
		details: jsonb("details"),
		currentTaskId: uuid("current_task_id").references(() => tasks.id, {
			onDelete: "set null",
		}),
		isProductiveActivity: boolean("is_productive_activity").notNull(),
	},
	(t) => [
		index("user_activity_logs_idx").on(t.userId),
		index("current_task_idx").on(t.currentTaskId),
		index("timestamp_idx").on(t.timestamp),
	]
);

export const aiInsights = pgTable(
	"ai_insights",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		insightType: text("insight_type").notNull(), //task_suggestion, productivity_insight
		insightText: text("insight_text").notNull(),
		dataContext: jsonb("data_context"),
		generatedAt: timestamp("generated_at").notNull(),
		isActionable: boolean("is_actionable").notNull(),
		userFeedback: text("user_feedback"),
		feedBackTimestamp: timestamp("feed_back_timestamp"),
		targetTaskId: uuid("target_task_id").references(() => tasks.id, {
			onDelete: "set null",
		}),
		isDismissed: boolean("is_dismissed").notNull().default(false),
	},
	(t) => [
		index("user_ai_insights_idx").on(t.userId),
		index("generated_at_idx").on(t.generatedAt),
	]
);

export const recurringTasks = pgTable(
	"recurring_tasks",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		originalTaskId: uuid("original_task_id")
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		description: text("description").notNull(),
		status: text("status").notNull().default("todo"),
		priority: text("priority").notNull().default("medium"),
		dueDate: timestamp("due_date"),
		instanceDate: timestamp("instance_date").notNull(),
		completedAt: timestamp("completed_at"),
		recurrencePattern: jsonb("recurrence_pattern").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("user_recurring_tasks_idx").on(t.userId),
		unique("original_task_id_idx").on(t.originalTaskId, t.instanceDate),
	]
);
