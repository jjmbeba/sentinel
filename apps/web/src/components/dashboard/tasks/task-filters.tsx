import { Badge } from "@/components/ui/badge";
import { filters } from "./dummy-data";

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

export default TaskFilters;
