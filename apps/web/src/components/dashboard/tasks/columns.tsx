import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Task = {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: "low" | "medium" | "high";
	status: "pending" | "in-progress" | "completed";
};

export const tasksColumns: ColumnDef<Task>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					variant="ghost"
				>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="h-8 w-8 p-0" variant="ghost">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
