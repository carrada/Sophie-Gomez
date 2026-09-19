"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPaletteForPath } from "@/lib/palettes";

/** Floating label on palette preview routes. */
export function PaletteBadge() {
  const pathname = usePathname();
  const isPreview = pathname.startsWith("/paletas/");

  if (!isPreview) return null;

  const palette = getPaletteForPath(pathname);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[60] md:bottom-6 md:left-6">
      <div className="pointer-events-auto border border-brand-line bg-brand-paper/90 px-3 py-2 backdrop-blur-sm">
        <p className="font-sans text-[10px] font-medium uppercase tracking-brand text-brand-mute">
          Paleta
        </p>
        <p className="font-display text-sm text-brand-ink">{palette.name}</p>
        <Link
          href="/paletas"
          className="mt-1 inline-block font-sans text-[10px] uppercase tracking-wider text-brand-mute underline-offset-2 hover:underline"
        >
          Ver todas
        </Link>
      </div>
    </div>
  );
}
