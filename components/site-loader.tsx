"use client";

import { useEffect, useState } from "react";
import { useDictionary } from "@/components/i18n/language-provider";
import { LoaderOne } from "@/components/ui/loader";

const SESSION_KEY = "sophie-gomez-loader-seen";
const MIN_DISPLAY_MS = 300;
const MAX_DISPLAY_MS = 600;

export function SiteLoader() {
  const dictionary = useDictionary();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || sessionStorage.getItem(SESSION_KEY) === "1") {
      setMounted(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
    const startedAt = Date.now();

    const finish = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(() => setMounted(false), 400);
      }, remaining);
    };

    if (document.readyState === "complete") {
      window.setTimeout(finish, MAX_DISPLAY_MS);
    } else {
      window.addEventListener("load", finish, { once: true });
      const fallback = window.setTimeout(finish, MAX_DISPLAY_MS);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-busy={visible}
      aria-label={dictionary.common.loading}
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-paper transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <LoaderOne />
    </div>
  );
}
