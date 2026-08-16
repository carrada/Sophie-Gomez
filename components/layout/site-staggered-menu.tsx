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
import { filterSocialLinks } from "@/lib/social-links";
import { getNavLabel } from "@/lib/nav-labels";
import { primaryNavRoutes } from "@/lib/navigation";

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

  const socialItems = filterSocialLinks([
    { label: "Instagram", link: contactData.instagram.actrice },
    { label: "IMDB", link: contactData.imdb },
    { label: "YouTube", link: contactData.youtube },
  ]);

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
      displayItemNumbering
      menuText={stripBrackets(dictionary.nav.menu)}
      closeText={stripBrackets(dictionary.nav.closeMenu)}
      socialsTitle={dictionary.footer.socials}
      colors={["#D6D3D1", "#A8A29E", "#78716C"]}
      menuButtonColor="#1C1917"
      openMenuButtonColor="#1C1917"
      accentColor="#1C1917"
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
