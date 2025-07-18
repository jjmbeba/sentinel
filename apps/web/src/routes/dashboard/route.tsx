import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import RouteBreadcrumbs from "@/components/sidebar/route-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = useSession();

	const navigate = Route.useNavigate();

	useEffect(() => {
		if (!(session || isPending)) {
			navigate({
				to: "/login",
			});
		}
	}, [session, isPending, navigate]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							className="mr-2 data-[orientation=vertical]:h-4"
							orientation="vertical"
						/>
						<RouteBreadcrumbs />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 px-4 pt-10 sm:px-10">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
