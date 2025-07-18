import { DataTable } from "@/components/ui/data-table";
import { tasksColumns } from "./columns";
import { tasks } from "./dummy-data";
import TaskFilters from "./task-filters";

const TodayTasksTable = () => {
	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={tasksColumns}
				data={tasks}
				filters={<TaskFilters />}
			/>
		</div>
	);
};

export default TodayTasksTable;
