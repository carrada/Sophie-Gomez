import contactData from "@/content/contact.json";
import landingData from "@/content/landing.json";
import { filterSocialLinks } from "@/lib/social-links";

export function PersonSchema() {
  const sameAs = filterSocialLinks([
    { label: "Instagram", link: contactData.instagram.actrice },
    { label: "IMDB", link: contactData.imdb },
    { label: "YouTube", link: contactData.youtube },
  ]).map((item) => item.link);

  const siteUrl = contactData.siteUrl.replace(/\/$/, "");
  const image = landingData.portraitSrc?.trim()
    ? `${siteUrl}${landingData.portraitSrc}`
    : landingData.ogImage?.trim()
      ? `${siteUrl}${landingData.ogImage}`
      : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sophie Gaëlle Gomez",
    jobTitle: ["Actress", "Model"],
    url: siteUrl,
    email: contactData.emails.modelo,
    ...(image ? { image } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
