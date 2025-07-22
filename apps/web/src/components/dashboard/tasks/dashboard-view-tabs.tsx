import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TasksCards from "./task-card-list";
import TodayTasksTable from "./today-tasks-table";

const DashboardViewTabTrigger = ({
	label,
	value,
}: {
	label: string;
	value: "table" | "cards" | "calendar";
}) => {
	const navigate = useNavigate();
	return (
		<TabsTrigger
			onClick={() => {
				navigate({
					to: "/dashboard",
					search: (prev) => ({
						...prev,
						tab: value,
					}),
				});
			}}
			value={value}
		>
			{label}
		</TabsTrigger>
	);
};

const DashboardViewTabs = () => {
	const navigate = useNavigate();
	const { tab } = getRouteApi("/dashboard/").useSearch();
	return (
		<Tabs className="mt-4" defaultValue={tab ?? "table"}>
			<TabsList>
				<DashboardViewTabTrigger label="Table" value="table" />
				<DashboardViewTabTrigger label="Cards" value="cards" />
				<DashboardViewTabTrigger label="Calendar" value="calendar" />
			</TabsList>
			<TabsContent value="table">
				<TodayTasksTable />
			</TabsContent>
			<TabsContent
				onClick={() => {
					navigate({
						to: "/dashboard",
						search: (prev) => ({
							...prev,
							tab: "cards",
						}),
					});
				}}
				value="cards"
			>
				<TasksCards />
			</TabsContent>
			<TabsContent value="calendar">Calendar view</TabsContent>
		</Tabs>
	);
};

export default DashboardViewTabs;
