import { useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/utils/trpc";
import TaskFiltersSkeleton from "./task-filters-skeleton";

const TaskFilters = () => {
	const navigate = useNavigate();
	const { tags: searchTags } = getRouteApi("/dashboard/").useSearch();
	const {
		data: tags,
		isLoading,
		isError,
	} = useQuery(trpc.tag.getAll.queryOptions());

	if (isLoading) {
		return <TaskFiltersSkeleton />;
	}

	if (isError) {
		toast.error("Error fetching tags");
		return null;
	}

	if (tags?.length === 0) {
		return (
			<div className="text-muted-foreground text-sm">
				No tags found. Create a tag to filter tasks by.
			</div>
		);
	}

	return (
		<div className="flex flex-wrap gap-2">
			<span className="text-muted-foreground text-sm">Filter by:</span>
			{tags?.map((tag) => (
				<Badge
					key={tag.id}
					onClick={() => {
						if (searchTags?.includes(tag.name)) {
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									tags: prev.tags?.filter((t) => t !== tag.name),
								}),
							});
						} else {
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									tags: [...(prev.tags ?? []), tag.name],
								}),
							});
						}
					}}
					variant={searchTags?.includes(tag.name) ? "default" : "outline"}
				>
					{tag.name}
				</Badge>
			))}
		</div>
	);
};

export default TaskFilters;
