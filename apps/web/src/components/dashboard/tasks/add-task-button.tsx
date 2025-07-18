import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const AddTaskButton = () => {
	return (
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
	);
};

export default AddTaskButton;
