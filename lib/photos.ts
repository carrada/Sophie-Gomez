import type { Locale } from "@/lib/i18n";
import { getLocalizedValue, type LocalizedValue } from "@/lib/i18n";

export type LocalizedString = LocalizedValue<string>;

export type PhotoItem = {
  id: string;
  aspect: string;
  src?: string;
  alt?: LocalizedString;
  credit?: string;
};

export function hasPhotoSrc(photo: PhotoItem): boolean {
  return Boolean(photo.src?.trim());
}

export function getPhotoAlt(
  photo: PhotoItem,
  locale: Locale,
  fallback: string,
): string {
  if (photo.alt) {
    return getLocalizedValue(photo.alt, locale);
  }
  return fallback;
}
