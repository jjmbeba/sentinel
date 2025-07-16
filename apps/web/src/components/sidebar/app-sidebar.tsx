import { Link, linkOptions } from "@tanstack/react-router";
import {
	ChartLineIcon,
	HomeIcon,
	ListIcon,
	SettingsIcon,
	TagsIcon,
} from "lucide-react";
import type * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import Logo from "../auth/common/logo";
import { Skeleton } from "../ui/skeleton";

const sidebarLinks = linkOptions([
	{
		label: "Home",
		to: "/dashboard",
		icon: HomeIcon,
	},
	{
		label: "My Tasks",
		to: "/dashboard/my-tasks",
		icon: ListIcon,
	},
	{
		label: "Insights and Trends",
		to: "/dashboard/insights-trends",
		icon: ChartLineIcon,
	},
	{
		label: "Categories",
		to: "/dashboard/categories",
		icon: TagsIcon,
	},
	{
		label: "Tags",
		to: "/dashboard/tags",
		icon: TagsIcon,
	},
	{
		label: "Settings",
		to: "/dashboard/settings",
		icon: SettingsIcon,
	},
]);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: session, isPending: isLoadingSession } = useSession();

	let footerContent: React.ReactNode;
	if (isLoadingSession) {
		footerContent = <Skeleton className="h-10 w-full" />;
	} else if (session?.user) {
		footerContent = <NavUser user={session.user} />;
	} else {
		footerContent = (
			<div className="flex h-10 w-full items-center justify-center">
				<p className="text-muted-foreground text-sm">No user</p>
			</div>
		);
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenuButton
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					size="lg"
				>
					<Logo />
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarMenu>
						{sidebarLinks.map((item) => (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton asChild>
									<Link
										activeOptions={{ exact: true }}
										activeProps={{ className: "bg-sidebar-accent" }}
										to={item.to}
									>
										<item.icon />
										<span>{item.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>{footerContent}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
