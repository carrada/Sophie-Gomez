"use client";

import pressKitData from "@/content/press-kit/assets.json";
import contactData from "@/content/contact.json";
import { PressDownload } from "@/components/content/press-download";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import { PhotoGrid } from "@/components/media/photo-grid";
import {
  bodyText,
  contentContainer,
  pagePadding,
  sectionBottomPadding,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

export default function PressKitPage() {
  const { dictionary, locale } = useLanguage();

  return (
    <PageShell>
      <main
        id="main"
        className={`${contentContainer} ${pagePadding} ${sectionBottomPadding}`}
      >
        <PageHeader title={dictionary.pressKit.title} />

        <p className={`max-w-2xl ${bodyText}`}>{dictionary.pressKit.bio}</p>

        <div className="mt-8">
          <PressDownload
            href={contactData.pressKitPdf}
            label={dictionary.pressKit.download}
          />
        </div>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.pressKit.photosTitle}
          </h2>
          <PhotoGrid
            photos={pressKitData.photos}
            label={dictionary.common.photoPlaceholder}
            locale={locale}
            columns="2"
          />
        </section>
      </main>
    </PageShell>
  );
}
