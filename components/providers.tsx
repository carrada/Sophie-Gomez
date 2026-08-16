"use client";

import { DocumentHead } from "@/components/seo/document-head";
import { SkipLink } from "@/components/i18n/skip-link";
import { SiteLoader } from "@/components/site-loader";
import { LanguageProvider } from "@/components/i18n/language-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DocumentHead />
      <SkipLink />
      <SiteLoader />
      {children}
    </LanguageProvider>
  );
}
