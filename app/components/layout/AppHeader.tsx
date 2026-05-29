import { Link, NavLink } from "react-router";
import { ClipboardCheck, ExternalLink, Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { GOOGLE_FORM_URL } from "~/lib/constants";
import { cn } from "~/lib/utils";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/panduan", label: "Panduan" },
  { to: "/checklist", label: "Checklist" },
];

function NavItems({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              isActive && "bg-muted text-foreground"
            )
          }
          key={item.to}
          onClick={onClick}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="flex min-w-0 items-center gap-2 font-semibold" to="/">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <ClipboardCheck className="size-4" />
          </span>
          <span className="truncate">Panduan Kompre</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItems />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline">
            <a href={GOOGLE_FORM_URL} rel="noreferrer" target="_blank">
              Buka Google Form
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Buka navigasi"
              className="md:hidden"
              size="icon"
              variant="outline"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Panduan Kompre</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              <NavItems />
              <Button asChild className="mt-4">
                <a href={GOOGLE_FORM_URL} rel="noreferrer" target="_blank">
                  Buka Google Form
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
