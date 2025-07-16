import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import UserMenu from "./user-menu";

export default function Header() {
	const pathname = useRouterState({
		select: (s) => s.location.pathname,
	});

	const excludedPaths = [
		"/login",
		"/sign-up",
		"/forget-password",
		"/reset-password",
	];

	if (excludedPaths.some((path) => pathname.startsWith(path))) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-6 py-3">
				<nav className="flex gap-4 text-md">
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
						to="/"
					>
						Home
					</Link>
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
