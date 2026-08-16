"use client";

import commercialData from "@/content/modelo/commercial.json";
import editorialData from "@/content/modelo/editorial.json";
import heroData from "@/content/modelo/hero.json";
import contactData from "@/content/contact.json";
import { SectionLinks } from "@/components/content/section-links";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import { PhotoGrid } from "@/components/media/photo-grid";
import { PhotoHero } from "@/components/media/photo-hero";
import {
  bodyText,
  contactHeadline,
  contentContainer,
  pagePadding,
  sectionBottomPadding,
  sectionDivider,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

function externalLink(href: string, label: string, primary = false) {
  if (!href.trim()) return null;
  return { href, label, external: true as const, primary };
}

export default function ModeloPage() {
  const { dictionary, locale } = useLanguage();

  const links = [
    {
      href: `mailto:${dictionary.modelo.contactEmail}`,
      label: `${dictionary.modelo.contact}: ${dictionary.modelo.contactEmail}`,
      primary: true,
    },
    externalLink(contactData.instagram.modelo, dictionary.modelo.instagram),
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    external?: boolean;
    primary?: boolean;
  }>;

  return (
    <PageShell>
      <main
        id="main"
        className={`${contentContainer} ${pagePadding} ${sectionBottomPadding}`}
      >
        <PageHeader title={dictionary.modelo.title} />

        <PhotoHero
          photo={heroData}
          locale={locale}
          placeholderLabel={dictionary.common.photoPlaceholder}
        />

        <p className={`max-w-2xl ${bodyText}`}>{dictionary.modelo.bio}</p>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.modelo.editorialTitle}
          </h2>
          <PhotoGrid
            photos={editorialData.photos}
            label={dictionary.common.photoPlaceholder}
            locale={locale}
          />
        </section>

        <section className={`${sectionGap} ${sectionDivider}`}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.modelo.commercialTitle}
          </h2>
          <PhotoGrid
            photos={commercialData.photos}
            label={dictionary.common.photoPlaceholder}
            locale={locale}
          />
        </section>

        <section className={sectionGap}>
          <a
            href={`mailto:${dictionary.modelo.contactEmail}`}
            className={`inline-block ${contactHeadline} transition-opacity hover:opacity-70`}
          >
            {dictionary.modelo.bookingsCta} →
          </a>
          <SectionLinks links={links} />
        </section>
      </main>
    </PageShell>
  );
}
