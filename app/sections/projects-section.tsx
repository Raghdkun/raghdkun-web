"use client";

/**
 * PROJECTS — temporarily removed from the landing page (see app/page.tsx).
 * Kept compiled so it can be re-enabled by rendering <ProjectsSection /> again.
 */

import * as React from "react";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  Cpu,
  Layers,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { Chip } from "@/components/thegridcn/chip";
import { Divider } from "@/components/thegridcn/divider";
import { useLanguage, type Locale } from "../lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ProjectType = "web" | "mobile" | "tool";
type ProjectStatus = "live" | "offline" | "app" | "repo";

type ProjectStatic = {
  slug: string;
  title: string;
  url?: string;
  image: string;
  imageType?: "raster" | "svg";
  variant?: "highlight";
  type: ProjectType;
  status: ProjectStatus;
  icon: React.ReactNode;
  stack: string[];
};

const ICON = { className: "size-4", strokeWidth: 1.5 } as const;

const PROJECTS_STATIC: ProjectStatic[] = [
  // `?v=` busts the image-optimizer cache (30-day TTL) whenever a screenshot is re-captured.
  { slug: "trucking360", title: "Trucking360", url: "https://trucking360solutions.com/", image: "/images/projects/trucking360.jpg?v=2", type: "web", status: "live", icon: <Truck {...ICON} />, variant: "highlight", stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { slug: "gosimple", title: "GoSimple", url: "https://gosimple.io/", image: "/images/projects/gosimple.jpg?v=2", type: "web", status: "live", icon: <Sparkles {...ICON} />, variant: "highlight", stack: ["Next.js", "TypeScript", "Tailwind", "Design System"] },
  { slug: "b-dashboard", title: "B-Dashboard", url: "https://b-dashboard-five.vercel.app/", image: "/images/projects/b-dashboard.jpg?v=2", type: "web", status: "live", icon: <Cpu {...ICON} />, stack: ["Next.js 16", "shadcn/ui", "Zustand", "next-intl"] },
  { slug: "zahratalhayat", title: "Zahrat Al Hayat", url: "https://zahratalhayat.online/", image: "/images/projects/zahratalhayat.jpg?v=2", type: "web", status: "live", icon: <Layers {...ICON} />, stack: ["Next.js", "Tailwind", "i18n"] },
  // cleave.raghdkun.tech is currently unreachable; card stays visible but is not a link until it is back.
  { slug: "cleave", title: "Cleave", url: "https://cleave.raghdkun.tech/", image: "/images/projects/cleave.jpg", type: "tool", status: "offline", icon: <Zap {...ICON} />, stack: ["Next.js", "TypeScript", "Node", "Crawler"] },
  // Repo link removed: github.com/Raghdkun/modern-web-os returns 404. Re-add `url` once the repo is public.
  { slug: "modern-web-os", title: "Modern Web OS", image: "/images/projects/modern-web-os.svg", imageType: "svg", type: "tool", status: "app", icon: <MonitorSmartphone {...ICON} />, stack: ["React", "TypeScript", "Vite", "Window Manager"] },
  { slug: "wavlet", title: "Wavlet", image: "/images/projects/wavlet.svg", imageType: "svg", type: "mobile", status: "app", icon: <Smartphone {...ICON} />, stack: ["Flutter", "Dart", "Charts", "Local Storage"] },
  { slug: "millennium", title: "Millennium Toolkit", image: "/images/projects/millennium.svg", imageType: "svg", type: "mobile", status: "app", icon: <Activity {...ICON} />, stack: ["Flutter", "Dart", "Laravel", "REST API"] },
];

const PROJECT_COPY: Record<Locale, Record<string, { tagline: string; role: string; description: string }>> = {
  en: {
    trucking360: {
      tagline: "AMAZON FREIGHT PARTNER OS",
      role: "Frontend Developer",
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
      role: "مطوّر واجهات",
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

const FILTERS: Array<"all" | ProjectType> = ["all", "web", "mobile", "tool"];

export function ProjectsSection() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = React.useState<"all" | ProjectType>("all");
  const rootRef = React.useRef<HTMLElement | null>(null);

  // Cards are shown/hidden with display:none, so scroll positions shift; let ScrollTrigger re-measure.
  React.useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  const projects = React.useMemo(
    () => PROJECTS_STATIC.map((p) => ({ ...p, copy: PROJECT_COPY[locale][p.slug] })),
    [locale],
  );
  const visibleCount = projects.filter((p) => filter === "all" || p.type === filter).length;

  // 3D tilt on fine pointers only
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = gsap.matchMedia();
      media.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const cleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
          gsap.set(card, { transformPerspective: 800, transformStyle: "preserve-3d" });
          const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.22, ease: "power2.out" });
          const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.22, ease: "power2.out" });
          const onMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
            rotateYTo(offsetX * 4);
            rotateXTo(-offsetY * 4);
          };
          const onLeave = () => { rotateXTo(0); rotateYTo(0); };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
            gsap.set(card, { clearProps: "rotateX,rotateY,transformPerspective,transformStyle" });
          });
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
      return () => media.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section id="projects" ref={rootRef} className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-scan>
          <Divider label={t.projects.divider} variant="glow" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              key={`projects-${locale}`}
              data-decode
              className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl"
            >
              {t.projects.title} <span className="text-primary">{t.projects.titleAccent}</span>
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-foreground/60 sm:text-sm">{t.projects.intro}</p>
          </div>

          <div role="group" aria-label={t.projects.filterLabel} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Chip
                key={f}
                size="md"
                selected={filter === f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {t.projects.filters[f]}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              featured={i === 0}
              hidden={filter !== "all" && p.type !== filter}
              labels={{ visit: t.projects.visit, status: t.projects.status }}
            />
          ))}
        </div>

        {visibleCount === 0 && (
          <p className="mt-10 rounded border border-dashed border-primary/30 p-8 text-center font-mono text-xs uppercase tracking-widest text-foreground/60">
            {t.projects.empty}
          </p>
        )}
      </div>
    </section>
  );
}

