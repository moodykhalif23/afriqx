import type { ComponentChildren } from "preact";
import { Sidebar } from "./Sidebar.tsx";
import { Topbar } from "./Topbar.tsx";
import { TickerBar } from "./TickerBar.tsx";
import { BottomNav } from "./BottomNav.tsx";

export interface AppShellProps {
  /** Nav label of the current section (drives active state). */
  active: string;
  /** Short title shown in the mobile top bar. */
  title?: string;
  children?: ComponentChildren;
}

/**
 * The responsive application frame shared by every section.
 * - lg+ : fixed left sidebar, top bar, bottom ticker
 * - <lg : top bar + thumb-reachable bottom navigation (ticker hidden)
 */
export function AppShell({ active, title, children }: AppShellProps) {
  return (
    <div class="flex h-[100dvh] overflow-hidden bg-obsidian-900 text-ivory">
      <Sidebar active={active} />

      <div class="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />

        <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <TickerBar />
        <BottomNav active={active} />
      </div>
    </div>
  );
}
