import { PauseIcon, PlayIcon, SquareIcon, TargetIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardCardContainer from "./dashboard-card-container";

const CurrentTaskCard = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<DashboardCardContainer
			cardContent={
				<>
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
				</>
			}
			cardTitle={
				<>
					<div className="flex items-center justify-between">
						<TargetIcon className="size-4 sm:size-6" />
						<span className="rounded-md border px-1.5 py-0.5 text-muted-foreground text-xs sm:px-2 sm:py-1 sm:text-sm">
							04:01:00
						</span>
					</div>
					<span className="text-muted-foreground text-sm sm:text-base">
						Your current task is
					</span>
				</>
			}
		/>
	);
};

export default CurrentTaskCard;
