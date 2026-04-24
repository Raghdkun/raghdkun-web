"use client";

import * as React from "react";

export type Locale = "en" | "ar";

export type Dict = {
  htmlLang: string;
  dir: "ltr" | "rtl";
  toggleLabel: string;
  nav: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
    cta: string;
    whatsapp: string;
    skipNav: string;
    menuOpen: string;
    menuClose: string;
  };
  announcement: { text: string; action: string };
  hero: {
    chipAvailable: string;
    chipRole: string;
    chipRemote: string;
    location: string;
    title: string;
    subtitle: string;
    bio: string;
    ctaPrimary: string;
    ctaSecondary: string;
    versionBadge: string;
    profileSubtitle: string;
    profileTitle: string;
    fields: {
      role: { label: string; value: string };
      stack: { label: string; value: string };
      extra: { label: string; value: string };
      base: { label: string; value: string };
      channel: { label: string; value: string };
      status: { label: string; value: string };
    };
    uplinkLeft: string;
    uplinkRight: string;
    streamChannel: string;
    streamStatus: string;
  };
  marquee: string[];
  about: {
    divider: string;
    logTime: string;
    title: string;
    p1: string;
    p2: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    sysLabel: string;
    sysStatus: string;
    powerLabel: string;
    powerStatus: string;
    stats: { value: number; label: string; suffix: string }[];
    capabilityTitles: string[];
    capabilityDescs: string[];
  };
  skills: {
    divider: string;
    title: string;
    intro: string;
    skillLabels: string[];
    energyLabels: string[];
  };
  projects: {
    divider: string;
    title: string;
    titleAccent: string;
    intro: string;
    visit: string;
    live: string;
  };
  contact: {
    divider: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    cards: {
      whatsapp: { title: string; desc: string };
      instagram: { title: string; desc: string };
      email: { title: string; desc: string };
      github: { title: string; desc: string };
    };
  };
  footer: {
    bio: string;
    navigate: string;
    channels: string;
    stack: string;
    end: string;
    signal: string;
    copyright: string;
  };
};

