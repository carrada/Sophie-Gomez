import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/site-nav";
import {
  brandPalettes,
  getAdjacentPalettes,
  getPaletteById,
  paletteFamilyLabels,
  paletteHref,
} from "@/lib/palettes";
import {
  bodyText,
  brandSubtitle,
  contentContainer,
  displayTitle,
  linkPrimary,
  pagePadding,
  pageTopPadding,
  sectionBottomPadding,
} from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brandPalettes.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const palette = getPaletteById(slug);
  if (!palette) return { title: "Paleta" };
  return {
    title: `Paleta · ${palette.name}`,
    robots: { index: false, follow: false },
  };
}

export default async function PalettePreviewPage({ params }: Props) {
  const { slug } = await params;
  const palette = getPaletteById(slug);
  if (!palette) notFound();

  const { prev, next } = getAdjacentPalettes(palette.id);
  const swatches = [
    { label: "Ink", hex: palette.ink },
    { label: "Mute", hex: palette.mute },
    { label: "Soft", hex: palette.soft },
    { label: "Line", hex: palette.line },
    { label: "Paper", hex: palette.paper },
  ];

  return (
    <PageShell>
      <main
        id="main"
        className={`${pageTopPadding} ${sectionBottomPadding} ${pagePadding}`}
      >
        <div className={contentContainer}>
          <p className={brandSubtitle}>
            {paletteFamilyLabels[palette.family]}
          </p>
          <h1 className={`${displayTitle} mt-4 text-brand-ink`}>
            Sophie Gaëlle Gomez
          </h1>
          <p className="mt-4 font-sans text-sm font-medium uppercase tracking-brand text-brand-subtitle">
            Actrice · Modèle · Silver Presence
          </p>
          <p className={`${bodyText} mt-6 max-w-xl`}>
            {palette.name} — {palette.tagline}. Vista previa con la tipografía
            del sitio (Marcellus, Montserrat, Cormorant) y el menú en esta
            paleta.
          </p>

          <div className="mt-10 flex flex-wrap gap-6 border-t border-brand-line pt-8">
            <Link href="/actrice" className={linkPrimary}>
              Actrice
            </Link>
            <Link href="/modelo" className={linkPrimary}>
              Modelo
            </Link>
            <Link href="/contacto" className={linkPrimary}>
              Contacto
            </Link>
          </div>

          <section className="mt-14 border-t border-brand-line pt-10">
            <p className={brandSubtitle}>Muestras</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {swatches.map((s) => (
                <div key={s.label} className="flex flex-col gap-2">
                  <span
                    className="h-16 w-16 border border-brand-line sm:h-20 sm:w-20"
                    style={{ backgroundColor: s.hex }}
                    title={s.hex}
                  />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-brand-mute">
                    {s.label}
                  </span>
                  <span className="font-sans text-[10px] text-brand-soft">
                    {s.hex}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 max-w-2xl border-t border-brand-line pt-10">
            <h2 className="font-display text-3xl text-brand-ink md:text-4xl">
              {palette.name}
            </h2>
            <p className={`${bodyText} mt-4`}>
              Texto de cuerpo en Cormorant Garamond: presencia serena, casting
              editorial, Mexico · Europe. Ideal para valorar contraste de
              lectura y atmósfera de fondo.
            </p>
            <p className="mt-6 font-sans text-sm font-medium uppercase tracking-brand text-brand-subtitle">
              Subtítulo Montserrat · tracking amplio
            </p>
          </section>

          <nav className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-brand-line pt-8">
            <div>
              {prev ? (
                <Link
                  href={paletteHref(prev.id)}
                  className="font-sans text-sm text-brand-mute transition-opacity hover:opacity-60"
                >
                  ← {prev.name}
                </Link>
              ) : (
                <span />
              )}
            </div>
            <Link
              href="/paletas"
              className="font-sans text-xs font-medium uppercase tracking-brand text-brand-ink"
            >
              Todas las paletas
            </Link>
            <div className="text-right">
              {next ? (
                <Link
                  href={paletteHref(next.id)}
                  className="font-sans text-sm text-brand-mute transition-opacity hover:opacity-60"
                >
                  {next.name} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>
        </div>
      </main>
    </PageShell>
  );
}
