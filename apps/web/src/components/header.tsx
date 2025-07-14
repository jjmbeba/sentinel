import { Link, linkOptions } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export default function Header() {
  const links = linkOptions([
    { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dashboard" },
    { to: "/todos", label: "Todos" },
  ]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-6 py-3">
        <nav className="flex gap-4 text-md">
          {links.map(({ to, label }) => {
            return (
              <Link
                key={to}
                to={to}
                className={cn(buttonVariants({ variant: "link", size: "sm", effect: 'hoverUnderline' }))}
                activeProps={{
                  className: 'underline'
                }}
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
