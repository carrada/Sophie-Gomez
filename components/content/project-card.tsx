import { getLocalizedValue, type Locale } from "@/lib/i18n";
import { VideoEmbed, VideoPlaceholder } from "@/components/media/video-embed";

type ProjectCardProps = {
  title: { fr: string; es: string };
  role: { fr: string; es: string };
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
          <p className="text-brand-soft">{year}</p>
        </div>
        {index !== undefined && total !== undefined && (
          <span className="shrink-0 text-brand-soft">
            {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        )}
      </div>
    </article>
  );
}
