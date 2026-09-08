"use client";

import * as React from "react";
import {
  Bot,
  Briefcase,
  Code2,
  Container,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  ServerCog,
  Smartphone,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnnouncementBar } from "@/components/thegridcn/announcement-bar";
import { BentoGrid } from "@/components/thegridcn/bento-grid";
import { Chip } from "@/components/thegridcn/chip";
import { CTABanner } from "@/components/thegridcn/cta-banner";
import { DataCard } from "@/components/thegridcn/data-card";
import { Divider } from "@/components/thegridcn/divider";
import { FeatureCard } from "@/components/thegridcn/feature-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { Marquee } from "@/components/thegridcn/marquee";
import { StatusBar, UplinkBar } from "@/components/thegridcn/status-bar";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { useLanguage } from "./lib/i18n";

// ── Temporarily disabled sections. Re-enable: uncomment the imports and the two
//    <SkillsSection /> / <ProjectsSection /> lines inside <main>, then restore the
//    "skills" / "projects" entries in NAV_LINKS (and renumber nav/divider labels in i18n).
// import { SkillsSection } from "./sections/skills-section";
// import { ProjectsSection } from "./sections/projects-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/963958743823";
const EMAIL = "raghdkun@gmail.com";
const GITHUB_URL = "https://github.com/Raghdkun";
const INSTAGRAM_URL = "https://instagram.com/raghdkun";

// ───────────────────── Inline brand SVG icons ─────────────────────
function Github({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICON = { className: "size-4", strokeWidth: 1.5 } as const;

// Skills / Projects anchors intentionally omitted while those sections are disabled.
const NAV_LINKS = [
  { href: "#about", key: "about" as const },
  { href: "#contact", key: "contact" as const },
];

// Order matches t.about.capabilityTitles / capabilityDescs
const CAPABILITY_ICONS = [
  <Code2 key="c1" {...ICON} />,
  <ServerCog key="c2" {...ICON} />,
  <Workflow key="c3" {...ICON} />,
  <Bot key="c4" {...ICON} />,
  <Sparkles key="c5" {...ICON} />,
  <Smartphone key="c6" {...ICON} />,
  <Briefcase key="c7" {...ICON} />,
  <Network key="c8" {...ICON} />,
  <Container key="c9" {...ICON} />,
];

// ───────────────────── Decode/scramble helper for tech text reveal ─────────────────────
const SCRAMBLE_CHARS = "01010101<>[]";
const ARABIC = /[\u0600-\u06FF]/;

function splitIntoChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    // NBSP: a bare space inside its own span collapses and words run together ("OPERATORBRIEF").
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.dataset.final = ch === " " ? "\u00A0" : ch;
    frag.appendChild(span);
  }
  el.textContent = "";
  el.appendChild(frag);
  return Array.from(el.querySelectorAll<HTMLSpanElement>(".char"));
}

function decodeReveal(el: HTMLElement) {
  if (el.dataset.decoded === "1") return;
  el.dataset.decoded = "1";
  // Arabic letters must stay in one text run: per-glyph spans break contextual joining.
  if (ARABIC.test(el.textContent ?? "")) return;
  const chars = splitIntoChars(el);
  chars.forEach((c, i) => {
    const final = c.dataset.final ?? c.textContent ?? "";
    const cycles = i % 3 === 0 ? 2 : 1;
    let count = 0;
    const interval = window.setInterval(() => {
      if (count >= cycles) {
        c.textContent = final;
        window.clearInterval(interval);
        return;
      }
      c.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      count++;
    }, 26 + i * 4);
  });
}

