"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import landingData from "@/content/landing.json";
import { useLanguage } from "@/components/i18n/language-provider";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "@/lib/motion";
import { getLocalizedValue } from "@/lib/i18n";
import {
  bodyText,
  brandSubtitle,
  contentContainer,
  displayTitle,
  pagePadding,
  pageTitle,
  sectionBottomPadding,
} from "@/lib/constants";

const SECTION_HEIGHT = 1500;

type ParallaxItem = (typeof landingData.parallax)[number];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function HeroBrandOverlay() {
  const { scrollY } = useScroll();
  const { dictionary } = useLanguage();
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);
  const y = useTransform(scrollY, [0, 550], [0, 40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-brand-paper via-brand-paper/90 to-transparent"
      />
      <div className={`relative ${pagePadding} pb-10 pt-24 md:pb-14`}>
        <div className={`${contentContainer} mx-auto w-full`}>
          <h1 className={`${displayTitle} text-brand-ink`}>
            Sophie Gaëlle Gomez
          </h1>
          <p className={`mt-3 ${brandSubtitle} md:mt-4`}>
            {dictionary.landing.keywords}
          </p>
          <p className={`mt-3 max-w-xl ${bodyText} md:mt-4`}>
            {dictionary.landing.heroLine}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CenterImage({ centerSrc }: { centerSrc: string }) {
  const { scrollY } = useScroll();
  const { dictionary } = useLanguage();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"],
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${centerSrc})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      role="img"
      aria-label={dictionary.landing.photoPlaceholder}
    />
  );
}

function ParallaxImg({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
}

function ParallaxImages({ items }: { items: ParallaxItem[] }) {
  const { locale } = useLanguage();

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-[200px]">
      {items.map((item) => (
        <ParallaxImg
          key={item.src}
          src={item.src}
          alt={getLocalizedValue(item.alt, locale)}
          start={item.start}
          end={item.end}
          className={item.className}
        />
      ))}
    </div>
  );
}

function PathItem({
  title,
  detail,
  href,
  label,
}: {
  title: string;
  detail: string;
  href: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      viewport={{ once: true, amount: 0.35 }}
      className="mb-9 border-b border-brand-line px-1 pb-9 last:mb-0"
    >
      <Link
        href={href}
        className="group flex items-center justify-between gap-4 transition-opacity hover:opacity-80"
      >
        <div>
          <p className="mb-1.5 font-display text-2xl text-brand-ink md:text-3xl">
            {title}
          </p>
          <p className="font-sans text-sm font-medium uppercase tracking-brand text-brand-mute">
            {detail}
          </p>
        </div>
        <span className="shrink-0 text-end font-sans text-xs font-medium uppercase tracking-brand text-brand-soft transition-colors group-hover:text-brand-ink md:text-sm">
          {label} →
        </span>
      </Link>
    </motion.div>
  );
}

function IntroSection() {
  const { dictionary } = useLanguage();

  return (
    <section
      id="intro"
      className={`${contentContainer} ${pagePadding} ${sectionBottomPadding} relative z-10 bg-brand-paper pt-24 text-brand-ink md:pt-36`}
    >
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        viewport={{ once: true, amount: 0.4 }}
        className={`mb-8 ${pageTitle} md:mb-10`}
      >
        {dictionary.landing.introTitle}
      </motion.h2>

      <motion.p
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        viewport={{ once: true, amount: 0.4 }}
        className={`mb-16 max-w-2xl ${bodyText} md:mb-20`}
      >
        {dictionary.landing.bio}
      </motion.p>

      <PathItem
        title={dictionary.menu.actrice}
        detail={dictionary.landing.pathActrice}
        href="/actrice"
        label={dictionary.landing.ctaActrice}
      />
      <PathItem
        title={dictionary.menu.modelo}
        detail={dictionary.landing.pathModelo}
        href="/modelo"
        label={dictionary.landing.ctaModelo}
      />
      <PathItem
        title={dictionary.menu.silverPresence}
        detail={dictionary.landing.pathSilver}
        href="/silver-presence"
        label={dictionary.landing.silverPresenceLink}
      />
      <PathItem
        title={dictionary.menu.contacto}
        detail={dictionary.landing.pathContact}
        href="/contacto"
        label={dictionary.landing.pathLabel}
      />
    </section>
  );
}

function StaticHero({ centerSrc }: { centerSrc: string }) {
  const { dictionary } = useLanguage();

  return (
    <section className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-brand-paper">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${centerSrc})` }}
        role="img"
        aria-label={dictionary.landing.photoPlaceholder}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-paper via-brand-paper/55 to-brand-paper/15"
      />
      <div
        className={`relative z-10 flex h-full flex-col justify-end ${pagePadding} pb-10 pt-[calc(var(--nav-height)+1rem)] md:pb-14`}
      >
        <div className={`${contentContainer} mx-auto w-full`}>
          <h1 className={`${displayTitle} text-brand-ink`}>
            Sophie Gaëlle Gomez
          </h1>
          <p className={`mt-3 ${brandSubtitle} md:mt-4`}>
            {dictionary.landing.keywords}
          </p>
          <p className={`mt-3 max-w-xl ${bodyText} md:mt-4`}>
            {dictionary.landing.heroLine}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroScroll() {
  const centerSrc =
    landingData.heroCenterSrc?.trim() ||
    landingData.portraitSrc?.trim() ||
    "";

  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-brand-paper"
    >
      {/* Sticky viewport: image is clipped; brand text sits outside clipPath */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-paper">
        <CenterImage centerSrc={centerSrc} />
        <HeroBrandOverlay />
      </div>

      <ParallaxImages items={landingData.parallax} />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-10 h-96 bg-gradient-to-b from-transparent to-brand-paper"
      />
    </div>
  );
}

export function SmoothScrollHero() {
  const reducedMotion = usePrefersReducedMotion();
  const centerSrc =
    landingData.heroCenterSrc?.trim() ||
    landingData.portraitSrc?.trim() ||
    "";

  if (reducedMotion) {
    return (
      <div className="bg-brand-paper">
        <StaticHero centerSrc={centerSrc} />
        <IntroSection />
      </div>
    );
  }

  return (
    <div className="bg-brand-paper">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <HeroScroll />
        <IntroSection />
      </ReactLenis>
    </div>
  );
}
