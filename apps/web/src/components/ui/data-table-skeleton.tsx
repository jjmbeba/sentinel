import type React from "react";

interface DataTableSkeletonProps {
	columns: { header: React.ReactNode; id: string }[];
	rowCount?: number;
	filters?: React.ReactNode;
}

export const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
	columns,
	rowCount = 5,
	filters,
}) => (
	<div aria-busy="true" className="flex w-full flex-col gap-4">
		<div className="flex max-w-[90dvw] flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="flex-1">
				{filters ? (
					filters
				) : (
					<div className="h-10 w-40 animate-pulse rounded bg-muted" />
				)}
			</div>
			<div className="flex flex-col gap-2 md:flex-row md:items-center">
				<div className="h-10 w-full animate-pulse rounded bg-muted md:max-w-sm" />
				<div className="h-10 w-24 animate-pulse rounded bg-muted" />
			</div>
		</div>
		<div className="max-w-[90dvw] overflow-x-auto rounded-md border">
			<table className="w-full">
				<thead>
					<tr>
						{columns.map((col) => (
							<th className="px-4 py-3 text-left" key={col.id}>
								<div className="h-4 w-24 animate-pulse rounded bg-muted" />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: rowCount }).map((_, rowIdx) => (
						<tr
							key={`skeleton-row-${
								// biome-ignore lint/suspicious/noArrayIndexKey: rowIdx is a valid key since it's a skeleton component
								rowIdx
							}`}
						>
							{columns.map((col) => (
								<td
									className="px-4 py-3"
									key={`skeleton-cell-${col.id}-${rowIdx}`}
								>
									<div className="h-4 w-full animate-pulse rounded bg-muted" />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="mt-2 h-2 w-full animate-pulse rounded bg-muted" />
		</div>
		<div className="flex justify-end">
			<div className="h-8 w-32 animate-pulse rounded bg-muted" />
		</div>
	</div>
);
