import { createFileRoute } from "@tanstack/react-router";
import { PenIcon } from "lucide-react";
import AddTaskButton from "@/components/dashboard/tasks/add-task-button";
import CurrentTaskCard from "@/components/dashboard/tasks/current-task-card";
import DashboardViewTabs from "@/components/dashboard/tasks/dashboard-view-tabs";
import PendingTasksCard from "@/components/dashboard/tasks/pending-task-card";
import TotalFocusCard from "@/components/dashboard/tasks/total-focus-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="scroll-m-20 pb-2 font-semibold text-3xl tracking-tight first:mt-0 sm:text-4xl">
						<span className="text-muted-foreground">Good Evening,</span> Sir.
					</h1>
					<span className="text-muted-foreground text-sm">
						Here's a look at how things are going
					</span>
				</div>
				<div className="flex items-center gap-2">
					<AddTaskButton />
					<Button variant="outline">
						<PenIcon className="size-4 sm:mr-2 sm:size-5" />
						<span className="hidden sm:inline">Customize</span>
					</Button>
				</div>
			</div>
			<div className="mt-6 grid max-w-[90dvw] grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
				<CurrentTaskCard />
				<PendingTasksCard />
				<TotalFocusCard />
			</div>
			<div className="mt-10">
				<div className="flex items-center justify-between">
					<h2 className="scroll-m-20 pb-2 font-semibold text-2xl tracking-tight">
						Today's Tasks
					</h2>
					<AddTaskButton />
				</div>
				<DashboardViewTabs />
			</div>
		</div>
	);
}
