import { Link, linkOptions, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import UserMenu from "./user-menu";

export default function Header() {
	const links = linkOptions([
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/todos", label: "Todos" },
	]);

	const pathname = useRouterState({
		select: (s) => s.location.pathname,
	});

	if (pathname.startsWith("/login") || pathname.startsWith("/sign-up")) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-6 py-3">
				<nav className="flex gap-4 text-md">
					{links.map(({ to, label }) => {
						return (
							<Link
								activeProps={{
									className: "underline",
								}}
								className={cn(
									buttonVariants({
										variant: "link",
										size: "sm",
										effect: "hoverUnderline",
									})
								)}
								key={to}
								to={to}
							>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
