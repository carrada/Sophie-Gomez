"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  src: string;
  title: string;
  poster?: string;
  watchLabel?: string;
  className?: string;
};

function withAutoplayParams(url: string) {
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    ) {
      parsed.searchParams.set("autoplay", "1");
      parsed.searchParams.set("mute", "1");
      parsed.searchParams.set("playsinline", "1");
      return parsed.toString();
    }
    if (parsed.hostname.includes("vimeo.com")) {
      parsed.searchParams.set("autoplay", "1");
      parsed.searchParams.set("muted", "1");
      return parsed.toString();
    }
  } catch {
    return url;
  }
  return url;
}

export function VideoEmbed({
  src,
  title,
  poster = "",
  watchLabel = "Play",
  className = "",
}: VideoEmbedProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const posterSrc = poster.trim();
  const usePosterGate = isMobile && Boolean(posterSrc) && !showIframe;

  const iframeSrc = useMemo(
    () => (isMobile ? src : withAutoplayParams(src)),
    [isMobile, src],
  );

  if (usePosterGate) {
    return (
      <button
        type="button"
        onClick={() => setShowIframe(true)}
        className={`group relative aspect-video w-full overflow-hidden bg-brand-line text-left ${className}`}
        aria-label={watchLabel}
      >
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-opacity group-hover:opacity-90"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-brand-graphite/35 transition-colors group-hover:bg-brand-graphite/25"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-brand-paper/80 px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-brand text-brand-paper backdrop-blur-sm">
            {watchLabel}
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className={`relative aspect-video w-full bg-brand-line ${className}`}>
      <iframe
        src={iframeSrc}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

type VideoPlaceholderProps = {
  label: string;
  aspect?: string;
};

export function VideoPlaceholder({
  label,
  aspect = "aspect-video",
}: VideoPlaceholderProps) {
  return (
    <div
      className={`flex w-full items-center justify-center bg-brand-line ${aspect}`}
      aria-label={label}
    >
      <span className="text-sm uppercase tracking-[0.2em] text-brand-soft">
        {label}
      </span>
    </div>
  );
}
