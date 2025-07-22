import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TableTask } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

export const tasksColumns: ColumnDef<TableTask>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					variant="ghost"
				>
					Name
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
		accessorKey: "tags",
		header: "Tags",
		cell: ({ row }) => {
			const task = row.original;
			return (
				<div className="flex flex-wrap gap-2">
					{task.tags.map((tag) => (
						<Badge key={tag} variant={"outline"}>
							{tag}
						</Badge>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const task = row.original;
			return <div>{task.dueDate?.toDateString()}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const task = row.original;
			const { mutateAsync: deleteTask } = useMutation(
				trpc.task.delete.mutationOptions()
			);

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
						// onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								toast.promise(deleteTask({ id: task.id }), {
									loading: "Deleting task...",
									success: "Task deleted successfully",
									error: "Failed to delete task",
								})
							}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