// ───────── Project card with screenshot ─────────
type ProjectCardProps = {
  project: ProjectStatic & { copy: { tagline: string; role: string; description: string } };
  featured?: boolean;
  hidden?: boolean;
  labels: { visit: string; status: Record<ProjectStatus, string> };
};

function ProjectCard({ project, featured, hidden, labels }: ProjectCardProps) {
  const clickable = Boolean(project.url) && project.status !== "offline";
  const host = project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const statusBadge =
    project.status === "live" ? (
      <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded border border-primary/40 bg-background/70 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/80 backdrop-blur sm:tracking-[0.2em]">
        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
        {labels.status.live}
      </span>
    ) : project.status === "offline" ? (
      <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded border border-amber-500/40 bg-background/70 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-400 backdrop-blur sm:tracking-[0.2em]">
        <span className="size-1.5 rounded-full bg-amber-400" />
        {labels.status.offline}
      </span>
    ) : null;

  const Inner = (
    <article
      data-project-card
      data-card-reveal
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded border bg-card/80 transition-[border-color,box-shadow] duration-300",
        project.variant === "highlight" ? "border-primary/50" : "border-primary/20",
        clickable && "group-hover/link:border-primary/60",
        featured && "lg:flex-row",
      )}
    >
      <div
        className={cn(
          "relative aspect-16/10 overflow-hidden border-b border-primary/20 bg-background",
          featured && "lg:aspect-auto lg:w-[54%] lg:border-b-0 lg:border-e",
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.copy.tagline.toLowerCase()}`}
          fill
          sizes={featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"}
          className={cn(
            "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            featured && "lg:object-left-top",
          )}
          unoptimized={project.imageType === "svg"}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_4px)] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/95 via-background/10 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-linear-to-r from-transparent via-primary/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="inline-flex h-6 min-w-0 items-center gap-1 rounded border border-primary/40 bg-background/70 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary backdrop-blur sm:tracking-[0.2em]">
            {project.icon}
            <span className="truncate">{project.copy.tagline}</span>
          </span>
          {statusBadge}
        </div>
        <div className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/60" />
        <div className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/60" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/60" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/60" />
      </div>

      <div className={cn("flex flex-1 flex-col p-5", featured && "lg:justify-center lg:p-8")}>
        <h3 className={cn("font-display text-xl font-bold uppercase tracking-wide text-foreground", featured && "lg:text-2xl")}>
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55">
          {project.copy.role}
        </p>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground/72">
          {project.copy.description}
        </p>
        <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
            >
              {s}
            </li>
          ))}
        </ul>
        {host && (
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-primary/10 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
            <span className="truncate">{host}</span>
            {clickable ? (
              <span className="inline-flex shrink-0 items-center gap-1 text-primary">
                {labels.visit}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" strokeWidth={1.75} />
              </span>
            ) : (
              <span className="shrink-0 text-amber-400/80">{labels.status.offline}</span>
            )}
          </div>
        )}
        {!host && project.status === "app" && (
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-primary/10 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
            <span>{labels.status.app}</span>
          </div>
        )}
      </div>
    </article>
  );

  const wrapperClass = cn(
    "group/link block min-w-0",
    featured && "lg:col-span-2",
    hidden && "hidden",
  );

  if (clickable) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${labels.visit}`}
        className={cn(wrapperClass, "rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary")}
      >
        {Inner}
      </a>
    );
  }
  return <div className={wrapperClass}>{Inner}</div>;
}
