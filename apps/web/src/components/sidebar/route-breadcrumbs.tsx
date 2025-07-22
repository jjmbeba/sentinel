import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/lib/utils";

const RouteBreadcrumbs = () => {
	const {
		location: { pathname },
	} = useRouterState();
	const breadcrumbs = useMemo(
		() => pathname.split("/").filter(Boolean),
		[pathname]
	);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<Link from="/" to={breadcrumbs[0]}>
						{/* <BreadcrumbLink>{capitalize(breadcrumbs[0])}</BreadcrumbLink> */}
						{capitalize(breadcrumbs[0])}
					</Link>
				</BreadcrumbItem>
				{breadcrumbs.slice(1).map((breadcrumb) => (
					<>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem key={breadcrumb}>
							<Link
								className="transition-colors hover:text-foreground"
								to={breadcrumb}
							>
								{/* <BreadcrumbLink>{capitalize(breadcrumb)}</BreadcrumbLink> */}
								{capitalize(breadcrumb)}
							</Link>
						</BreadcrumbItem>
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default RouteBreadcrumbs;
