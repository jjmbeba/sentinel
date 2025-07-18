import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tags, tasks } from "./dummy-data";
import TaskFilters from "./task-filters";

const TasksCards = () => {
	return (
		<div className="container mx-auto py-10">
			<TaskFilters />
			<div className="mt-6 flex flex-col gap-4">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

const TaskCard = ({ task }: { task: {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: "low" | "medium" | "high";
	status: "pending" | "in-progress" | "completed";
}; }) => {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-xl">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-primary" />
						{task.title}
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
