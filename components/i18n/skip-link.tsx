"use client";

import { useLanguage } from "@/components/i18n/language-provider";

export function SkipLink() {
  const { dictionary } = useLanguage();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-paper"
    >
      {dictionary.common.skipToContent}
    </a>
  );
}
