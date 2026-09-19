"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  applyPaletteToDocument,
  getPaletteForPath,
} from "@/lib/palettes";

/** Applies a preview palette on `/paletas/[slug]`; elsewhere keeps Stone Soft. */
export function RoutePalette() {
  const pathname = usePathname();

  useEffect(() => {
    applyPaletteToDocument(getPaletteForPath(pathname));
  }, [pathname]);

  return null;
}
