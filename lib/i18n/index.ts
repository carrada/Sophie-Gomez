import fr from "@/content/i18n/fr.json";
import es from "@/content/i18n/es.json";
import en from "@/content/i18n/en.json";

export type Locale = "fr" | "es" | "en";

export type Dictionary = typeof fr;

export type LocalizedValue<T extends string = string> = {
  fr: T;
  es: T;
  en?: T;
};

const dictionaries: Record<Locale, Dictionary> = { fr, es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocalizedValue<T extends string>(
  value: LocalizedValue<T>,
  locale: Locale,
): T {
  if (locale === "en") {
    return value.en ?? value.fr;
  }
  return value[locale];
}

export const locales: Locale[] = ["fr", "es", "en"];

export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  es: "ES",
  en: "EN",
};

export function getOgLocale(locale: Locale): string {
  if (locale === "fr") return "fr_FR";
  if (locale === "es") return "es_MX";
  return "en_US";
}
