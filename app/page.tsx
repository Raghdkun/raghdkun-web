"use client";

import * as React from "react";
import Image from "next/image";
import {
  Activity,
  Bot,
  Code2,
  Cpu,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Rocket,
  Send,
  ServerCog,
  Smartphone,
  Sparkles,
  Terminal,
  Truck,
  Workflow,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnnouncementBar } from "@/components/thegridcn/announcement-bar";
import { BentoGrid } from "@/components/thegridcn/bento-grid";
import { Chip } from "@/components/thegridcn/chip";
import { CTABanner } from "@/components/thegridcn/cta-banner";
import { DataCard } from "@/components/thegridcn/data-card";
import { Divider } from "@/components/thegridcn/divider";
import { EnergyMeter } from "@/components/thegridcn/energy-meter";
import { FeatureCard } from "@/components/thegridcn/feature-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { Marquee } from "@/components/thegridcn/marquee";
import { ProgressBar } from "@/components/thegridcn/progress-bar";
import { StatusBar, UplinkBar } from "@/components/thegridcn/status-bar";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { useLanguage, type Locale } from "./lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ───────────────────── Project data (with per-locale copy) ─────────────────────
type ProjectStatic = {
  slug: string;
  title: string;
  url?: string;
  image: string;
  imageType?: "raster" | "svg";
  variant?: "highlight";
  icon: React.ReactNode;
  stack: string[];
};

