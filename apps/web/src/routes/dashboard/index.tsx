import { createFileRoute } from "@tanstack/react-router";
import {
	CircleDashedIcon,
	MoreHorizontalIcon,
	PauseIcon,
	PenIcon,
	PlayIcon,
	PlusIcon,
	SquareIcon,
	TargetIcon,
	TimerIcon,
} from "lucide-react";
import { useState } from "react";
import { tasksColumns } from "@/components/dashboard/tasks/columns";
import { filters, tags, tasks } from "@/components/dashboard/tasks/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="icon" variant="outline">
								<PlusIcon className="size-4 sm:size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add Task</p>
						</TooltipContent>
					</Tooltip>
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
					<Button size="sm" variant="outline">
						<PlusIcon />
						Add Task
					</Button>
				</div>
				<Tabs className="mt-4" defaultValue="table">
					<TabsList>
						<TabsTrigger value="table">Table</TabsTrigger>
						<TabsTrigger value="cards">Cards</TabsTrigger>
						<TabsTrigger value="calendar">Calendar</TabsTrigger>
					</TabsList>
					<TabsContent value="table">
						<TasksTable />
					</TabsContent>
					<TabsContent value="cards">
						<TasksCards />
					</TabsContent>
					<TabsContent value="calendar">Calendar view</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

const CurrentTaskCard = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col gap-2 sm:gap-4">
					<div className="flex items-center justify-between">
						<TargetIcon className="size-4 sm:size-6" />
						<span className="rounded-md border px-1.5 py-0.5 text-muted-foreground text-xs sm:px-2 sm:py-1 sm:text-sm">
							04:01:00
						</span>
					</div>
					<span className="text-muted-foreground text-sm sm:text-base">
						Your current task is
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-4 line-clamp-2 font-semibold text-lg sm:mb-6 sm:text-2xl">
					Draft Q3 Marketing Report
				</p>
				<div className="flex flex-wrap items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className="size-8 sm:size-10"
								onClick={() => setIsPlaying(!isPlaying)}
								size="icon"
								variant="outline"
							>
								{isPlaying ? (
									<PauseIcon className="size-4 sm:size-5" />
								) : (
									<PlayIcon className="size-4 sm:size-5" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{isPlaying ? "Pause Timer" : "Start Timer"}</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className="size-8 sm:size-10"
								size="icon"
								variant="outline"
							>
								<SquareIcon className="size-4 fill-red-500 text-red-500 sm:size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Stop Timer</p>
						</TooltipContent>
					</Tooltip>
					<Button className="h-8 text-xs sm:h-10 sm:text-sm" size="sm">
						Mark as complete
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

const PendingTasksCard = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col gap-4">
					<CircleDashedIcon className="size-6" />
					<span className="text-muted-foreground">You have</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-6 font-semibold text-2xl">3 pending tasks</p>
				<span className={cn(buttonVariants({ variant: "link" }), "pl-0")}>
					View all pending tasks
				</span>
			</CardContent>
		</Card>
	);
};

const TotalFocusCard = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col gap-4">
					<TimerIcon className="size-6" />
					<span className="text-muted-foreground">
						Your total focus time is
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-6 font-semibold text-2xl">4 hours 10 minutes</p>
			</CardContent>
		</Card>
	);
};

const TaskFilters = () => {
	return (
		<div className="flex flex-wrap gap-2">
			<span className="text-muted-foreground text-sm">Filter by:</span>
			{filters.map((filter) => (
				<Badge
					key={filter.id}
					variant={filter.id === "1" ? "default" : "outline"}
				>
					{filter.name}
				</Badge>
			))}
		</div>
	);
};

const TasksTable = () => {
	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={tasksColumns}
				data={tasks}
				filters={<TaskFilters />}
			/>
		</div>
	);
};

const TasksCards = () => {
	return (
		<div className="container mx-auto py-10">
			<TaskFilters />
			<div className="mt-6 flex flex-col gap-4">
				{tasks.map((task) => (
					<Card key={task.id}>
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
							<p className="text-muted-foreground text-xs">
								Logged: 45m Est: 2h 0m
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
