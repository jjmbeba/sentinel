import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
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
					<Link
						className={cn(
							buttonVariants({
								variant: "link",
								size: "sm",
								effect: "hoverUnderline",
							})
						)}
						to="/dashboard"
					>
						Dashboard
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
