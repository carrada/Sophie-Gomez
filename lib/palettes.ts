export type PaletteFamily = "stone" | "minimal" | "elegant";

export type BrandPalette = {
  id: string;
  name: string;
  tagline: string;
  family: PaletteFamily;
  ink: string;
  mute: string;
  soft: string;
  line: string;
  lineStrong: string;
  paper: string;
  subtitle: string;
  graphite: string;
  /** Optional full-page background (e.g. soft gradient) */
  background?: string;
};

export const paletteFamilyLabels: Record<PaletteFamily, string> = {
  stone: "Stone Soft · cálidas",
  minimal: "Minimalistas",
  elegant: "Elegantes · editorial",
};

/**
 * Preview catalog for Sophie: Stone Soft family + minimalist / elegant
 * casting–editorial options (no loud accents).
 */
export const brandPalettes: BrandPalette[] = [
  // —— Stone Soft ——
  {
    id: "stone-soft",
    name: "Stone Soft",
    tagline: "Grises cálidos · papel piedra",
    family: "stone",
    ink: "#1C1917",
    mute: "#78716C",
    soft: "#A8A29E",
    line: "#D6D3D1",
    lineStrong: "#44403C",
    paper: "#FAFAF9",
    subtitle: "#4A4A4A",
    graphite: "#0C0A09",
  },
  {
    id: "warm-graphite",
    name: "Warm Graphite",
    tagline: "Solo grises cálidos · más contraste",
    family: "stone",
    ink: "#0C0A09",
    mute: "#57534E",
    soft: "#A8A29E",
    line: "#D6D3D1",
    lineStrong: "#44403C",
    paper: "#FAFAF9",
    subtitle: "#44403C",
    graphite: "#0C0A09",
  },
  {
    id: "beige-soft",
    name: "Beige Soft",
    tagline: "Beige cálido · editorial día",
    family: "stone",
    ink: "#292524",
    mute: "#7C746A",
    soft: "#B0A79C",
    line: "#E4DED4",
    lineStrong: "#57534E",
    paper: "#F5F0E8",
    subtitle: "#57534E",
    graphite: "#1C1917",
  },
  {
    id: "mist-sand",
    name: "Mist Sand",
    tagline: "Degradado piedra → arena",
    family: "stone",
    ink: "#1C1917",
    mute: "#8A847C",
    soft: "#B8B2A8",
    line: "#DDD8D0",
    lineStrong: "#5C574F",
    paper: "#F3F1EE",
    subtitle: "#5C574F",
    graphite: "#0C0A09",
    background:
      "linear-gradient(165deg, #F7F4EF 0%, #F3F1EE 42%, #EDE8E0 100%)",
  },

  // —— Minimalistas ——
  {
    id: "noir-paper",
    name: "Noir Paper",
    tagline: "Gris neutro · minimal casting",
    family: "minimal",
    ink: "#1F1F1F",
    mute: "#6B6B6B",
    soft: "#A3A3A3",
    line: "#E5E5E5",
    lineStrong: "#404040",
    paper: "#F5F5F5",
    subtitle: "#525252",
    graphite: "#171717",
  },
  {
    id: "ink-gallery",
    name: "Ink Gallery",
    tagline: "Museo · negro sobre blanco puro",
    family: "minimal",
    ink: "#0A0A0A",
    mute: "#737373",
    soft: "#A3A3A3",
    line: "#E5E5E5",
    lineStrong: "#262626",
    paper: "#FFFFFF",
    subtitle: "#404040",
    graphite: "#000000",
  },
  {
    id: "porcelain",
    name: "Porcelain",
    tagline: "Blanco suave · tipografía nítida",
    family: "minimal",
    ink: "#18181B",
    mute: "#71717A",
    soft: "#A1A1AA",
    line: "#E4E4E7",
    lineStrong: "#3F3F46",
    paper: "#FAFAFA",
    subtitle: "#52525B",
    graphite: "#09090B",
  },
  {
    id: "ash-line",
    name: "Ash Line",
    tagline: "Ceniza clara · líneas finas",
    family: "minimal",
    ink: "#262626",
    mute: "#737373",
    soft: "#A3A3A3",
    line: "#D4D4D4",
    lineStrong: "#404040",
    paper: "#F4F4F5",
    subtitle: "#525252",
    graphite: "#171717",
  },
  {
    id: "cloud-quiet",
    name: "Cloud Quiet",
    tagline: "Gris nube · casi invisible",
    family: "minimal",
    ink: "#1C1C1C",
    mute: "#8A8A8A",
    soft: "#B5B5B5",
    line: "#E8E8E8",
    lineStrong: "#4A4A4A",
    paper: "#F7F7F7",
    subtitle: "#5C5C5C",
    graphite: "#111111",
  },

  // —— Elegantes / editorial ——
  {
    id: "slate-cool",
    name: "Slate Cool",
    tagline: "Azul-gris frío · cine contemporáneo",
    family: "elegant",
    ink: "#1E293B",
    mute: "#64748B",
    soft: "#94A3B8",
    line: "#E2E8F0",
    lineStrong: "#334155",
    paper: "#F8FAFC",
    subtitle: "#475569",
    graphite: "#0F172A",
  },
  {
    id: "pearl-editorial",
    name: "Pearl Editorial",
    tagline: "Perla fría · fashion quiet",
    family: "elegant",
    ink: "#1A1A1A",
    mute: "#6F6B66",
    soft: "#A39E97",
    line: "#E8E6E3",
    lineStrong: "#3D3A37",
    paper: "#F6F5F3",
    subtitle: "#4F4B47",
    graphite: "#121110",
  },
  {
    id: "silver-presence",
    name: "Silver Presence",
    tagline: "Plata suave · presencia editorial",
    family: "elegant",
    ink: "#1F2933",
    mute: "#7B8794",
    soft: "#9AA5B1",
    line: "#E4E7EB",
    lineStrong: "#3E4C59",
    paper: "#F5F7FA",
    subtitle: "#52606D",
    graphite: "#1A202C",
  },
  {
    id: "charcoal-silk",
    name: "Charcoal Silk",
    tagline: "Carbón sobre seda · alto contraste",
    family: "elegant",
    ink: "#141414",
    mute: "#6B6B6B",
    soft: "#9C9C9C",
    line: "#DEDEDE",
    lineStrong: "#2E2E2E",
    paper: "#F2F2F0",
    subtitle: "#4A4A4A",
    graphite: "#0A0A0A",
  },
  {
    id: "linen-atelier",
    name: "Linen Atelier",
    tagline: "Lino natural · atelier europeo",
    family: "elegant",
    ink: "#2C2A26",
    mute: "#7A756C",
    soft: "#A9A297",
    line: "#E2DDD4",
    lineStrong: "#4A463F",
    paper: "#F8F5F0",
    subtitle: "#5A554C",
    graphite: "#1A1814",
  },
  {
    id: "dawn-veil",
    name: "Dawn Veil",
    tagline: "Degradado perla → niebla",
    family: "elegant",
    ink: "#1C1917",
    mute: "#756F69",
    soft: "#A39C94",
    line: "#E5E1DB",
    lineStrong: "#3F3A36",
    paper: "#F7F5F2",
    subtitle: "#524E49",
    graphite: "#0C0A09",
    background:
      "linear-gradient(160deg, #FBFAF8 0%, #F7F5F2 40%, #EFEBE5 100%)",
  },
  {
    id: "ivory-quiet",
    name: "Ivory Quiet",
    tagline: "Marfil limpio · elegancia discreta",
    family: "elegant",
    ink: "#1A1816",
    mute: "#6E6963",
    soft: "#A39C94",
    line: "#E8E4DE",
    lineStrong: "#3D3A36",
    paper: "#FBF9F6",
    subtitle: "#504C47",
    graphite: "#0F0E0C",
  },
];

