"use client";

import silverData from "@/content/silver-presence/videos.json";
import contactData from "@/content/contact.json";
import { SectionLinks } from "@/components/content/section-links";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import { VideoEmbed, VideoPlaceholder } from "@/components/media/video-embed";
import { getLocalizedValue } from "@/lib/i18n";
import {
  bodyText,
  contentContainer,
  pagePadding,
  sectionBottomPadding,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

export default function SilverPresencePage() {
  const { dictionary, locale } = useLanguage();
  const hasMainVideo = Boolean(silverData.mainVideo?.trim());

  return (
    <PageShell>
      <main
        id="main"
        className={`${contentContainer} ${pagePadding} ${sectionBottomPadding}`}
      >
        <PageHeader title={dictionary.silverPresence.title} />

        <p className={`max-w-2xl ${bodyText}`}>{dictionary.silverPresence.bio}</p>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.silverPresence.videoTitle}
          </h2>
          {hasMainVideo ? (
            <VideoEmbed
              src={silverData.mainVideo}
              title={dictionary.silverPresence.title}
            />
          ) : (
            <VideoPlaceholder label={dictionary.common.videoPlaceholder} />
          )}
        </section>

        {silverData.videos.some((video) => video.videoUrl?.trim()) && (
          <section className={`${sectionGap} space-y-10`}>
            {silverData.videos
              .filter((video) => video.videoUrl?.trim())
              .map((video) => (
                <div key={video.id}>
                  <h3 className="mb-4 font-sans text-sm tracking-wide text-brand-mute">
                    {getLocalizedValue(video.title, locale)}
                  </h3>
                  <VideoEmbed
                    src={video.videoUrl}
                    title={getLocalizedValue(video.title, locale)}
                  />
                </div>
              ))}
          </section>
        )}

        <SectionLinks
          links={[
            {
              href: contactData.instagram.silverPresence,
              label: dictionary.silverPresence.instagram,
              external: true,
              primary: true,
            },
            {
              href: contactData.youtube,
              label: dictionary.silverPresence.youtube,
              external: true,
            },
          ]}
        />
      </main>
    </PageShell>
  );
}
