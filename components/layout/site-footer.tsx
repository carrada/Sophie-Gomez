"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  contentContainer,
  linkSecondary,
  pagePadding,
  sectionLabel,
} from "@/lib/constants";
import { primaryNavRoutes, type NavRoute } from "@/lib/navigation";
import { getNavLabel } from "@/lib/nav-labels";

export function SiteFooter() {
  const { dictionary } = useLanguage();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const renderLink = (route: NavRoute) => {
    const active = isActive(route.href);
    const label = getNavLabel(route, dictionary);

    return (
      <li key={route.href}>
        <Link
          href={route.href}
          aria-current={active ? "page" : undefined}
          className={`font-sans text-sm tracking-wide transition-opacity hover:opacity-60 ${
            active ? "text-brand-ink" : "text-brand-mute"
          }`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <footer className="border-t border-brand-line bg-brand-paper">
      <div className={`${contentContainer} ${pagePadding} py-10 md:py-12`}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="font-display text-lg tracking-wide text-brand-ink">
              {dictionary.nav.name}
            </p>
            <p className={`mt-2 ${sectionLabel}`}>{dictionary.footer.tagline}</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="md:col-span-5 md:col-start-5"
          >
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {primaryNavRoutes.map(renderLink)}
            </ul>
          </nav>

          <div className="md:col-span-3 md:flex md:justify-end">
            <Link href="/contacto" className={linkSecondary}>
              {dictionary.footer.contact} →
            </Link>
          </div>
        </div>

        <p className="mt-8 font-sans text-xs tracking-wide text-brand-soft md:mt-10">
          © {new Date().getFullYear()} {dictionary.nav.name} —{" "}
          {dictionary.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