const dictionaries: Record<Locale, Dict> = {
  en: {
    htmlLang: "en",
    dir: "ltr",
    toggleLabel: "العربية",
    nav: {
      about: "01 // ABOUT",
      skills: "02 // SKILLS",
      projects: "03 // PROJECTS",
      contact: "04 // CONTACT",
      cta: "GET IN TOUCH",
      whatsapp: "WHATSAPP",
      skipNav: "Skip to content",
      menuOpen: "Open navigation",
      menuClose: "Close navigation",
    },
    announcement: {
      text: "OPEN FOR PART-TIME & FREELANCE — REMOTE FROM AS SUWAYDA, SYRIA",
      action: "WHATSAPP",
    },
    hero: {
      chipAvailable: "// AVAILABLE PART-TIME",
      chipRole: "FULLSTACK ENGINEER",
      chipRemote: "REMOTE",
      location: "AS SUWAYDA · SYRIA",
      title: "RAGHDKUN",
      subtitle: "// FULLSTACK ENGINEER",
      bio:
        "I build polished web and mobile interfaces — React/Next on the front, Laravel on the back — plus Python & Node scripts and AI workflows in n8n and Dify. Shipping production sites, dashboards, mobile apps and automations from As Suwayda, Syria.",
      ctaPrimary: "MESSAGE ON WHATSAPP",
      ctaSecondary: "VIEW PROJECTS",
      versionBadge: "v1.0 — 2026",
      profileSubtitle: "OPERATOR PROFILE",
      profileTitle: "RAGHDKUN",
      fields: {
        role: { label: "ROLE", value: "FULLSTACK ENGINEER" },
        stack: { label: "STACK", value: "NEXT · LARAVEL · FLUTTER" },
        extra: { label: "EXTRA", value: "AI FLOWS // n8n + DIFY" },
        base: { label: "BASE", value: "AS SUWAYDA // SY" },
        channel: { label: "CHANNEL", value: "WHATSAPP +963 958 743 823" },
        status: { label: "STATUS", value: "ACCEPTING PART-TIME WORK" },
      },
      uplinkLeft: "UPLINK // 00.HERO",
      uplinkRight: "STATUS — OPERATIONAL",
      streamChannel: "HOME.0xHERO",
      streamStatus: "DATA STREAM ONLINE",
    },
    marquee: [
      "// FULLSTACK ENGINEER",
      "// AS SUWAYDA · SYRIA",
      "// REACT 19",
      "// NEXT 16",
      "// LARAVEL",
      "// TYPESCRIPT",
      "// TAILWIND v4",
      "// FLUTTER",
      "// n8n · DIFY · AI FLOWS",
      "// PYTHON · NODE",
      "// AVAILABLE PART-TIME",
    ],
    about: {
      divider: "01 // ABOUT — OPERATOR DOSSIER",
      logTime: "RECORDED LOG // 24.04.2026",
      title: "Operator Brief",
      p1:
        "Fullstack engineer based in As Suwayda, Syria. I work across web and mobile — Next.js, React, Tailwind, shadcn/ui, Laravel and Flutter — and I build AI workflows in n8n and Dify plus Python and Node automation scripts.",
      p2:
        "I care about typed APIs, design tokens, motion that respects the user, and shipping interfaces and backends that hold up under real traffic. Happy in solo-build or in-team roles.",
      bullet1: "Production sites, dashboards, mobile apps & automations",
      bullet2: "Comfortable in English-speaking remote teams",
      bullet3: "Strong on a11y, performance and details",
      sysLabel: "SYS // RAGHDKUN.SYS",
      sysStatus: "OPERATIONAL",
      powerLabel: "POWER // CORE",
      powerStatus: "4 GRIDS ONLINE",
      stats: [
        { value: 8, label: "SHIPPED PROJECTS", suffix: "+" },
        { value: 4, label: "YEARS BUILDING", suffix: "y" },
        { value: 3, label: "PLATFORMS", suffix: "" },
        { value: 100, label: "OWNERSHIP", suffix: "%" },
      ],
      capabilityTitles: [
        "WEB INTERFACES",
        "FULLSTACK · LARAVEL",
        "AI WORKFLOWS",
        "SCRIPTING",
        "DESIGN SYSTEMS",
        "MOBILE RUNTIMES",
      ],
      capabilityDescs: [
        "Next.js 16, React 19, Tailwind v4 — production-grade UI with measurable Core Web Vitals.",
        "Laravel backends with REST APIs, auth, queues and Postgres/MySQL. Comfortable owning the data model end-to-end.",
        "Automations and agentic flows with n8n and Dify — chained LLM calls, integrations and human-in-the-loop steps.",
        "Python and Node.js scripts for scraping, ETL, internal tooling and one-off automations.",
        "Token-driven theming with shadcn/ui — every primitive ships with a story and an a11y baseline.",
        "Flutter + native bridges for fluid motion and offline-first behaviour across iOS and Android.",
      ],
    },
    skills: {
      divider: "02 // SKILLS — POWER DISTRIBUTION",
      title: "Discipline Matrix",
      intro: "Calibrated against shipped product weight — not raw years.",
      skillLabels: [
        "REACT // NEXT.JS",
        "TYPESCRIPT",
        "TAILWIND // SHADCN/UI",
        "LARAVEL // PHP",
        "NODE.JS // PYTHON SCRIPTING",
        "FLUTTER // DART",
        "AI WORKFLOWS // n8n + DIFY",
        "DESIGN SYSTEMS",
      ],
      energyLabels: [
        "FRONTEND CORE",
        "BACKEND // LARAVEL",
        "AUTOMATION // AI FLOWS",
        "MOBILE RUNTIMES",
      ],
    },
    projects: {
      divider: "03 // PROJECTS — DEPLOYED ASSETS",
      title: "Selected",
      titleAccent: "Work",
      intro:
        "Live products and shipped apps — click any tile to visit the deployed site or repo.",
      visit: "VISIT",
      live: "LIVE",
    },
    contact: {
      divider: "04 // CONTACT — OPEN CHANNEL",
      ctaTitle: "LET'S BUILD SOMETHING.",
      ctaDesc:
        "Open to part-time, freelance or contract work — remote, async-friendly, based in As Suwayda. WhatsApp is the fastest way to reach me.",
      ctaPrimary: "WHATSAPP ME",
      ctaSecondary: "EMAIL",
      cards: {
        whatsapp: { title: "WHATSAPP", desc: "+963 958 743 823 · fastest reply" },
        instagram: { title: "INSTAGRAM", desc: "@raghdkun" },
        email: { title: "EMAIL", desc: "raghdkun@gmail.com" },
        github: { title: "GITHUB", desc: "github.com/Raghdkun" },
      },
    },
    footer: {
      bio:
        "Fullstack engineer · As Suwayda, Syria. Building polished web, mobile and AI-powered interfaces.",
      navigate: "NAVIGATE",
      channels: "CHANNELS",
      stack: "STACK",
      end: "// END OF LINE",
      signal: "SIGNAL",
      copyright: "ALL RIGHTS RESERVED",
    },
  },

  ar: {
    htmlLang: "ar",
    dir: "rtl",
    toggleLabel: "EN",
    nav: {
      about: "01 // نبذة",
      skills: "02 // المهارات",
      projects: "03 // المشاريع",
      contact: "04 // تواصل",
      cta: "تواصل معي",
      whatsapp: "واتساب",
      skipNav: "تخطّى إلى المحتوى",
      menuOpen: "فتح القائمة",
      menuClose: "إغلاق القائمة",
    },
    announcement: {
      text: "متاح للعمل بدوام جزئي وعمل حر — عن بُعد من السويداء، سوريا",
      action: "واتساب",
    },
    hero: {
      chipAvailable: "// متاح بدوام جزئي",
      chipRole: "مهندس فول-ستاك",
      chipRemote: "عن بُعد",
      location: "السويداء · سوريا",
      title: "RAGHDKUN",
      subtitle: "// مهندس فول-ستاك",
      bio:
        "أبني واجهات ويب وموبايل أنيقة — React/Next على الواجهة وLaravel على الخادم — بالإضافة إلى سكربتات Python وNode وأتمتة بالذكاء الاصطناعي عبر n8n وDify. أُطلق مواقع إنتاجية ولوحات تحكم وتطبيقات موبايل وأتمتة من السويداء، سوريا.",
      ctaPrimary: "راسلني عبر واتساب",
      ctaSecondary: "اعرض المشاريع",
      versionBadge: "v1.0 — 2026",
      profileSubtitle: "ملف المشغّل",
      profileTitle: "RAGHDKUN",
      fields: {
        role: { label: "الدور", value: "مهندس فول-ستاك" },
        stack: { label: "الستاك", value: "NEXT · LARAVEL · FLUTTER" },
        extra: { label: "إضافي", value: "أتمتة الذكاء // n8n + DIFY" },
        base: { label: "الموقع", value: "السويداء // سوريا" },
        channel: { label: "القناة", value: "واتساب 963958743823+" },
        status: { label: "الحالة", value: "أقبل عملاً جزئياً" },
      },
      uplinkLeft: "اتصال // 00.HERO",
      uplinkRight: "الحالة — يعمل",
      streamChannel: "HOME.0xHERO",
      streamStatus: "البث متّصل",
    },
    marquee: [
      "// مهندس فول-ستاك",
      "// السويداء · سوريا",
      "// REACT 19",
      "// NEXT 16",
      "// LARAVEL",
      "// TYPESCRIPT",
      "// TAILWIND v4",
      "// FLUTTER",
      "// n8n · DIFY · أتمتة ذكية",
      "// PYTHON · NODE",
      "// متاح بدوام جزئي",
    ],
    about: {
      divider: "01 // نبذة — ملف المشغّل",
      logTime: "سجل // 24.04.2026",
      title: "نبذة عن المشغّل",
      p1:
        "مهندس فول-ستاك من السويداء، سوريا. أعمل على الويب والموبايل — Next.js وReact وTailwind وshadcn/ui وLaravel وFlutter — وأبني تدفقات ذكاء اصطناعي عبر n8n وDify إلى جانب سكربتات أتمتة بـ Python وNode.",
      p2:
        "أهتم بـ APIs مكتوبة بأنواع صارمة، توكِنات تصميم متّسقة، حركة تحترم المستخدم، وواجهات وخوادم تصمد تحت ضغط الإنتاج. مرتاح في العمل المنفرد أو ضمن فريق.",
      bullet1: "مواقع إنتاجية، لوحات تحكم، تطبيقات موبايل وأتمتة",
      bullet2: "مرتاح ضمن فرق ناطقة بالإنجليزية عن بُعد",
      bullet3: "تركيز على الوصولية والأداء والتفاصيل",
      sysLabel: "النظام // RAGHDKUN.SYS",
      sysStatus: "يعمل",
      powerLabel: "الطاقة // النواة",
      powerStatus: "4 شبكات نشطة",
      stats: [
        { value: 8, label: "مشاريع مُطلَقة", suffix: "+" },
        { value: 4, label: "سنوات خبرة", suffix: "س" },
        { value: 3, label: "منصّات", suffix: "" },
        { value: 100, label: "ملكية كاملة", suffix: "%" },
      ],
      capabilityTitles: [
        "واجهات الويب",
        "فول-ستاك · لارافيل",
        "تدفقات الذكاء الاصطناعي",
        "كتابة السكربتات",
        "أنظمة التصميم",
        "تشغيل الموبايل",
      ],
      capabilityDescs: [
        "Next.js 16 وReact 19 وTailwind v4 — واجهات بمستوى إنتاجي مع مؤشرات Core Web Vitals قابلة للقياس.",
        "خوادم Laravel مع REST APIs ومصادقة وطوابير وPostgres/MySQL. مرتاح بإدارة نموذج البيانات من البداية للنهاية.",
        "أتمتة وعملاء ذكاء اصطناعي عبر n8n وDify — استدعاءات LLM متسلسلة، تكاملات، وخطوات تتضمّن البشر.",
        "سكربتات Python وNode.js للسحب والـ ETL والأدوات الداخلية والأتمتة لمرة واحدة.",
        "تصميم بتوكِنات عبر shadcn/ui — كل مكوّن مع قصة وأساس وصولية.",
        "Flutter وجسور أصلية لحركة سلسة وعمل بدون اتصال على iOS وAndroid.",
      ],
    },
    skills: {
      divider: "02 // المهارات — توزيع الطاقة",
      title: "مصفوفة الاختصاصات",
      intro: "مُعايَرة على وزن المنتجات المُطلَقة — لا على عدد السنوات.",
      skillLabels: [
        "REACT // NEXT.JS",
        "TYPESCRIPT",
        "TAILWIND // SHADCN/UI",
        "LARAVEL // PHP",
        "NODE.JS // سكربتات PYTHON",
        "FLUTTER // DART",
        "أتمتة الذكاء // n8n + DIFY",
        "أنظمة التصميم",
      ],
      energyLabels: [
        "نواة الواجهة",
        "الخادم // لارافيل",
        "الأتمتة // الذكاء",
        "تشغيل الموبايل",
      ],
    },
    projects: {
      divider: "03 // المشاريع — أصول مُطلَقة",
      title: "مختارات من",
      titleAccent: "الأعمال",
      intro:
        "منتجات حية وتطبيقات مُطلَقة — اضغط أي بطاقة لزيارة الموقع أو المستودع.",
      visit: "زيارة",
      live: "حيّ",
    },
    contact: {
      divider: "04 // تواصل — قناة مفتوحة",
      ctaTitle: "لنبني شيئاً معاً.",
      ctaDesc:
        "أقبل العمل الجزئي والحرّ والتعاقدي — عن بُعد، صديق للعمل غير المتزامن، من السويداء. واتساب هو الأسرع للوصول إليّ.",
      ctaPrimary: "راسلني واتساب",
      ctaSecondary: "بريد إلكتروني",
      cards: {
        whatsapp: { title: "واتساب", desc: "963 958 743 823+ · أسرع رد" },
        instagram: { title: "إنستغرام", desc: "@raghdkun" },
        email: { title: "البريد", desc: "raghdkun@gmail.com" },
        github: { title: "غيت-هَب", desc: "github.com/Raghdkun" },
      },
    },
    footer: {
      bio:
        "مهندس فول-ستاك · السويداء، سوريا. أبني واجهات ويب وموبايل وذكاء اصطناعي أنيقة.",
      navigate: "تنقّل",
      channels: "قنوات",
      stack: "الستاك",
      end: "// نهاية السطر",
      signal: "إشارة",
      copyright: "جميع الحقوق محفوظة",
    },
  },
};

const STORAGE_KEY = "raghdkun.locale";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LanguageContext = React.createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") setLocaleState(saved);
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    const dict = dictionaries[locale];
    document.documentElement.lang = dict.htmlLang;
    document.documentElement.dir = dict.dir;
  }, [locale, hydrated]);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
