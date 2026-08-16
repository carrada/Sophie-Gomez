"use client";

import contactData from "@/content/contact.json";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/site-nav";
import {
  contactHeadline,
  contentContainer,
  linkPrimary,
  pagePadding,
  sectionBottomPadding,
  sectionGap,
  sectionLabel,
} from "@/lib/constants";

export default function ContactoPage() {
  const { dictionary } = useLanguage();
  const sophieEmail = contactData.emails.modelo;

  return (
    <PageShell>
      <main
        id="main"
        className={`${contentContainer} ${pagePadding} ${sectionBottomPadding}`}
      >
        <PageHeader title={dictionary.contacto.title} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <section>
            <h2 className={sectionLabel}>{dictionary.contacto.actingMexico}</h2>
            <p className="mt-3 font-serif text-lg text-brand-ink">
              {dictionary.contacto.actingMexicoAgency}
            </p>
            <a
              href={`mailto:${contactData.emails.actrice}`}
              className={`mt-2 inline-block ${linkPrimary}`}
            >
              {contactData.emails.actrice}
            </a>
          </section>

          <section>
            <h2 className={sectionLabel}>{dictionary.contacto.direct}</h2>
            <a
              href={`mailto:${sophieEmail}`}
              className={`mt-3 inline-block ${linkPrimary}`}
            >
              {sophieEmail}
            </a>
            {contactData.instagram.actrice.trim() ? (
              <a
                href={contactData.instagram.actrice}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 block ${linkPrimary}`}
              >
                {dictionary.contacto.instagram}
              </a>
            ) : null}
            {contactData.imdb.trim() ? (
              <a
                href={contactData.imdb}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 block ${linkPrimary}`}
              >
                {dictionary.contacto.imdb}
              </a>
            ) : null}
          </section>

          <section>
            <h2 className={sectionLabel}>{dictionary.contacto.modeling}</h2>
            <a
              href={`mailto:${contactData.emails.modelo}`}
              className={`mt-3 inline-block ${linkPrimary}`}
            >
              {contactData.emails.modelo}
            </a>
          </section>
        </div>

        <section className={sectionGap}>
          <a
            href={`mailto:${sophieEmail}`}
            className={`block ${contactHeadline} transition-opacity hover:opacity-70`}
          >
            {dictionary.contacto.headline}
          </a>
        </section>
      </main>
    </PageShell>
  );
}
