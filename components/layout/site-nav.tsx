"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "@/lib/motion";
import { useLanguage } from "@/components/i18n/language-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteStaggeredMenu } from "@/components/layout/site-staggered-menu";
import { contentContainer, pagePadding } from "@/lib/constants";
import { localeLabels, locales, type Locale } from "@/lib/i18n";

const localeNames: Record<Locale, string> = {
  fr: "French",
  es: "Spanish",
  en: "English",
};

export function SiteNav() {
  const { locale, setLocale, dictionary } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 [height:var(--nav-height)] ${
          menuOpen ? "z-[80]" : "z-50"
        } border-b border-brand-line/70 bg-brand-paper/85 backdrop-blur-md`}
      >
        <div
          className={`${contentContainer} ${pagePadding} relative flex h-full items-center`}
        >
          <div className="flex flex-1 items-center">
            {!isHome ? (
              <Link
                href="/"
                className="font-display text-base tracking-wide text-brand-ink transition-opacity hover:opacity-60 md:text-lg"
              >
                {dictionary.nav.name}
              </Link>
            ) : null}
          </div>

          <div
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 font-sans text-xs font-medium tracking-[0.12em] sm:text-sm sm:tracking-[0.15em]"
            role="group"
            aria-label="Language"
          >
            {locales.map((code, index) => (
              <span key={code} className="inline-flex items-center gap-1">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-brand-soft">
                    /
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setLocale(code)}
                  aria-current={locale === code ? "true" : undefined}
                  aria-label={`Switch to ${localeNames[code]}`}
                  className={`transition-opacity hover:opacity-80 ${
                    locale === code ? "text-brand-ink" : "text-brand-mute"
                  }`}
                >
                  {localeLabels[code]}
                </button>
              </span>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end">
            <SiteStaggeredMenu onOpenChange={setMenuOpen} />
          </div>
        </div>
      </header>
    </>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-brand-paper text-brand-ink">
      <SiteNav />
      {isHome ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {children}
        </motion.div>
      ) : (
        <div className="flex-1 pt-[calc(var(--nav-height)+2rem)] md:pt-[calc(var(--nav-height)+2.25rem)]">
          {children}
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
