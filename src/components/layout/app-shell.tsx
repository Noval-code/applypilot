"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  KanbanSquare,
  Moon,
  Plus,
  Settings,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/applications", label: "Applications", icon: BriefcaseBusiness },
  { href: "/kanban", label: "Kanban", icon: KanbanSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans transition-colors">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-hairline bg-surface-card transition-colors">
          <div className="flex h-full flex-col gap-6 p-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
                <BriefcaseBusiness className="size-5" />
              </div>
              <div>
                <p className="font-display text-base font-bold tracking-tight text-ink">ApplyPilot</p>
                <p className="text-xs text-charcoal">Portfolio workspace</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-surface-bone text-ink font-semibold"
                        : "text-charcoal hover:bg-surface-bone hover:text-ink"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Theme toggle + Today Widget */}
            <div className="mt-auto space-y-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center gap-3 rounded-md border border-hairline px-3 py-2 text-xs font-semibold text-charcoal hover:bg-surface-bone transition-colors"
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>

              <div className="rounded-md border border-hairline bg-surface-bone/50 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
                  <CalendarClock className="size-4 text-primary" />
                  Today
                </div>
                <p className="text-xs leading-5 text-charcoal">
                  3 reminders and 1 offer need a decision window this week.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="min-w-0 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/80 px-6 py-4 backdrop-blur transition-colors">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal">
                  July 2026 pipeline
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink mt-0.5">
                  Job application command center
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/kanban">
                    <KanbanSquare className="mr-1.5 size-4" />
                    Kanban
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/applications/new">
                    <Plus className="mr-1.5 size-4" />
                    New application
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
