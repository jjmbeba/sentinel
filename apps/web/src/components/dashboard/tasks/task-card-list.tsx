import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTaskForTable, type TableTask } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
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
				<TaskCardActions />
			</CardHeader>
			<CardContent className="flex items-center gap-4">
				<div className="flex flex-wrap gap-2">
					{task.tags.map((tag) => (
						<Badge key={tag} variant={"outline"}>
							{tag}
						</Badge>
					))}
				</div>
				<p className="text-muted-foreground text-xs">Logged: 45m Est: 2h 0m</p>
			</CardContent>
		</Card>
	);
};

const TaskCardActions = () => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost">
					<MoreHorizontalIcon className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<PencilIcon className="size-4" />
					Edit
				</DropdownMenuItem>
				<AlertDialog
					onOpenChange={setIsDeleteDialogOpen}
					open={isDeleteDialogOpen}
				>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							className="text-destructive"
							onSelect={(e) => {
								e.preventDefault();
								setIsDeleteDialogOpen(true);
							}}
						>
							<TrashIcon className="size-4 text-destructive" />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								task and remove it from your list.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								onClick={() => {
									setIsDeleteDialogOpen(false);
								}}
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TasksCards;