const PROJECTS_STATIC: ProjectStatic[] = [
  { slug: "trucking360", title: "Trucking360", url: "https://trucking360solutions.com/", image: "/images/projects/trucking360.jpg", icon: <Truck className="size-4" />, variant: "highlight", stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { slug: "gosimple", title: "GoSimple", url: "https://gosimple.io/", image: "/images/projects/gosimple.jpg", icon: <Sparkles className="size-4" />, variant: "highlight", stack: ["Next.js", "TypeScript", "Tailwind", "Design System"] },
  { slug: "cleave", title: "Cleave", url: "https://cleave.raghdkun.tech/", image: "/images/projects/cleave.jpg", icon: <Zap className="size-4" />, stack: ["Next.js", "TypeScript", "Node", "Crawler"] },
  { slug: "b-dashboard", title: "B-Dashboard", url: "https://b-dashboard-five.vercel.app/", image: "/images/projects/b-dashboard.jpg", icon: <Cpu className="size-4" />, stack: ["Next.js 16", "shadcn/ui", "Zustand", "next-intl"] },
  { slug: "modern-web-os", title: "Modern Web OS", url: "https://github.com/Raghdkun/modern-web-os", image: "/images/projects/modern-web-os.svg", imageType: "svg", icon: <MonitorSmartphone className="size-4" />, stack: ["React", "TypeScript", "Vite", "Window Manager"] },
  { slug: "wavlet", title: "Wavlet", image: "/images/projects/wavlet.svg", imageType: "svg", icon: <Smartphone className="size-4" />, stack: ["Flutter", "Dart", "Charts", "Local Storage"] },
  { slug: "millennium", title: "Millennium Toolkit", image: "/images/projects/millennium.svg", imageType: "svg", icon: <Activity className="size-4" />, stack: ["Flutter", "Dart", "Laravel", "REST API"] },
  { slug: "zahratalhayat", title: "Zahrat Al Hayat", url: "https://zahratalhayat.online/", image: "/images/projects/zahratalhayat.jpg", icon: <Layers className="size-4" />, stack: ["Next.js", "Tailwind", "i18n"] },
];

const PROJECT_COPY: Record<Locale, Record<string, { tagline: string; role: string; description: string }>> = {
  en: {
    trucking360: {
      tagline: "AMAZON FREIGHT PARTNER OS",
      role: "Frontend Engineer",
      description: "Partner platform for Amazon Freight Partners chasing Fantastic+ — fully automated dashboard with daily scorecards, real-time analytics, role-based access, top/bottom performer highlights and one-click reports. Built the marketing site and customer surfaces.",
    },
    gosimple: {
      tagline: "DIGITAL SOLUTIONS STUDIO",
      role: "Frontend Developer · Team",
      description: "Think big. Make it simple. Studio site for a team building websites, custom software, data analytics and smart automations for ambitious founders. Frontend developer on the product team across the marketing site and case-study work.",
    },
    cleave: {
      tagline: "WEBSITE EXPORTER",
      role: "Solo Build",
      description: "Export any website — Webflow, Framer, Wix or anything else — to clean, self-contained HTML. Configurable crawl depth, page limits and concurrency; strips analytics and builder artifacts and localizes every asset.",
    },
    "b-dashboard": {
      tagline: "ENTERPRISE SHELL",
      role: "Lead Frontend",
      description: "Custom shadcn/ui dashboard with i18n (EN/AR + RTL), drag-and-drop personalization, JSON-driven theme system and a built-in dev-tools layer for power users.",
    },
    "modern-web-os": {
      tagline: "DESKTOP-STYLE WEB SHELL",
      role: "Solo Build · Open Source",
      description: "A desktop-OS experience in the browser — window manager with draggable, resizable, snappable apps; launcher, dock and a small suite of built-in apps (terminal, finder, browser, notes). Open source.",
    },
    wavlet: {
      tagline: "PERSONAL FINANCE APP",
      role: "Solo Build · Mobile",
      description: "Mobile finance companion — feel your finances flow. Track income, expenses and analytics with multi-currency support and offline-first storage.",
    },
    millennium: {
      tagline: "YU-GI-OH! COMPANION",
      role: "Solo Build · Mobile + API",
      description: "Cross-platform Flutter companion app with a Laravel backend — card lookup, deck tools, banlist tracking and player utilities. End-to-end ownership: API, mobile and design.",
    },
    zahratalhayat: {
      tagline: "BRAND WEBSITE",
      role: "Solo Build",
      description: "Production website for Zahrat Al Hayat — content-driven pages with a polished motion layer and Arabic-friendly typography.",
    },
  },
  ar: {
    trucking360: {
      tagline: "نظام شركاء الشحن لأمازون",
      role: "مهندس واجهات",
      description: "منصّة شركاء Amazon Freight الساعين لمستوى Fantastic+ — لوحة قيادة مؤتمتة بالكامل مع تقييمات يومية، تحليلات لحظية، صلاحيات بالأدوار، إبراز الأفضل والأضعف، وتقارير بضغطة واحدة. بنيت الموقع التسويقي وواجهات العملاء.",
    },
    gosimple: {
      tagline: "استوديو حلول رقمية",
      role: "مطوّر واجهات · فريق",
      description: "فكّر كبيراً. واجعله بسيطاً. موقع استوديو لفريق يبني مواقع وبرمجيات مخصّصة وتحليل بيانات وأتمتة ذكية لروّاد الأعمال. مطوّر واجهات في فريق المنتج على الموقع التسويقي ودراسات الحالة.",
    },
    cleave: {
      tagline: "مُصدِّر مواقع",
      role: "بناء فردي",
      description: "صدّر أي موقع — Webflow أو Framer أو Wix أو أي منصّة — إلى HTML نظيف ومستقل. تحكّم بعمق الزحف وعدد الصفحات والتزامن؛ يحذف التحليلات وآثار البنّائين ويحلّي كل الأصول محلياً.",
    },
    "b-dashboard": {
      tagline: "هيكل مؤسسي",
      role: "قائد واجهات",
      description: "لوحة تحكم مخصّصة بـ shadcn/ui مع i18n (إنجليزي/عربي + RTL)، تخصيص بالسحب والإفلات، نظام ثيمات مبنيّ على JSON، وطبقة أدوات مطوّر داخلية للمستخدمين المتقدمين.",
    },
    "modern-web-os": {
      tagline: "هيكل ويب بنمط سطح المكتب",
      role: "بناء فردي · مفتوح المصدر",
      description: "تجربة نظام تشغيل سطح مكتب داخل المتصفح — مدير نوافذ بتطبيقات قابلة للسحب والتغيير والالتقاط؛ مُشغِّل، شريط دوك، وحزمة تطبيقات مدمجة (طرفية، مكتشف، متصفّح، ملاحظات). مفتوح المصدر.",
    },
    wavlet: {
      tagline: "تطبيق مالية شخصية",
      role: "بناء فردي · موبايل",
      description: "رفيق مالي للموبايل — اشعر بتدفّق ماليّتك. تتبّع الدخل والمصاريف والتحليلات مع دعم متعدّد العملات وتخزين يعمل دون اتصال.",
    },
    millennium: {
      tagline: "رفيق Yu-Gi-Oh!",
      role: "بناء فردي · موبايل + API",
      description: "تطبيق Flutter متعدّد المنصّات مع خادم Laravel — بحث عن البطاقات، أدوات بناء الديك، متابعة قائمة الحظر، وأدوات للاعبين. ملكية كاملة: واجهة، خادم، وتصميم.",
    },
    zahratalhayat: {
      tagline: "موقع علامة تجارية",
      role: "بناء فردي",
      description: "موقع إنتاجي لـ Zahrat Al Hayat — صفحات مبنيّة على المحتوى مع طبقة حركة أنيقة وطباعة ملائمة للعربية.",
    },
  },
};

const NAV_LINKS = [
  { href: "#about", key: "about" as const },
  { href: "#skills", key: "skills" as const },
  { href: "#projects", key: "projects" as const },
  { href: "#contact", key: "contact" as const },
];

const SKILL_VALUES = [94, 92, 90, 86, 84, 80, 82, 86];
const ENERGY_VALUES = [96, 86, 84, 78];

const CHIP_TAGS = [
  "PHP", "Postgres", "MySQL", "REST",
  "n8n", "Dify", "OpenAI", "Stripe",
  "Vercel", "Cloudflare", "Figma", "GSAP",
  "Framer Motion", "i18n", "RTL",
];

const CAPABILITY_ICONS = [
  <Code2 key="c1" className="size-4" />,
  <ServerCog key="c2" className="size-4" />,
  <Workflow key="c3" className="size-4" />,
  <Bot key="c4" className="size-4" />,
  <Sparkles key="c5" className="size-4" />,
  <Rocket key="c6" className="size-4" />,
];

// ───────────────────── Decode/scramble helper for tech text reveal ─────────────────────
const SCRAMBLE_CHARS = "01010101<>[]";

function splitIntoChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.dataset.final = ch;
    frag.appendChild(span);
  }
  el.textContent = "";
  el.appendChild(frag);
  return Array.from(el.querySelectorAll<HTMLSpanElement>(".char"));
}