export const defaultPalette =
  brandPalettes.find((p) => p.id === "stone-soft") ?? brandPalettes[0];

/** Canonical site palette: Stone Soft (gris clarito). */
export const sitePalette = defaultPalette;

export function paletteHref(id: string) {
  return `/paletas/${id}`;
}

export function getPaletteById(id: string): BrandPalette | undefined {
  return brandPalettes.find((p) => p.id === id);
}

export function getPaletteForPath(pathname: string): BrandPalette {
  if (pathname.startsWith("/paletas/")) {
    const id = pathname.split("/")[2];
    return (id && getPaletteById(id)) || sitePalette;
  }
  return sitePalette;
}

export function applyPaletteToDocument(palette: BrandPalette) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--brand-ink", palette.ink);
  root.style.setProperty("--brand-mute", palette.mute);
  root.style.setProperty("--brand-soft", palette.soft);
  root.style.setProperty("--brand-line", palette.line);
  root.style.setProperty("--brand-line-strong", palette.lineStrong);
  root.style.setProperty("--brand-paper", palette.paper);
  root.style.setProperty("--brand-subtitle", palette.subtitle);
  root.style.setProperty("--brand-graphite", palette.graphite);
  root.style.setProperty(
    "--brand-bg",
    palette.background ?? palette.paper,
  );
}

export function getAdjacentPalettes(id: string) {
  const index = brandPalettes.findIndex((p) => p.id === id);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? brandPalettes[index - 1] : null,
    next: index < brandPalettes.length - 1 ? brandPalettes[index + 1] : null,
  };
}
