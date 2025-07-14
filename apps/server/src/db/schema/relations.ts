import { tasks, taskCategories, taskTags, timeLogs, activityLogs, aiInsights, recurringTasks, category, tags } from "./core";
import { user } from "./auth";
import { relations } from "drizzle-orm";

export const userRelations = relations(user, ({many}) => ({
	tasks: many(tasks),
	categories: many(category),
	tags: many(tags),
	timeLogs: many(timeLogs),
	activityLogs: many(activityLogs),
	aiInsights: many(aiInsights),
	recurringTasks: many(recurringTasks),
}));


export const tasksRelations = relations(tasks, ({many, one}) => ({
	taskCategories: many(taskCategories),
	taskTags: many(taskTags),
	parentTask: one(tasks, {
		fields: [tasks.parentTaskId],
		references: [tasks.id],
	}),
	childrenTasks: many(tasks),
	timeLogs: many(timeLogs),
	activityLogs: many(activityLogs),
	aiInsights: many(aiInsights),
	recurringTasks: many(recurringTasks),
}));

export const categoriesRelations = relations(category, ({many}) => ({
	taskCategories: many(taskCategories),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	taskTags: many(taskTags),
}));

export const taskCategoriesRelations = relations(taskCategories, ({one}) => ({
	task: one(tasks, {
		fields: [taskCategories.taskId],
		references: [tasks.id],
	}),
	category: one(category, {
		fields: [taskCategories.categoryId],
		references: [category.id],
	}),
}));

export const taskTagsRelations = relations(taskTags, ({one}) => ({
	task: one(tasks, {
		fields: [taskTags.taskId],
		references: [tasks.id],
	}),
	tag: one(tags, {
		fields: [taskTags.tagId],
		references: [tags.id],
	}),
}));

export const timeLogsRelations = relations(timeLogs, ({one}) => ({
	task: one(tasks, {
		fields: [timeLogs.taskId],
		references: [tasks.id],
	}),
}));

export const activityLogsRelations = relations(activityLogs, ({one}) => ({
	task: one(tasks, {
		fields: [activityLogs.currentTaskId],
		references: [tasks.id],
	}),
}));

export const aiInsightsRelations = relations(aiInsights, ({one}) => ({
	task: one(tasks, {
		fields: [aiInsights.targetTaskId],
		references: [tasks.id],
	}),
}));

export const recurringTasksRelations = relations(recurringTasks, ({one}) => ({
	originalTask: one(tasks, {
		fields: [recurringTasks.originalTaskId],
		references: [tasks.id],
	}),
}));