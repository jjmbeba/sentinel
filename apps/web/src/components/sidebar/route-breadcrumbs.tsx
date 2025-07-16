import { Link, useRouterState } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/lib/utils";

const RouteBreadcrumbs = () => {
	const { location } = useRouterState();
	const breadcrumbs = location.pathname.split("/").filter(Boolean);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<Link from="/" to={breadcrumbs[0]}>
						<BreadcrumbLink>{capitalize(breadcrumbs[0])}</BreadcrumbLink>
					</Link>
				</BreadcrumbItem>
				{breadcrumbs.slice(1).map((breadcrumb) => (
					<>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem key={breadcrumb}>
							<Link to={breadcrumb}>
								<BreadcrumbLink>{capitalize(breadcrumb)}</BreadcrumbLink>
							</Link>
						</BreadcrumbItem>
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default RouteBreadcrumbs;
