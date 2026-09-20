import { getLocalizedValue, type Locale, type LocalizedValue } from "@/lib/i18n";
import { VideoEmbed, VideoPlaceholder } from "@/components/media/video-embed";

type ProjectCardProps = {
  title: LocalizedValue;
  role: LocalizedValue;
  synopsis?: LocalizedValue;
  year?: string;
  videoUrl?: string;
  aspect: string;
  locale: Locale;
  placeholderLabel: string;
};

export function ProjectCard({
  title,
  role,
  synopsis,
  videoUrl,
  aspect,
  locale,
  placeholderLabel,
}: ProjectCardProps) {
  const localizedTitle = getLocalizedValue(title, locale);
  const localizedRole = getLocalizedValue(role, locale);
  const localizedSynopsis = synopsis
    ? getLocalizedValue(synopsis, locale)
    : "";
  const hasVideo = Boolean(videoUrl?.trim());

  return (
    <article className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16">
      <div className="w-full md:w-[56%] md:shrink-0">
        {hasVideo ? (
          <VideoEmbed src={videoUrl!} title={localizedTitle} />
        ) : (
          <VideoPlaceholder label={placeholderLabel} aspect={aspect} />
        )}
      </div>

      <div className="w-full text-left md:w-[40%] md:shrink-0 md:pt-1">
        <div className="space-y-2">
          <h3 className="font-display text-xl text-brand-ink md:text-2xl">
            {localizedTitle}
          </h3>
          <p className="font-serif text-brand-mute">{localizedRole}</p>
          {localizedSynopsis ? (
            <p className="text-justify font-serif text-base leading-relaxed text-brand-mute">
              {localizedSynopsis}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
