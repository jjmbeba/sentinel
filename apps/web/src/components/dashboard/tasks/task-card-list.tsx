import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTaskForTable, type TableTask } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { tags } from "./dummy-data";
import TaskFilters from "./task-filters";

const TasksCards = () => {
	const { data: tasks, isLoading } = useQuery(trpc.task.getAll.queryOptions());
	const { tags: searchTags } = getRouteApi("/dashboard/").useSearch();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!tasks) {
		return <div>No tasks found</div>;
	}

	const filteredTasks = tasks?.filter((task) => {
		if (!searchTags || searchTags.length === 0) {
			return true;
		}
		return task.taskTags.some((taskTag) =>
			searchTags?.includes(taskTag.tag.name)
		);
	});

	return (
		<div className="container mx-auto py-10">
			<TaskFilters />
			<div className="mt-6 flex flex-col gap-4">
				{filteredTasks?.map(formatTaskForTable).map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

const TaskCard = ({ task }: { task: TableTask }) => {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-xl">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-primary" />
						{task.name}
					</div>
				</CardTitle>
				<MoreHorizontalIcon className="size-4" />
			</CardHeader>
			<CardContent className="flex items-center gap-4">
				<div className="flex flex-wrap gap-2">
					{tags.slice(6).map((tag) => (
						<Badge key={tag.id} variant={"outline"}>
							{tag.name}
						</Badge>
					))}
				</div>
				<p className="text-muted-foreground text-xs">Logged: 45m Est: 2h 0m</p>
			</CardContent>
		</Card>
	);
};

export default TasksCards;