/** Highlights the nav link for the section currently in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Home() {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close the mobile menu on Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  // ───────────── GSAP tech-reveal animations (re-runs on locale change) ─────────────
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const rtl = document.documentElement.dir === "rtl";
      const media = gsap.matchMedia();

      // ── Hero title: per-char signal sweep with subtle vertical settle (no fade).
      //    The title element is forced dir="ltr" so the split letters never reverse in RTL.
      const titleEl = rootRef.current?.querySelector<HTMLElement>("[data-hero-title]");
      if (titleEl && titleEl.dataset.split !== "1") {
        titleEl.dataset.split = "1";
        const text = titleEl.textContent ?? "";
        titleEl.innerHTML = text
          .split("")
          .map((c) => `<span class="hero-char inline-block" style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`)
          .join("");
      }
      if (titleEl) {
        gsap.fromTo(
          titleEl.querySelectorAll(".hero-char"),
          { y: 18, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.72,
            ease: "power2.out",
            stagger: 0.02,
            delay: 0.08,
          },
        );
      }

      // ── Hero items: gentle horizontal reveal, from the reading-start side
      gsap.fromTo(
        "[data-hero-fade]",
        { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", x: rtl ? 8 : -8 },
        {
          clipPath: "inset(0 0 0 0)",
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.35,
        },
      );

      // ── Hero subtitle: decode/scramble on first paint (skipped automatically for Arabic)
      const subtitleEl = rootRef.current?.querySelector<HTMLElement>("[data-hero-subtitle]");
      if (subtitleEl) {
        gsap.delayedCall(0.5, () => decodeReveal(subtitleEl));
      }

      // ── Section reveal via ScrollTrigger.batch. Elements already past the trigger on
      //    load keep their natural visible state; only true viewport entries animate.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { clipPath: "inset(0 0 100% 0)", y: 12 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 0.72,
              ease: "power2.out",
              stagger: 0.07,
              overwrite: "auto",
            },
          );
        },
      });

      // ── Decode-on-scroll for [data-decode] headings
      ScrollTrigger.batch("[data-decode]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => els.forEach((el) => decodeReveal(el as HTMLElement)),
      });

      // ── Divider scan-line draw
      gsap.utils.toArray<HTMLElement>("[data-scan]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)", duration: 1.1, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      // ── Stats: count-up. The DOM ships with the final value (so reduced-motion and
      //    no-JS visitors see real numbers); we only zero it here, when we know we animate.
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const end = Number(el.dataset.counter || "0");
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: end, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = String(Math.floor(obj.v)); },
        });
      });

      media.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>(".grid-bg").forEach((grid) => {
          gsap.to(grid, {
            backgroundPositionY: "+=140",
            ease: "none",
            scrollTrigger: {
              trigger: grid.parentElement ?? grid,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          });
        });
      });

      // Two-stage refresh: once now, once after layout settles + Lenis attaches
      ScrollTrigger.refresh();
      const delayedRefresh = gsap.delayedCall(0.3, () => ScrollTrigger.refresh());

      return () => {
        delayedRefresh.kill();
        media.revert();
      };
    },
    { scope: rootRef, dependencies: [locale] },
  );

  const localeToggle = (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.toggleAria}
      lang={locale === "en" ? "ar" : "en"}
      className="press inline-flex h-10 cursor-pointer items-center gap-1.5 rounded border border-primary/30 px-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:h-9"
    >
      <Languages className="size-3.5" strokeWidth={1.5} />
      {t.toggleLabel}
    </button>
  );

  return (
    <div className="relative" ref={rootRef}>
      <AnnouncementBar
        text={t.announcement.text}
        variant="highlight"
        icon={<Zap className="size-3" strokeWidth={1.5} />}
        dismissLabel={t.announcement.dismiss}
        action={{ label: t.announcement.action, href: WHATSAPP_URL }}
      />

      {/* ───────── NAVIGATION ───────── */}
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <div className="flex size-9 items-center justify-center rounded border border-primary/40 bg-primary/10 font-bold text-primary glow-border transition-all">
              RK
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span dir="ltr" className="text-[10px] uppercase tracking-[0.4em] text-foreground/60">
                IDENTITY // 00.RK
              </span>
              <span dir="ltr" className="text-xs font-semibold uppercase tracking-widest text-primary">
                RAGHDKUN
              </span>
            </div>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative py-1 text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-start after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                    isActive ? "text-primary after:scale-x-100" : "text-foreground/60",
                  )}
                >
                  {t.nav[link.key]}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {localeToggle}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-primary/40 text-primary lg:inline-flex"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-3.5" strokeWidth={1.5} /> {t.nav.whatsapp}
              </a>
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">{t.nav.cta}</a>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
              className="press flex size-10 cursor-pointer items-center justify-center rounded border border-primary/40 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden"
            >
              {menuOpen ? <X className="size-4" strokeWidth={1.5} /> : <Menu className="size-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="border-t border-primary/20 bg-background/95 md:hidden">
            <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                  className="flex min-h-11 items-center rounded border border-transparent px-3 text-xs uppercase tracking-[0.3em] text-foreground/75 hover:border-primary/30 hover:text-primary aria-[current]:text-primary"
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="lg" className="border-primary/40 text-primary">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                    <MessageCircle className="size-4" strokeWidth={1.5} /> {t.nav.whatsapp}
                  </a>
                </Button>
                <Button asChild size="lg">
                  <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.cta}</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* ───────── HERO ───────── */}
        <section id="hero" className="relative overflow-hidden">
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <HUDCornerFrame position="top-left" size={48} />
          <HUDCornerFrame position="top-right" size={48} />
          <HUDCornerFrame position="bottom-left" size={48} />
          <HUDCornerFrame position="bottom-right" size={48} />

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
            <UplinkHeader leftText={t.hero.uplinkLeft} rightText={t.hero.uplinkRight} />

            <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <div>
                <div data-hero-fade className="mb-5 flex flex-wrap items-center gap-2">
                  <Chip variant="success" selected>{t.hero.chipAvailable}</Chip>
                  <Chip selected>{t.hero.chipRole}</Chip>
                  <Chip variant="warning" selected>{t.hero.chipRemote}</Chip>
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    <MapPin className="size-3" strokeWidth={1.5} /> {t.hero.location}
                  </span>
                </div>

                <h1
                  className="font-display text-[2.75rem] font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl lg:text-8xl"
                  aria-label="Raghdkun — Fullstack developer"
                >
                  {/* Brand name is always Latin: isolate it from the page direction so the
                      per-letter animation spans don't flow right-to-left in Arabic. */}
                  <span data-hero-title dir="ltr" className="block [unicode-bidi:isolate] rtl:text-end">{t.hero.title}</span>
                  <span
                    key={`subtitle-${locale}`}
                    data-hero-subtitle
                    className="mt-2 block text-2xl text-primary sm:text-4xl lg:text-6xl"
                  >
                    {t.hero.subtitle}
                  </span>
                </h1>

                <p
                  data-hero-fade
                  className="mt-6 max-w-[60ch] text-sm leading-relaxed text-foreground/72 sm:text-base"
                >
                  {t.hero.bio}
                </p>

                <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" strokeWidth={1.5} /> {t.hero.ctaPrimary}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-primary/40 sm:w-auto">
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                      <Github className="size-4" /> {t.hero.ctaSecondary}
                    </a>
                  </Button>
                </div>
              </div>

              <div data-hero-fade>
                <DataCard
                  subtitle={t.hero.profileSubtitle}
                  title={t.hero.profileTitle}
                  status="active"
                  fields={[
                    { label: t.hero.fields.focus.label, value: t.hero.fields.focus.value, highlight: true },
                    { label: t.hero.fields.openTo.label, value: t.hero.fields.openTo.value },
                    { label: t.hero.fields.timezone.label, value: t.hero.fields.timezone.value },
                    { label: t.hero.fields.languages.label, value: t.hero.fields.languages.value },
                    { label: t.hero.fields.mode.label, value: t.hero.fields.mode.value },
                    { label: t.hero.fields.channel.label, value: t.hero.fields.channel.value, highlight: true },
                  ]}
                />
              </div>
            </div>

            <div className="mt-12">
              <UplinkBar
                channel={t.hero.streamChannel}
                status={t.hero.streamStatus}
                signal="strong"
              />
            </div>
          </div>
        </section>

        {/* ───────── MARQUEE ───────── */}
        <section aria-label="Tech marquee" className="border-y border-primary/20">
          <div className="flex flex-wrap gap-2 bg-card/40 px-4 py-3 sm:hidden">
            {t.marquee.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="rounded border border-primary/15 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60"
              >
                {item}
              </span>
            ))}
          </div>

          <Marquee variant="subtle" speed="slow" className="hidden bg-card/40 sm:block">
            {t.marquee.map((item, i) => (
              <span
                key={`${item}-${i}`}
                data-marquee-item
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 sm:text-xs sm:tracking-[0.4em]"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </section>

        {/* ───────── ABOUT ───────── */}
        <section id="about" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-scan>
              <Divider label={t.about.divider} variant="glow" />
            </div>

            <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
              <GlowContainer data-reveal intensity="md" hover className="bg-card/60 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 border-b border-primary/20 pb-3">
                  <span className="size-2 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    {t.about.logTime}
                  </span>
                </div>
                <h2
                  key={`about-${locale}`}
                  data-decode
                  className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-foreground"
                >
                  {t.about.title}
                </h2>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-foreground/72">{t.about.p1}</p>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-foreground/72">{t.about.p2}</p>
                <ul className="mt-5 space-y-2 text-xs text-foreground/72">
                  <li className="flex items-center gap-2">
                    <span className="text-primary rtl:-scale-x-100">▸</span> {t.about.bullet1}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary rtl:-scale-x-100">▸</span> {t.about.bullet2}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary rtl:-scale-x-100">▸</span> {t.about.bullet3}
                  </li>
                </ul>
              </GlowContainer>

              <div className="space-y-6">
                <div data-reveal>
                  <StatusBar
                    variant="info"
                    leftContent={<span>{t.about.sysLabel}</span>}
                    rightContent={
                      <>
                        <span className="text-primary">●</span>
                        <span>{t.about.sysStatus}</span>
                      </>
                    }
                  />
                </div>

                <dl data-reveal className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {t.about.stats.map((s) => (
                    <div
                      key={s.label}
                      className="relative overflow-hidden rounded border border-primary/20 bg-card/60 p-4"
                    >
                      <dd className="tabular font-display text-3xl font-bold text-primary">
                        <span data-counter={s.value}>{s.value}</span>{s.suffix}
                      </dd>
                      <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                        {s.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div data-reveal>
                  <BentoGrid
                    items={t.about.capabilityTitles.map((title, i, all) => ({
                      title,
                      description: t.about.capabilityDescs[i],
                      icon: CAPABILITY_ICONS[i],
                      variant: i === 1 ? ("highlight" as const) : undefined,
                      // Odd count: let the last card span the row so the grid closes cleanly.
                      span: all.length % 2 === 1 && i === all.length - 1 ? ("2x1" as const) : undefined,
                    }))}
                    columns={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <SkillsSection /> */}
        {/* <ProjectsSection /> */}

        {/* ───────── CONTACT ───────── */}
        <section id="contact" className="relative border-t border-primary/10 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div data-scan>
              <Divider label={t.contact.divider} variant="glow" />
            </div>

            <div data-reveal className="mt-10">
              <CTABanner
                title={t.contact.ctaTitle}
                description={t.contact.ctaDesc}
                variant="highlight"
                primaryAction={{ label: t.contact.ctaPrimary, href: WHATSAPP_URL }}
                secondaryAction={{ label: t.contact.ctaSecondary, href: `mailto:${EMAIL}` }}
              />
            </div>

            <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                href={WHATSAPP_URL}
                title={t.contact.cards.whatsapp.title}
                description={t.contact.cards.whatsapp.desc}
                icon={<MessageCircle {...ICON} />}
                variant="highlight"
              />
              <FeatureCard
                href={INSTAGRAM_URL}
                title={t.contact.cards.instagram.title}
                description={t.contact.cards.instagram.desc}
                icon={<Instagram className="size-4" />}
              />
              <FeatureCard
                href={`mailto:${EMAIL}`}
                title={t.contact.cards.email.title}
                description={t.contact.cards.email.desc}
                icon={<Mail {...ICON} />}
              />
              <FeatureCard
                href={GITHUB_URL}
                title={t.contact.cards.github.title}
                description={t.contact.cards.github.desc}
                icon={<Github className="size-4" />}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="relative border-t border-primary/20 bg-card/40">
        <UplinkHeader
          leftText={t.footer.end}
          rightText={`${t.footer.signal} · ${new Date().getFullYear()}`}
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div dir="ltr" className="font-display text-lg font-bold uppercase text-primary rtl:text-end">RAGHDKUN</div>
            <p className="mt-2 max-w-[40ch] text-xs leading-relaxed text-foreground/60">{t.footer.bio}</p>
            <div className="mt-4">{localeToggle}</div>
          </div>
          <nav aria-label="Footer">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.navigate}
            </div>
            <ul className="mt-2 text-xs text-foreground/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-10 items-center hover:text-primary">{t.nav[l.key]}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.channels}
            </div>
            <ul className="mt-2 text-xs text-foreground/70">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  WhatsApp — +963 958 743 823
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  Instagram — @raghdkun
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-10 items-center hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  GitHub — @Raghdkun
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.stack}
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-foreground/70">
              <li>Next.js 16 // React 19</li>
              <li>Tailwind v4 // shadcn/ui</li>
              <li>Laravel // PHP // Postgres</li>
              <li>Flutter // Dart</li>
              <li>n8n // Dify // Python // Node</li>
              <li>DevOps // CI/CD // IT Solutions</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary/10 px-4 py-4 text-center text-[10px] uppercase tracking-[0.3em] text-foreground/40 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} RAGHDKUN — {t.footer.copyright}
        </div>
      </footer>
    </div>
  );
}
