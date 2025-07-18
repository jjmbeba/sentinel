import { TimerIcon } from "lucide-react";
import DashboardCardContainer from "./dashboard-card-container";

const TotalFocusCard = () => {
	return (
		<DashboardCardContainer
			cardContent={
				<p className="mb-6 font-semibold text-2xl">4 hours 10 minutes</p>
			}
			cardTitle={
				<>
					<TimerIcon className="size-6" />
					<span className="text-muted-foreground">
						Your total focus time is
					</span>
				</>
			}
		/>
	);
};

export default TotalFocusCard;
