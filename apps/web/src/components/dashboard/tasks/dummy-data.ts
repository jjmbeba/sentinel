// Dummy data for Task[]
export const tasks = [
	{
		id: "1",
		title: "Design homepage",
		description: "Create the initial homepage wireframe and design.",
		dueDate: "2024-07-01",
		priority: "high" as const,
		status: "in-progress" as const,
	},
	{
		id: "2",
		title: "Set up database",
		description: "Initialize PostgreSQL and create tables for users and tasks.",
		dueDate: "2024-07-03",
		priority: "medium" as const,
		status: "pending" as const,
	},
	{
		id: "3",
		title: "Implement authentication",
		description: "Add login and registration functionality.",
		dueDate: "2024-07-05",
		priority: "high" as const,
		status: "pending" as const,
	},
	{
		id: "4",
		title: "Write documentation",
		description: "Document API endpoints and usage.",
		dueDate: "2024-07-10",
		priority: "low" as const,
		status: "pending" as const,
	},
	{
		id: "5",
		title: "Create dashboard UI",
		description: "Develop the dashboard layout and widgets.",
		dueDate: "2024-07-07",
		priority: "medium" as const,
		status: "in-progress" as const,
	},
	{
		id: "6",
		title: "Setup CI/CD",
		description:
			"Configure GitHub Actions for automated testing and deployment.",
		dueDate: "2024-07-04",
		priority: "medium" as const,
		status: "completed" as const,
	},
	{
		id: "7",
		title: "Optimize images",
		description: "Compress and optimize all images for faster load times.",
		dueDate: "2024-07-08",
		priority: "low" as const,
		status: "pending" as const,
	},
	{
		id: "8",
		title: "Add notifications",
		description: "Implement notification system for task updates.",
		dueDate: "2024-07-09",
		priority: "medium" as const,
		status: "in-progress" as const,
	},
	{
		id: "9",
		title: "User feedback survey",
		description: "Create and send out a survey to collect user feedback.",
		dueDate: "2024-07-11",
		priority: "low" as const,
		status: "pending" as const,
	},
	{
		id: "10",
		title: "Bug fixes",
		description: "Fix reported bugs from the last sprint.",
		dueDate: "2024-07-06",
		priority: "high" as const,
		status: "completed" as const,
	},
];

export const tags = [
	{
		id: "1",
		name: "Frontend",
	},
	{
		id: "2",
		name: "Backend",
	},
	{
		id: "3",
		name: "Design",
	},
	{
		id: "4",
		name: "Documentation",
	},
	{
		id: "5",
		name: "Testing",
	},
	{
		id: "6",
		name: "DevOps",
	},
	{
		id: "7",
		name: "Research",
	},
	{
		id: "8",
		name: "Planning",
	},
	{
		id: "9",
		name: "Bug Fix",
	},
	{
		id: "10",
		name: "Feature",
	},
];

export const filters = [
	{
		id: "1",
		name: "All Tasks",
	},
	{
		id: "2",
		name: "High Priority",
	},
	{
		id: "3",
		name: "In Progress",
	},
	{
		id: "4",
		name: "Completed",
	},
	{
		id: "5",
		name: "Due Today",
	},
	{
		id: "6",
		name: "Overdue",
	},
	{
		id: "7",
		name: "No Due Date",
	},
	{
		id: "8",
		name: "Recently Added",
	},
];
