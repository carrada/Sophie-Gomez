"use client";

import { SmoothScrollHero } from "@/components/hero/smooth-scroll-hero";
import { PageShell } from "@/components/layout/site-nav";

export default function HomePage() {
  return (
    <PageShell>
      <main id="main">
        <SmoothScrollHero />
      </main>
    </PageShell>
  );
}
