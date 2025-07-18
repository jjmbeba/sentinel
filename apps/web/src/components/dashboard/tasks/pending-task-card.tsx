import { CircleDashedIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardCardContainer from "./dashboard-card-container";

export const PendingTasksCard = () => {
	return (
		<DashboardCardContainer
			cardContent={
				<>
					<p className="mb-6 font-semibold text-2xl">3 pending tasks</p>
					<span className={cn(buttonVariants({ variant: "link" }), "pl-0")}>
						View all pending tasks
					</span>
				</>
			}
			cardTitle={
				<>
					<CircleDashedIcon className="size-6" />
					<span className="text-muted-foreground">You have</span>
				</>
			}
		/>
	);
};

export default PendingTasksCard;
