export type NavRouteKey =
  | "home"
  | "actrice"
  | "modelo"
  | "silverPresence"
  | "pressKit"
  | "contacto";

export type NavRoute = {
  href: string;
  key: NavRouteKey;
};

export const primaryNavRoutes: NavRoute[] = [
  { href: "/", key: "home" },
  { href: "/actrice", key: "actrice" },
  { href: "/modelo", key: "modelo" },
  { href: "/silver-presence", key: "silverPresence" },
  { href: "/press-kit", key: "pressKit" },
  { href: "/contacto", key: "contacto" },
];

export const secondaryNavRoutes: NavRoute[] = [];

export const footerOnlyRoutes: NavRoute[] = [];

export const footerNavRoutes: NavRoute[] = [
  ...primaryNavRoutes,
  ...secondaryNavRoutes,
  ...footerOnlyRoutes,
];
