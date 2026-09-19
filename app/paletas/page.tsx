import Link from "next/link";
import { PageShell } from "@/components/layout/site-nav";
import {
  brandPalettes,
  paletteFamilyLabels,
  paletteHref,
  type PaletteFamily,
} from "@/lib/palettes";
import {
  bodyText,
  brandSubtitle,
  contentContainer,
  pagePadding,
  pageTitle,
  pageTopPadding,
  sectionBottomPadding,
} from "@/lib/constants";

export const metadata = {
  title: "Paletas",
  robots: { index: false, follow: false },
};

const familyOrder: PaletteFamily[] = ["minimal", "elegant", "stone"];

export default function PaletasPage() {
  return (
    <PageShell>
      <main
        id="main"
        className={`${pageTopPadding} ${sectionBottomPadding} ${pagePadding}`}
      >
        <div className={contentContainer}>
          <p className={brandSubtitle}>Comparación</p>
          <h1 className={`${pageTitle} mt-3 text-brand-ink`}>
            Paletas para Sophie
          </h1>
          <p className={`${bodyText} mt-4 max-w-2xl`}>
            Minimalistas, elegantes y Stone Soft. Cada enlace abre una vista
            previa a pantalla completa con tipografía, menú y fondo de esa
            paleta.
          </p>

          {familyOrder.map((family) => {
            const group = brandPalettes.filter((p) => p.family === family);
            return (
              <section key={family} className="mt-14">
                <h2 className="font-sans text-xs font-medium uppercase tracking-brand text-brand-mute">
                  {paletteFamilyLabels[family]}
                </h2>
                <ul className="mt-6 space-y-8">
                  {group.map((palette) => (
                    <li
                      key={palette.id}
                      className="border-t border-brand-line pt-6"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-brand-ink md:text-3xl">
                            {palette.name}
                          </h3>
                          <p className={`${bodyText} mt-1`}>
                            {palette.tagline}
                          </p>
                        </div>
                        <Link
                          href={paletteHref(palette.id)}
                          className="font-sans text-sm font-medium uppercase tracking-brand text-brand-ink underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
                        >
                          Ver paleta
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          palette.ink,
                          palette.mute,
                          palette.soft,
                          palette.line,
                          palette.paper,
                        ].map((hex) => (
                          <span
                            key={`${palette.id}-${hex}`}
                            className="h-10 w-10 border border-brand-line"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </PageShell>
  );
}
