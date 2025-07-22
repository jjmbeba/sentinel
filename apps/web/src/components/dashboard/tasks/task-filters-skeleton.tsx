import { Skeleton } from "@/components/ui/skeleton";

const TaskFiltersSkeleton = () => {
	const skeletonItems = Array.from({ length: 6 }, () => crypto.randomUUID());

	return (
		<div className="flex flex-wrap gap-2">
			<span className="text-muted-foreground text-sm">Filter by:</span>
			{skeletonItems.map((id) => (
				<Skeleton className="h-6 w-16" key={id} />
			))}
		</div>
	);
};

export default TaskFiltersSkeleton;
