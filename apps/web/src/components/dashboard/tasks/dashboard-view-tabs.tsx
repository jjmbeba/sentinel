import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TasksCards from "./task-card-list";
import TodayTasksTable from "./today-tasks-table";

const DashboardViewTabs = () => {
	return (
		<Tabs className="mt-4" defaultValue="table">
			<TabsList>
				<TabsTrigger value="table">Table</TabsTrigger>
				<TabsTrigger value="cards">Cards</TabsTrigger>
				<TabsTrigger value="calendar">Calendar</TabsTrigger>
			</TabsList>
			<TabsContent value="table">
				<TodayTasksTable />
			</TabsContent>
			<TabsContent value="cards">
				<TasksCards />
			</TabsContent>
			<TabsContent value="calendar">Calendar view</TabsContent>
		</Tabs>
	);
};

export default DashboardViewTabs;
