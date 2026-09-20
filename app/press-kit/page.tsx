"use client";

import Image from "next/image";
import pressKitData from "@/content/press-kit/assets.json";
import contactData from "@/content/contact.json";
import { PressDownload } from "@/components/content/press-download";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import { PhotoGrid } from "@/components/media/photo-grid";
import { hasPhotoSrc } from "@/lib/photos";
import { getLocalizedValue } from "@/lib/i18n";
import {
  bodyText,
  contentContainer,
  pagePadding,
  sectionBottomPadding,
  sectionDivider,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

export default function PressKitPage() {
  const { dictionary, locale } = useLanguage();
  const photos = pressKitData.photos.filter(hasPhotoSrc);
  const pages = pressKitData.pages ?? [];

  return (
    <PageShell>
      <main
        id="main"
        className={`${contentContainer} ${pagePadding} ${sectionBottomPadding}`}
      >
        <PageHeader title={dictionary.pressKit.title} />

        <p className={`mx-auto max-w-2xl ${bodyText}`}>{dictionary.pressKit.bio}</p>

        <div className="mt-8 text-center md:mt-10">
          <PressDownload
            href={contactData.pressKitPdf}
            label={dictionary.pressKit.download}
          />
        </div>

        {pages.length > 0 ? (
          <section
            className={`${sectionGap} text-center`}
            aria-label={dictionary.pressKit.previewTitle}
          >
            <h2 className={`mb-6 ${sectionLabel}`}>
              {dictionary.pressKit.previewTitle}
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {pages.map((page) => (
                <li key={page.id}>
                  <a
                    href={contactData.pressKitPdf}
                    download="Sophie-Gaelle-Gomez-Press-Kit.pdf"
                    className="group block overflow-hidden border border-brand-line bg-brand-paper transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
                  >
                    <div className="relative aspect-[612/792] w-full bg-brand-line">
                      <Image
                        src={page.src}
                        alt={getLocalizedValue(page.alt, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <p className="border-t border-brand-line px-3 py-2.5 font-sans text-xs uppercase tracking-brand text-brand-mute transition-opacity group-hover:opacity-70">
                      {dictionary.pressKit.download}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {photos.length > 0 ? (
          <section className={`${sectionGap} ${sectionDivider}`}>
            <h2 className={`mb-6 ${sectionLabel}`}>
              {dictionary.pressKit.photosTitle}
            </h2>
            <PhotoGrid
              photos={photos}
              label={dictionary.common.photoPlaceholder}
              locale={locale}
              columns="2"
            />
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}
