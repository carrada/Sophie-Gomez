import { getLocalizedValue, type Locale, type LocalizedValue } from "@/lib/i18n";
import { VideoEmbed, VideoPlaceholder } from "@/components/media/video-embed";

type ProjectCardProps = {
  title: LocalizedValue;
  role: LocalizedValue;
  synopsis?: LocalizedValue;
  year: string;
  videoUrl?: string;
  aspect: string;
  locale: Locale;
  placeholderLabel: string;
  index?: number;
  total?: number;
};

export function ProjectCard({
  title,
  role,
  synopsis,
  year,
  videoUrl,
  aspect,
  locale,
  placeholderLabel,
  index,
  total,
}: ProjectCardProps) {
  const localizedTitle = getLocalizedValue(title, locale);
  const localizedRole = getLocalizedValue(role, locale);
  const localizedSynopsis = synopsis
    ? getLocalizedValue(synopsis, locale)
    : "";
  const hasVideo = Boolean(videoUrl?.trim());

  return (
    <article>
      {hasVideo ? (
        <VideoEmbed src={videoUrl!} title={localizedTitle} />
      ) : (
        <VideoPlaceholder label={placeholderLabel} aspect={aspect} />
      )}

      <div className="mt-4 flex items-start justify-between gap-4 font-sans text-sm tracking-wide">
        <div className="space-y-1.5">
          <h3 className="font-display text-lg text-brand-ink">{localizedTitle}</h3>
          <p className="font-serif text-brand-mute">{localizedRole}</p>
          {localizedSynopsis ? (
            <p className="max-w-xl font-serif text-base leading-relaxed text-brand-mute">
              {localizedSynopsis}
            </p>
          ) : null}
          <p className="text-brand-soft">{year}</p>
        </div>
        {index !== undefined && total !== undefined ? (
          <span className="shrink-0 text-brand-soft">
            {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        ) : null}
      </div>
    </article>
  );
}
