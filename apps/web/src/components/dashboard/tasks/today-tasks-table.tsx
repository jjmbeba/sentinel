import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { formatTaskForTable } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { tasksColumns } from "./columns";
import TaskFilters from "./task-filters";

const TodayTasksTable = () => {
	const {
		data: tasks,
		isLoading,
		error,
	} = useQuery(trpc.task.getAll.queryOptions());
	const { tags: searchTags } = getRouteApi("/dashboard/").useSearch();

	if (isLoading) {
		return (
			<DataTableSkeleton
				columns={tasksColumns.map((col, idx) => ({
					id: typeof col.id === "string" ? col.id : `col-${idx}`,
					header:
						typeof col.header === "string" || typeof col.header === "number"
							? col.header
							: " ",
				}))}
				rowCount={10}
			/>
		);
	}

	if (error) {
		toast.error("Error fetching tasks");
		return null;
	}

	const filteredTasks = tasks?.filter((task) => {
		if (!searchTags || searchTags.length === 0) {
			return true;
		}
		return task.taskTags.some((taskTag) =>
			searchTags?.includes(taskTag.tag.name)
		);
	});

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={tasksColumns}
				data={filteredTasks?.map(formatTaskForTable) ?? []}
				filters={<TaskFilters />}
			/>
		</div>
	);
};

export default TodayTasksTable;
