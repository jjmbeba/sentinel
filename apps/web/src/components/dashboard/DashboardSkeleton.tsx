import React from "react";

interface DashboardSkeletonProps {
	headerLines?: number;
	actionButtons?: number;
	cardCount?: number;
	sectionCount?: number;
	className?: string;
}

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({
	headerLines = 2,
	actionButtons = 2,
	cardCount = 3,
	sectionCount = 1,
	className = "",
}) => {
	// Generate unique keys for skeleton elements
	const headerLineKeys = React.useMemo(
		() => new Array(headerLines).fill(null).map(() => crypto.randomUUID()),
		[headerLines]
	);
	const actionButtonKeys = React.useMemo(
		() => new Array(actionButtons).fill(null).map(() => crypto.randomUUID()),
		[actionButtons]
	);
	const cardKeys = React.useMemo(
		() => new Array(cardCount).fill(null).map(() => crypto.randomUUID()),
		[cardCount]
	);
	const sectionKeys = React.useMemo(
		() => new Array(sectionCount).fill(null).map(() => crypto.randomUUID()),
		[sectionCount]
	);

	return (
		<output
			aria-busy="true"
			aria-label="Loading dashboard content"
			className={`mx-auto w-full max-w-[90dvw] ${className}`}
		>
			{/* Header Skeleton */}
			<div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					{headerLineKeys.map((key) => (
						<div
							className="mb-2 h-6 w-48 animate-pulse rounded bg-muted"
							key={key}
						/>
					))}
				</div>
				<div className="flex items-center gap-2">
					{actionButtonKeys.map((key) => (
						<div
							className="h-10 w-24 animate-pulse rounded bg-muted"
							key={key}
						/>
					))}
				</div>
			</div>
			{/* Cards Grid Skeleton */}
			<div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
				{cardKeys.map((key) => (
					<div className="h-32 animate-pulse rounded-lg bg-muted" key={key} />
				))}
			</div>
			{/* Section Skeletons */}
			{sectionKeys.map((key) => (
				<div className="mt-10" key={key}>
					<div className="mb-4 flex items-center justify-between">
						<div className="h-6 w-40 animate-pulse rounded bg-muted" />
						<div className="h-8 w-20 animate-pulse rounded bg-muted" />
					</div>
					<div className="h-24 w-full animate-pulse rounded bg-muted" />
				</div>
			))}
			<span className="sr-only">Loading dashboard...</span>
		</output>
	);
};

export default DashboardSkeleton;
