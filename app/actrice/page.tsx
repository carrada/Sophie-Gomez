"use client";

import actriceData from "@/content/actrice/projects.json";
import contactData from "@/content/contact.json";
import { ProjectCard } from "@/components/content/project-card";
import { SectionLinks } from "@/components/content/section-links";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import { PhotoGrid } from "@/components/media/photo-grid";
import { VideoEmbed, VideoPlaceholder } from "@/components/media/video-embed";
import {
  bodyText,
  contentContainer,
  pagePadding,
  sectionBottomPadding,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

function externalLink(href: string, label: string, primary = false) {
  if (!href.trim()) return null;
  return { href, label, external: true as const, primary };
}

export default function ActricePage() {
  const { dictionary, locale } = useLanguage();
  const hasDemoReel = Boolean(actriceData.demoReel?.trim());
  const projectTotal = actriceData.projects.length;

  const links = [
    {
      href: `mailto:${dictionary.actrice.contactEmail}`,
      label: `${dictionary.actrice.contact}: ${dictionary.actrice.contactEmail}`,
      primary: true,
    },
    externalLink(contactData.instagram.actrice, dictionary.actrice.instagram),
    externalLink(contactData.imdb, dictionary.actrice.imdb),
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
        <PageHeader title={dictionary.actrice.title} />

        <p className={`max-w-2xl ${bodyText}`}>{dictionary.actrice.bio}</p>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.actrice.demoReelTitle}
          </h2>
          {hasDemoReel ? (
            <VideoEmbed
              src={actriceData.demoReel}
              title={dictionary.actrice.demoReelTitle}
              poster={actriceData.demoReelPoster}
              watchLabel={dictionary.common.watchReel}
            />
          ) : (
            <VideoPlaceholder
              label={dictionary.common.videoPlaceholder}
              aspect="aspect-video"
            />
          )}
        </section>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.actrice.photosTitle}
          </h2>
          <PhotoGrid
            photos={actriceData.photos}
            label={dictionary.common.photoPlaceholder}
            locale={locale}
          />
        </section>

        <section className={sectionGap}>
          <h2 className={`mb-6 ${sectionLabel}`}>
            {dictionary.actrice.projectsTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {actriceData.projects.map((project, index) => (
              <li key={project.id}>
                <ProjectCard
                  title={project.title}
                  role={project.role}
                  year={project.year}
                  videoUrl={project.videoUrl}
                  aspect={project.aspect}
                  locale={locale}
                  placeholderLabel={dictionary.common.videoPlaceholder}
                  index={index + 1}
                  total={projectTotal}
                />
              </li>
            ))}
          </ul>
        </section>

        <SectionLinks links={links} />
      </main>
    </PageShell>
  );
}
