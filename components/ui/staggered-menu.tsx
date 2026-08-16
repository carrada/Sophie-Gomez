"use client";

import Link from "next/link";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import "./staggered-menu.css";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
  active?: boolean;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

type StaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  logoContent?: ReactNode;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  hideHeader?: boolean;
  simpleToggleLabel?: boolean;
  hideToggleLabel?: boolean;
  toggleClassName?: string;
  menuText?: string;
  closeText?: string;
  socialsTitle?: string;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onItemClick?: () => void;
};

export type StaggeredMenuHandle = {
  close: () => void;
};

function isExternalLink(link: string) {
  return link.startsWith("http://") || link.startsWith("https://") || link.startsWith("mailto:");
}

export const StaggeredMenu = forwardRef<StaggeredMenuHandle, StaggeredMenuProps>(
  function StaggeredMenu(
    {
      position = "right",
      colors = ["#404040", "#262626", "#171717"],
      items = [],
      socialItems = [],
      displaySocials = true,
      displayItemNumbering = true,
      className,
      logoUrl,
      logoContent,
      menuButtonColor = "#fafafa",
      openMenuButtonColor = "#fafafa",
      accentColor = "#fafafa",
      changeMenuColorOnOpen = true,
      isFixed = false,
      hideHeader = false,
      simpleToggleLabel = false,
      hideToggleLabel = false,
      toggleClassName,
      menuText = "Menu",
      closeText = "Close",
      socialsTitle = "Socials",
      closeOnClickAway = true,
      onMenuOpen,
      onMenuClose,
      onOpenChange,
      onItemClick,
    },
    ref,
  ) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineMidRef = useRef<HTMLSpanElement>(null);
  const lineBotRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState([menuText, closeText]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const iconTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTextLines([menuText, closeText]);
  }, [menuText, closeText]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const lineTop = lineTopRef.current;
      const lineMid = lineMidRef.current;
      const lineBot = lineBotRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !lineTop || !lineMid || !lineBot || !icon) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"),
        );
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      gsap.set([lineTop, lineMid, lineBot], {
        transformOrigin: "50% 50%",
        rotate: 0,
        opacity: 1,
        scaleX: 1,
      });
      gsap.set(lineTop, { y: -6 });
      gsap.set(lineMid, { y: 0 });
      gsap.set(lineBot, { y: 6 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      if (textInner) {
        gsap.set(textInner, { yPercent: 0 });
      }
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position, mounted, hideHeader]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
    );
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>(
        ".sm-panel-list[data-numbering] .sm-panel-item",
      ),
    );
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
    );

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { xPercent: -110, rotate: 0 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { "--sm-num-opacity": 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          xPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
        );
        if (itemEls.length) {
          gsap.set(itemEls, { xPercent: -110, rotate: 0 });
        }
        const numberEls = Array.from(
          panel.querySelectorAll<HTMLElement>(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        );
        if (numberEls.length) {
          gsap.set(numberEls, { "--sm-num-opacity": 0 });
        }
        const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const lineTop = lineTopRef.current;
    const lineMid = lineMidRef.current;
    const lineBot = lineBotRef.current;
    if (!lineTop || !lineMid || !lineBot) return;

    iconTweenRef.current?.kill();
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    iconTweenRef.current = tl;

    if (opening) {
      tl.to(
        lineTop,
        { y: 0, rotate: 45, duration: 0.45, ease: "power3.out" },
        0,
      )
        .to(
          lineBot,
          { y: 0, rotate: -45, duration: 0.45, ease: "power3.out" },
          0,
        )
        .to(
          lineMid,
          { opacity: 0, scaleX: 0.4, duration: 0.22, ease: "power2.in" },
          0,
        );
    } else {
      tl.to(
        lineTop,
        { y: -6, rotate: 0, duration: 0.35, ease: "power3.inOut" },
        0,
      )
        .to(
          lineBot,
          { y: 6, rotate: 0, duration: 0.35, ease: "power3.inOut" },
          0,
        )
        .to(
          lineMid,
          { opacity: 1, scaleX: 1, duration: 0.28, ease: "power2.out" },
          0.08,
        );
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    if (!toggleBtnRef.current) return;
    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    } else {
      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback(
    (opening: boolean) => {
      if (simpleToggleLabel) {
        setTextLines([opening ? closeText : menuText]);
        return;
      }

      const inner = textInnerRef.current;
      if (!inner) return;
      textCycleAnimRef.current?.kill();

      const currentLabel = opening ? menuText : closeText;
      const targetLabel = opening ? closeText : menuText;
      const cycles = 3;
      const seq = [currentLabel];
      let last = currentLabel;
      for (let i = 0; i < cycles; i++) {
        last = last === menuText ? closeText : menuText;
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);
      setTextLines(seq);

      gsap.set(inner, { yPercent: 0 });
      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: "power4.out",
      });
    },
    [menuText, closeText, simpleToggleLabel],
  );

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onOpenChange?.(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuClose,
    onOpenChange,
  ]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    onOpenChange?.(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
    onOpenChange,
  ]);

  useImperativeHandle(ref, () => ({ close: closeMenu }), [closeMenu]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  const wrapperClass = [
    "staggered-menu-wrapper",
    isFixed && !hideHeader ? "fixed-wrapper" : "",
    hideHeader ? "inline-wrapper" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const prelayerColors = (() => {
    const raw = colors?.length ? colors.slice(0, 4) : ["#262626", "#171717"];
    const arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  const renderMenuItem = (item: StaggeredMenuItem, idx: number) => {
    const className = "sm-panel-item";
    const content = (
      <span className="sm-panel-itemLabel">{item.label}</span>
    );
    const sharedProps = {
      className,
      "aria-label": item.ariaLabel,
      "data-index": idx + 1,
      "data-active": item.active ? "true" : undefined,
      onClick: onItemClick,
    };

    if (isExternalLink(item.link)) {
      return (
        <a
          {...sharedProps}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...sharedProps} href={item.link}>
        {content}
      </Link>
    );
  };

  const toggleButton = (
    <button
      ref={toggleBtnRef}
      className={`sm-toggle${toggleClassName ? ` ${toggleClassName}` : ""}`}
      aria-label={open ? closeText : menuText}
      aria-expanded={open}
      aria-controls="staggered-menu-panel"
      onClick={toggleMenu}
      type="button"
    >
      {hideToggleLabel ? null : simpleToggleLabel ? (
        <span className="sm-toggle-label">{open ? closeText : menuText}</span>
      ) : (
        <span className="sm-toggle-textWrap" aria-hidden="true">
          <span ref={textInnerRef} className="sm-toggle-textInner">
            {textLines.map((line, i) => (
              <span className="sm-toggle-line" key={`${line}-${i}`}>
                {line}
              </span>
            ))}
          </span>
        </span>
      )}
      <span ref={iconRef} className="sm-icon" aria-hidden="true">
        <span ref={lineTopRef} className="sm-icon-line sm-icon-line--top" />
        <span ref={lineMidRef} className="sm-icon-line sm-icon-line--mid" />
        <span ref={lineBotRef} className="sm-icon-line sm-icon-line--bot" />
      </span>
    </button>
  );

  const overlayContent = (
    <>
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {prelayerColors.map((color, i) => (
          <div key={i} className="sm-prelayer" style={{ background: color }} />
        ))}
      </div>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((item, idx) => (
                <li className="sm-panel-itemWrap" key={`${item.link}-${idx}`}>
                  {renderMenuItem(item, idx)}
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">{socialsTitle}</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((item, i) => (
                  <li key={`${item.link}-${i}`} className="sm-socials-item">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );

  return (
    <div
      className={wrapperClass}
      style={
        accentColor
          ? ({ ["--sm-accent" as string]: accentColor } as React.CSSProperties)
          : undefined
      }
      data-position={position}
      data-open={open || undefined}
    >
      {!hideHeader && (
        <header className="staggered-menu-header" aria-label="Main navigation header">
          <div className="sm-logo" aria-label="Logo">
            {logoContent ??
              (logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="sm-logo-img"
                  draggable={false}
                  width={110}
                  height={24}
                />
              ) : null)}
          </div>
          {toggleButton}
        </header>
      )}

      {hideHeader && toggleButton}

      {hideHeader && mounted
        ? createPortal(
            <div data-position={position} data-open={open || undefined}>
              {overlayContent}
            </div>,
            document.body,
          )
        : overlayContent}
    </div>
  );
  },
);

export default StaggeredMenu;
