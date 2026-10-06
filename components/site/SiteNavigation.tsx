"use client";

import type { NavItem } from "@/types/site";
import { NavIcon } from "./NavIcons";

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
        className="fixed inset-x-0 bottom-0 z-50 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
        aria-label="Navigation mobile"
      >
        <div className="mx-auto max-w-md rounded-[1.75rem] bg-primary px-1 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:max-w-lg">
          <div className="flex items-end justify-between gap-0.5">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-0.5 py-1 text-white transition active:opacity-75"
              >
                <NavIcon
                  id={item.id}
                  className="h-5 w-5 min-[380px]:h-[1.35rem] min-[380px]:w-[1.35rem] sm:h-6 sm:w-6"
                />
                <span className="w-full truncate text-center text-[8px] font-medium leading-tight sm:text-[9px]">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
