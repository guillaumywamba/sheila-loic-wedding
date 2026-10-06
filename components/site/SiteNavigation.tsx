"use client";

import type { NavItem } from "@/types/site";

type Props = {
  logo: string;
  items: NavItem[];
};

export function SiteNavigation({ logo, items }: Props) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-accent-pink shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a
            href="#accueil"
            className="font-display text-xl font-semibold tracking-wide text-black md:text-2xl"
          >
            {logo}
          </a>
          <nav className="hidden flex-wrap items-center justify-end gap-1 md:flex lg:gap-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-black/85 transition hover:bg-white/40 hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-accent-pink shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden"
        aria-label="Navigation mobile"
      >
        <div className="flex gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold text-black/90 transition active:bg-white/50"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
