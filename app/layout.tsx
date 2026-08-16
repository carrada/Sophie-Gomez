import type { Metadata } from "next";
import { Cormorant_Garamond, Marcellus, Montserrat } from "next/font/google";
import contactData from "@/content/contact.json";
import fr from "@/content/i18n/fr.json";
import { Providers } from "@/components/providers";
import { PersonSchema } from "@/components/seo/person-schema";
import "@/components/ui/staggered-menu.css";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const siteUrl = contactData.siteUrl.replace(/\/$/, "");
const ogImage = "/opengraph-image";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: fr.meta.title,
    template: `%s — ${fr.nav.name}`,
  },
  description: fr.meta.description,
  openGraph: {
    title: fr.meta.title,
    description: fr.meta.description,
    url: siteUrl,
    siteName: fr.nav.name,
    locale: "fr_FR",
    alternateLocale: ["es_MX", "en_US"],
    type: "website",
    ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
  },
  twitter: {
    card: ogImage ? "summary_large_image" : "summary",
    title: fr.meta.title,
    description: fr.meta.description,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${marcellus.variable} ${montserrat.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <PersonSchema />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
