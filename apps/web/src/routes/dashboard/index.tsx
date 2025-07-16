import { createFileRoute } from "@tanstack/react-router";
import {
	CircleDashedIcon,
	PauseIcon,
	PenIcon,
	PlayIcon,
	PlusIcon,
	SquareIcon,
	TargetIcon,
} from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
			<div className="flex items-end justify-between">
				<div>
					<h1 className="scroll-m-20 pb-2 font-semibold text-4xl tracking-tight first:mt-0">
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
								<PlusIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add Task</p>
						</TooltipContent>
					</Tooltip>
					<Button variant="outline">
						<PenIcon />
						Customize
					</Button>
				</div>
			</div>
			<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<CurrentTaskCard />
				<PendingTasksCard />
			</div>
		</div>
	);
}

const CurrentTaskCard = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<TargetIcon className="size-6" />
						<span className="rounded-md border px-2 py-1 text-muted-foreground text-sm">
							04:01:00
						</span>
					</div>
					<span className="text-muted-foreground">Your current task is</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-6 font-semibold text-2xl">Draft Q3 Marketing Report</p>
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={() => setIsPlaying(!isPlaying)}
								size="icon"
								variant="outline"
							>
								{isPlaying ? <PauseIcon /> : <PlayIcon />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{isPlaying ? "Pause Timer" : "Start Timer"}</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="icon" variant="outline">
								<SquareIcon className="fill-red-500 text-red-500" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Stop Timer</p>
						</TooltipContent>
					</Tooltip>
					<Button size={"sm"}>Mark as complete</Button>
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
