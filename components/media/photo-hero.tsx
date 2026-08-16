"use client";

import { useState } from "react";
import Image from "next/image";
import { getPhotoAlt, hasPhotoSrc, type PhotoItem } from "@/lib/photos";
import type { Locale } from "@/lib/i18n";

type PhotoHeroProps = {
  photo: PhotoItem & { aspect?: string };
  locale: Locale;
  placeholderLabel: string;
};

export function PhotoHero({ photo, locale, placeholderLabel }: PhotoHeroProps) {
  const [failed, setFailed] = useState(false);
  const aspect = photo.aspect ?? "aspect-[4/5] sm:aspect-[16/9]";
  const alt = getPhotoAlt(photo, locale, placeholderLabel);
  const showImage = hasPhotoSrc(photo) && !failed;

  return (
    <figure className="mb-10 md:mb-12">
      {showImage ? (
        <div className={`relative ${aspect} w-full overflow-hidden bg-brand-line`}>
          <Image
            src={photo.src!}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div
          className={`${aspect} flex w-full items-center justify-center bg-brand-line`}
          role="img"
          aria-label={alt}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-brand-soft">
            {placeholderLabel}
          </span>
        </div>
      )}
      {photo.credit ? (
        <figcaption className="mt-2 font-sans text-xs tracking-wide text-brand-soft">
          {photo.credit}
        </figcaption>
      ) : null}
    </figure>
  );
}
