import type { Dictionary } from "@/lib/i18n";
import type { NavRoute, NavRouteKey } from "@/lib/navigation";

type MenuKey = keyof Dictionary["menu"];

const menuKeys: NavRouteKey[] = [
  "home",
  "actrice",
  "modelo",
  "silverPresence",
  "contacto",
];

function isMenuKey(key: NavRouteKey): key is MenuKey {
  return menuKeys.includes(key);
}

export function getNavLabel(route: NavRoute, dictionary: Dictionary): string {
  if (route.key === "pressKit") {
    return dictionary.pressKit.title;
  }
  if (isMenuKey(route.key)) {
    return dictionary.menu[route.key];
  }
  return route.key;
}
