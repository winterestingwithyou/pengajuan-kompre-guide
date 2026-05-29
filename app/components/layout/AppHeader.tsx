import { Link, NavLink } from "react-router";
import {
  BookOpenText,
  ClipboardCheck,
  ExternalLink,
  Home,
  Menu,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";
import { GOOGLE_FORM_URL } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { ThemeToggle } from "~/components/theme/ThemeToggle";

const navItems = [
  {
    to: "/",
    label: "Beranda",
    description: "Ringkasan alur dan fitur utama.",
    icon: Home,
  },
  {
    to: "/panduan",
    label: "Panduan",
    description: "Daftar dokumen dan cara menyiapkannya.",
    icon: BookOpenText,
  },
  {
    to: "/checklist",
    label: "Checklist",
    description: "Pantau kesiapan dan simpan link file.",
    icon: ClipboardCheck,
  },
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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="flex min-w-0 items-center gap-2 font-semibold" to="/">
          <img
            alt="Logo Kompre MI Unsri"
            className="size-9 shrink-0 rounded-md shadow-sm"
            src="/app-logo.png"
          />
          <span className="truncate tracking-tight">Kompre MI Unsri</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItems />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild className="glass-button" variant="outline">
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
              className="glass-button md:hidden"
              size="icon"
              variant="outline"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[min(88vw,390px)] gap-0 overflow-y-auto p-0"
            side="right"
          >
            <div className="border-b border-border/70 px-5 pb-5 pt-6">
              <div className="flex items-center gap-3 pr-10">
                <img
                  alt="Logo Kompre MI Unsri"
                  className="size-12 shrink-0 rounded-lg shadow-sm"
                  src="/app-logo.png"
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight">
                    Kompre MI Unsri
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    Panduan kompre D3 Manajemen Informatika.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col px-5 py-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Navigasi
              </p>
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      className={({ isActive }) =>
                        cn(
                          "group flex items-start gap-3 rounded-lg border border-border/70 bg-card/70 p-3.5 text-left transition-colors hover:bg-muted/70",
                          isActive && "border-foreground/20 bg-muted text-foreground"
                        )
                      }
                      to={item.to}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
            </div>

            <div className="mt-auto border-t border-border/70 px-5 py-5">
              <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/70 p-3">
                <div>
                  <p className="text-sm font-medium">Tampilan</p>
                  <p className="text-xs text-muted-foreground">
                    Ganti mode terang, gelap, atau sistem.
                  </p>
                </div>
                <ThemeToggle />
              </div>
              <Button asChild className="h-11 w-full">
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
