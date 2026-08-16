"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import {
  getPhotoAlt,
  hasPhotoSrc,
  type PhotoItem,
} from "@/lib/photos";

type PhotoGridProps = {
  photos: PhotoItem[];
  label: string;
  locale?: Locale;
  columns?: "2" | "3";
};

function PhotoCell({
  photo,
  alt,
  label,
  columns,
}: {
  photo: PhotoItem;
  alt: string;
  label: string;
  columns: "2" | "3";
}) {
  const [failed, setFailed] = useState(false);
  const showImage = hasPhotoSrc(photo) && !failed;

  return (
    <figure>
      {showImage ? (
        <div className={`relative ${photo.aspect} w-full overflow-hidden bg-brand-line`}>
          <Image
            src={photo.src!}
            alt={alt}
            fill
            sizes={
              columns === "2"
                ? "(max-width: 640px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div
          className={`${photo.aspect} flex w-full items-center justify-center bg-brand-line`}
          role="img"
          aria-label={alt}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-brand-soft">
            {label}
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

export function PhotoGrid({
  photos,
  label,
  locale = "fr",
  columns = "3",
}: PhotoGridProps) {
  const gridClass =
    columns === "2"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
      : "grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 md:gap-8";

  return (
    <ul className={gridClass}>
      {photos.map((photo) => {
        const alt = getPhotoAlt(photo, locale, `${label} ${photo.id}`);

        return (
          <li key={photo.id}>
            <PhotoCell photo={photo} alt={alt} label={label} columns={columns} />
          </li>
        );
      })}
    </ul>
  );
}

