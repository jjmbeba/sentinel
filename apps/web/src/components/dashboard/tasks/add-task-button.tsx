import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import AddTaskForm from "./add-task-form";

const AddTaskButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button onClick={() => setIsOpen(true)} size="icon" variant="outline">
						<PlusIcon className="size-4 sm:size-5" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Add Task</p>
				</TooltipContent>
			</Tooltip>
			<Dialog onOpenChange={setIsOpen} open={isOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Task</DialogTitle>
					</DialogHeader>
					<AddTaskForm />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddTaskButton;