function decodeReveal(el: HTMLElement) {
  if (el.dataset.decoded === "1") return;
  el.dataset.decoded = "1";
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

export default function Home() {
  const { locale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const projects = React.useMemo(
    () => PROJECTS_STATIC.map((p) => ({ ...p, copy: PROJECT_COPY[locale][p.slug] })),
    [locale],
  );

  // ───────────── GSAP tech-reveal animations (re-runs on locale change) ─────────────
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // ── Hero title: per-char signal sweep with subtle vertical settle (no fade)
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

      // ── Hero items: gentle horizontal reveal (no opacity transitions)
      gsap.fromTo(
        "[data-hero-fade]",
        { clipPath: "inset(0 100% 0 0)", x: -8 },
        {
          clipPath: "inset(0 0% 0 0)",
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.35,
        },
      );

      // ── Hero subtitle: decode/scramble on first paint
      const subtitleEl = rootRef.current?.querySelector<HTMLElement>("[data-hero-subtitle]");
      if (subtitleEl) {
        gsap.delayedCall(0.5, () => decodeReveal(subtitleEl));
      }

      // ── Section reveal via ScrollTrigger.batch (FIX for stuck-invisible bug:
      //    if element is already past the trigger on initial load, batch never sets
      //    its initial state — content stays naturally visible. Animation only fires
      //    for elements that genuinely enter the viewport after mount.)
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
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

      // ── Card reveal: calm rise + edge wipe (no fade, no heavy 3D flip)
      ScrollTrigger.batch("[data-card-reveal]", {
        start: "top 90%",
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { y: 14, clipPath: "inset(0 100% 0 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0 0)",
              duration: 0.75,
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
        onEnter: (els) => els.forEach((el) => decodeReveal(el as HTMLElement)),
      });

      // ── Divider scan-line draw
      gsap.utils.toArray<HTMLElement>("[data-scan]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      // ── Skill bars: animate inner fill width
      gsap.utils.toArray<HTMLElement>("#skills [role='progressbar']").forEach((bar) => {
        const fill = bar.querySelector<HTMLElement>("div");
        if (!fill) return;
        const target = fill.style.width || "0%";
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: target, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 92%", once: true },
          },
        );
      });

      // ── Stats: count-up
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const end = Number(el.dataset.counter || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = String(Math.floor(obj.v)); },
        });
      });

      // ── Marquee items: hue shimmer pulse
      gsap.utils.toArray<HTMLElement>("[data-marquee-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { color: "rgba(148,163,184,0.6)" },
          {
            color: "var(--primary)", duration: 0.6, repeat: -1, yoyo: true,
            delay: i * 0.12, ease: "sine.inOut",
          },
        );
      });

      // ── Project cards: 3D parallax tilt on hover
      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 6, rotateX: -y * 6, transformPerspective: 800,
            duration: 0.4, ease: "power2.out",
          });
        };
        const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      // ── Parallax: HUD grid backgrounds drift on scroll
      gsap.utils.toArray<HTMLElement>(".grid-bg").forEach((g) => {
        gsap.to(g, {
          backgroundPositionY: "+=180", ease: "none",
          scrollTrigger: {
            trigger: g.parentElement ?? g,
            start: "top bottom", end: "bottom top", scrub: true,
          },
        });
      });

      // Two-stage refresh: once now, once after layout settles + Lenis attaches
      ScrollTrigger.refresh();
      gsap.delayedCall(0.3, () => ScrollTrigger.refresh());
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <div id="main-content" className="relative" ref={rootRef}>
      <AnnouncementBar
        text={t.announcement.text}
        variant="highlight"
        icon={<Zap className="size-3" />}
        action={{
          label: t.announcement.action,
          onClick: () => window.open("https://wa.me/963958743823", "_blank"),
        }}
      />

      {/* ───────── NAVIGATION ───────── */}
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded border border-primary/40 bg-primary/10 font-bold text-primary glow-border transition-all">
              RK
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/60">
                IDENTITY // 00.RK
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                RAGHDKUN
              </span>
            </div>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:text-primary"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-primary/40 text-primary md:inline-flex"
            >
              <a href="https://wa.me/963958743823" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-3.5" /> {t.nav.whatsapp}
              </a>
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">{t.nav.cta}</a>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex size-9 items-center justify-center rounded border border-primary/40 text-primary md:hidden"
            >
              <span className="font-mono text-xs">{menuOpen ? "X" : "≡"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-primary/20 bg-background/95 md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded border border-transparent px-3 py-2 text-xs uppercase tracking-[0.3em] text-foreground/70 hover:border-primary/30 hover:text-primary"
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2">
                <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.cta}</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* ───────── HERO ───────── */}
      <section id="hero" className="relative overflow-hidden">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <HUDCornerFrame position="top-left" size={48} />
        <HUDCornerFrame position="top-right" size={48} />
        <HUDCornerFrame position="bottom-left" size={48} />
        <HUDCornerFrame position="bottom-right" size={48} />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <UplinkHeader leftText={t.hero.uplinkLeft} rightText={t.hero.uplinkRight} />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div data-hero-fade className="mb-4 flex flex-wrap items-center gap-2">
                <Chip variant="success">{t.hero.chipAvailable}</Chip>
                <Chip>{t.hero.chipRole}</Chip>
                <Chip variant="warning">{t.hero.chipRemote}</Chip>
                <span className="inline-flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  <MapPin className="size-3" /> {t.hero.location}
                </span>
              </div>

              <h1
                className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
                aria-label="Raghdkun — Fullstack engineer"
              >
                <span data-hero-title className="block">{t.hero.title}</span>
                <span
                  data-hero-subtitle
                  className="mt-2 block text-primary text-3xl sm:text-5xl lg:text-6xl"
                >
                  {t.hero.subtitle}
                </span>
              </h1>

              <p
                data-hero-fade
                className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base"
              >
                {t.hero.bio}
              </p>

              <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href="https://wa.me/963958743823" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" /> {t.hero.ctaPrimary}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/40">
                  <a href="#projects">
                    <Send className="size-4" /> {t.hero.ctaSecondary}
                  </a>
                </Button>
                <Badge variant="outline" className="border-primary/40 text-primary">
                  {t.hero.versionBadge}
                </Badge>
              </div>
            </div>

            <div data-hero-fade>
              <DataCard
                subtitle={t.hero.profileSubtitle}
                title={t.hero.profileTitle}
                status="active"
                fields={[
                  { label: t.hero.fields.role.label, value: t.hero.fields.role.value, highlight: true },
                  { label: t.hero.fields.stack.label, value: t.hero.fields.stack.value },
                  { label: t.hero.fields.extra.label, value: t.hero.fields.extra.value },
                  { label: t.hero.fields.base.label, value: t.hero.fields.base.value },
                  { label: t.hero.fields.channel.label, value: t.hero.fields.channel.value, highlight: true },
                  { label: t.hero.fields.status.label, value: t.hero.fields.status.value },
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
        <Marquee variant="subtle" speed="slow" className="bg-card/40">
          {t.marquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              data-marquee-item
              className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/60"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section id="about" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-scan>
            <Divider label={t.about.divider} variant="glow" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <GlowContainer data-reveal intensity="md" hover className="bg-card/60">
              <div className="flex items-center gap-2 border-b border-primary/20 pb-3">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                  {t.about.logTime}
                </span>
              </div>
              <h2
                data-decode
                className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-foreground"
              >
                {t.about.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t.about.p1}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t.about.p2}</p>
              <ul className="mt-5 space-y-2 text-xs text-foreground/70">
                <li className="flex items-center gap-2">
                  <span className="text-primary">▸</span> {t.about.bullet1}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">▸</span> {t.about.bullet2}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">▸</span> {t.about.bullet3}
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

              <div data-reveal className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {t.about.stats.map((s) => (
                  <div
                    key={s.label}
                    className="relative overflow-hidden rounded border border-primary/20 bg-card/60 p-4"
                  >
                    <div className="font-display text-3xl font-bold text-primary">
                      <span data-counter={s.value}>0</span>{s.suffix}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div data-reveal>
                <BentoGrid
                  items={t.about.capabilityTitles.map((title, i) => ({
                    title,
                    description: t.about.capabilityDescs[i],
                    icon: CAPABILITY_ICONS[i],
                    variant: i === 1 ? ("highlight" as const) : undefined,
                  }))}
                  columns={2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SKILLS ───────── */}
      <section id="skills" className="relative border-t border-primary/10 py-20 sm:py-28">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-scan>
            <Divider label={t.skills.divider} variant="circuit" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <GlowContainer data-reveal intensity="sm" hover className="bg-card/60">
              <h2
                data-decode
                className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
              >
                {t.skills.title}
              </h2>
              <p className="mt-2 text-sm text-foreground/60">{t.skills.intro}</p>
              <div className="mt-6 space-y-5">
                {t.skills.skillLabels.map((label, i) => (
                  <ProgressBar key={label} label={label} value={SKILL_VALUES[i]} />
                ))}
              </div>
            </GlowContainer>

            <div className="space-y-6">
              <div data-reveal>
                <StatusBar
                  leftContent={<span>{t.about.powerLabel}</span>}
                  rightContent={<span className="text-primary">{t.about.powerStatus}</span>}
                />
              </div>
              {t.skills.energyLabels.map((label, i) => (
                <div key={label} data-reveal>
                  <EnergyMeter label={label} value={ENERGY_VALUES[i]} />
                </div>
              ))}
              <div data-reveal className="flex flex-wrap gap-2 pt-2">
                {CHIP_TAGS.map((tag) => (
                  <Chip key={tag}>{tag.toUpperCase()}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROJECTS ───────── */}
      <section id="projects" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-scan>
            <Divider label={t.projects.divider} variant="glow" />
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <h2
              data-decode
              className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl"
            >
              {t.projects.title} <span className="text-primary">{t.projects.titleAccent}</span>
            </h2>
            <p className="max-w-md text-xs text-foreground/60">{t.projects.intro}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                featured={i === 0}
                liveLabel={t.projects.live}
                visitLabel={t.projects.visit}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CONTACT ───────── */}
      <section id="contact" className="relative border-t border-primary/10 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div data-scan>
            <Divider label={t.contact.divider} variant="glow" />
          </div>

          <div data-reveal className="mt-10">
            <CTABanner
              title={t.contact.ctaTitle}
              description={t.contact.ctaDesc}
              variant="highlight"
              primaryAction={{
                label: t.contact.ctaPrimary,
                onClick: () => window.open("https://wa.me/963958743823", "_blank"),
              }}
              secondaryAction={{
                label: t.contact.ctaSecondary,
                onClick: () => { window.location.href = "mailto:raghdkun@gmail.com"; },
              }}
            />
          </div>

          <div data-reveal className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title={t.contact.cards.whatsapp.title}
              description={t.contact.cards.whatsapp.desc}
              icon={<MessageCircle className="size-4" />}
              variant="highlight"
            />
            <FeatureCard
              title={t.contact.cards.instagram.title}
              description={t.contact.cards.instagram.desc}
              icon={<Instagram className="size-4" />}
            />
            <FeatureCard
              title={t.contact.cards.email.title}
              description={t.contact.cards.email.desc}
              icon={<Mail className="size-4" />}
            />
            <FeatureCard
              title={t.contact.cards.github.title}
              description={t.contact.cards.github.desc}
              icon={<Github className="size-4" />}
            />
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="relative border-t border-primary/20 bg-card/40">
        <UplinkHeader
          leftText={t.footer.end}
          rightText={`${t.footer.signal} · ${new Date().getFullYear()}`}
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="font-display text-lg font-bold uppercase text-primary">RAGHDKUN</div>
            <p className="mt-2 text-xs text-foreground/60">{t.footer.bio}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.navigate}
            </div>
            <ul className="mt-3 space-y-1 text-xs text-foreground/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-primary">{t.nav[l.key]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.channels}
            </div>
            <ul className="mt-3 space-y-1 text-xs text-foreground/70">
              <li>
                <a href="https://wa.me/963958743823" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  WhatsApp — +963 958 743 823
                </a>
              </li>
              <li>
                <a href="https://instagram.com/raghdkun" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Instagram — @raghdkun
                </a>
              </li>
              <li>
                <a href="mailto:raghdkun@gmail.com" className="hover:text-primary">
                  raghdkun@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/Raghdkun" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  GitHub — @Raghdkun
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.stack}
            </div>
            <ul className="mt-3 space-y-1 text-xs text-foreground/70">
              <li>Next.js 16 // React 19</li>
              <li>Tailwind v4 // shadcn/ui</li>
              <li>Laravel // PHP // Postgres</li>
              <li>Flutter // Dart</li>
              <li>n8n // Dify // Python // Node</li>
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

// ───────── Project card with screenshot ─────────
type ProjectCardProps = {
  project: ProjectStatic & { copy: { tagline: string; role: string; description: string } };
  featured?: boolean;
  liveLabel: string;
  visitLabel: string;
};

function ProjectCard({ project, featured, liveLabel, visitLabel }: ProjectCardProps) {
  const Inner = (
    <div
      data-project-card
      data-card-reveal
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded border bg-card/80 backdrop-blur-sm transition-all",
        project.variant === "highlight" ? "border-primary/50" : "border-primary/20",
        featured ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <div className="relative aspect-16/10 overflow-hidden border-b border-primary/20 bg-background">
        <Image
          src={project.image}
          alt={`${project.title} — screenshot`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          unoptimized={project.imageType === "svg"}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_4px)] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/95 via-background/10 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-linear-to-r from-transparent via-primary/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1 rounded border border-primary/40 bg-background/70 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">
            {project.icon}
            {project.copy.tagline}
          </span>
        </div>
        {project.url && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex h-6 items-center gap-1 rounded border border-primary/40 bg-background/70 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              {liveLabel}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/60" />
        <div className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/60" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/60" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/60" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            {project.copy.role}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          {project.copy.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
            >
              {s}
            </span>
          ))}
        </div>
        {project.url && (
          <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
            <span className="ms-3 inline-flex items-center gap-1 text-primary">
              {visitLabel} <Terminal className="size-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {Inner}
      </a>
    );
  }
  return Inner;
}
