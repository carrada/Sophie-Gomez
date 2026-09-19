"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import contactData from "@/content/contact.json";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  StaggeredMenu,
  type StaggeredMenuHandle,
  type StaggeredMenuItem,
} from "@/components/ui/staggered-menu";
import { getNavLabel } from "@/lib/nav-labels";
import { primaryNavRoutes } from "@/lib/navigation";
import { getPaletteForPath, sitePalette } from "@/lib/palettes";

function stripBrackets(value: string) {
  return value.replace(/^\[\s*|\s*\]$/g, "").trim();
}

type SiteStaggeredMenuProps = {
  onOpenChange?: (open: boolean) => void;
};

export function SiteStaggeredMenu({ onOpenChange }: SiteStaggeredMenuProps) {
  const { dictionary } = useLanguage();
  const pathname = usePathname();
  const menuRef = useRef<StaggeredMenuHandle>(null);

  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  const items = useMemo<StaggeredMenuItem[]>(() => {
    const isActive = (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return primaryNavRoutes.map((route) => {
      const label = getNavLabel(route, dictionary);

      return {
        label,
        link: route.href,
        ariaLabel: label,
        active: isActive(route.href),
      };
    });
  }, [dictionary, pathname]);

  const socialItems = [
    { label: "Instagram", link: contactData.instagram.actrice },
    { label: "IMDB", link: contactData.imdb },
    { label: "YouTube", link: contactData.youtube },
  ].filter(
    (item) => item.label === "YouTube" || Boolean(item.link?.trim()),
  );

  const palette = getPaletteForPath(pathname) ?? sitePalette;

  return (
    <StaggeredMenu
      ref={menuRef}
      hideHeader
      hideToggleLabel
      isFixed
      position="right"
      items={items}
      socialItems={socialItems}
      displaySocials={socialItems.length > 0}
      displayItemNumbering={false}
      menuText={stripBrackets(dictionary.nav.menu)}
      closeText={stripBrackets(dictionary.nav.closeMenu)}
      socialsTitle={dictionary.footer.socials}
      colors={[palette.line, palette.soft, palette.mute]}
      menuButtonColor={palette.ink}
      openMenuButtonColor={palette.ink}
      accentColor={palette.ink}
      changeMenuColorOnOpen={false}
      closeOnClickAway
      onOpenChange={(open) => {
        document.body.style.overflow = open ? "hidden" : "";
        onOpenChange?.(open);
      }}
      onItemClick={() => menuRef.current?.close()}
      toggleClassName="relative z-[80] flex h-full items-center text-inherit focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
    />
  );
}
