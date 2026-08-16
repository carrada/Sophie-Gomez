"use client";

import { useEffect } from "react";
import landingData from "@/content/landing.json";
import contactData from "@/content/contact.json";
import { useLanguage } from "@/components/i18n/language-provider";
import { getOgLocale } from "@/lib/i18n";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

export function DocumentHead() {
  const { dictionary, locale } = useLanguage();
  const siteUrl = contactData.siteUrl.replace(/\/$/, "");
  const ogImage = landingData.ogImage?.trim();
  const imageUrl = ogImage ? `${siteUrl}${ogImage}` : undefined;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = dictionary.meta.title;

    upsertMeta("name", "description", dictionary.meta.description);
    upsertMeta("property", "og:title", dictionary.meta.title);
    upsertMeta("property", "og:description", dictionary.meta.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", getOgLocale(locale));
    upsertMeta("property", "og:url", siteUrl);

    if (imageUrl) {
      upsertMeta("property", "og:image", imageUrl);
    }

    upsertMeta("name", "twitter:card", imageUrl ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", dictionary.meta.title);
    upsertMeta("name", "twitter:description", dictionary.meta.description);

    if (imageUrl) {
      upsertMeta("name", "twitter:image", imageUrl);
    }
  }, [dictionary, imageUrl, locale, siteUrl]);

  return null;
}
