import type { Project } from "./types";
import { shot } from "./helpers";

const s = "arthena";
const hero = shot(s, "hero", "desktop", { en: "Arthena home page hero, in Arabic", ar: "الصفحة الرئيسية لأرثينا بالعربية" });

export const arthena: Project = {
  slug: s,
  title: "Arthena",
  titleAr: "أرثينا",
  kind: "web",
  status: "live",
  role: { en: "Web design & development", ar: "تصميم وتطوير الويب" },
  tagline: { en: "VIDEO PRODUCTION STUDIO, ARABIC FIRST", ar: "استوديو إنتاج فيديو، عربي أولاً" },
  summary: {
    en: "A cinematic, bilingual site for a production and post-production studio that makes one exceptional video for a brand: Infinite Zoom and Motion Graphics.",
    ar: "موقع سينمائي ثنائي اللغة لاستوديو إنتاج وما بعد الإنتاج يصنع فيديو واحداً استثنائياً للعلامة التجارية: Infinite Zoom وMotion Graphics.",
  },
  description: [
    {
      en: "Arthena Production is a studio focused on a single idea: one video made with exceptional production, enough to move a brand to another level. It works in two categories, Infinite Zoom and Motion Graphics, and its post-production team uses tools like DaVinci Resolve Fusion, After Effects, Blender, Cinema 4D and Houdini.",
      ar: "أرثينا برودكشن استوديو يركّز على فكرة واحدة: فيديو واحد بإنتاج استثنائي يكفي لنقل علامة تجارية إلى مستوى آخر. يعمل في فئتين: Infinite Zoom وMotion Graphics، ويستخدم فريق ما بعد الإنتاج أدوات مثل DaVinci Resolve Fusion وAfter Effects وBlender وCinema 4D وHoudini.",
    },
    {
      en: "The site is Arabic by default with full right-to-left layout and an English switch. A full-bleed cinematic hero opens it, followed by a service switcher, reels shown in phone frames with their view counts, a “why us” argument, the team, and contact cards. A floating WhatsApp button is always within reach.",
      ar: "الموقع عربي افتراضياً بتخطيط كامل من اليمين إلى اليسار ومفتاح للإنجليزية. يفتتحه بطل سينمائي بملء الشاشة، ثم مبدّل الخدمات، وأعمال داخل إطارات هواتف مع عدد المشاهدات، وحجّة «لماذا نحن»، والفريق، وبطاقات التواصل. وزر واتساب عائم دائماً في المتناول.",
    },
  ],
  highlights: [
    {
      title: { en: "Experience", ar: "التجربة" },
      items: [
        { en: "Arabic-first with true RTL layout, and an EN switch that re-flows the whole page to LTR.", ar: "عربي أولاً بتخطيط RTL حقيقي، ومفتاح EN يعيد ترتيب الصفحة كلها إلى LTR." },
        { en: "Full-bleed cinematic hero with a bold two-tone headline and a scroll cue.", ar: "بطل سينمائي بملء الشاشة بعنوان جريء بلونين ومؤشر للتمرير." },
        { en: "Service switcher between Infinite Zoom and Motion Graphics.", ar: "مبدّل خدمات بين Infinite Zoom وMotion Graphics." },
        { en: "Reels presented in phone frames, with the view counts that matter to a buyer.", ar: "الأعمال داخل إطارات هواتف مع أعداد المشاهدات التي تهمّ المشتري." },
      ],
    },
    {
      title: { en: "Conversion", ar: "التحويل" },
      items: [
        { en: "A sticky “start your project” button opens WhatsApp from anywhere on the page.", ar: "زر «ابدأ مشروعك» ثابت يفتح واتساب من أي مكان في الصفحة." },
        { en: "A two-point “why us” argument: elevate the brand, invest in one iconic piece instead of ten ordinary ones.", ar: "حجّة من نقطتين: الارتقاء بالعلامة، والاستثمار في عمل أيقوني واحد بدل عشرة عادية." },
        { en: "Contact cards for Instagram, WhatsApp and email, plus a closing call to action.", ar: "بطاقات تواصل لإنستغرام وواتساب والبريد، ودعوة ختامية للعمل." },
      ],
    },
  ],
  facts: [
    { value: "2", label: { en: "languages, RTL + LTR", ar: "لغتان، RTL وLTR" } },
    { value: "2", label: { en: "service categories", ar: "فئتا خدمات" } },
    { value: "3", label: { en: "contact channels", ar: "قنوات تواصل" } },
  ],
  stack: ["Next.js", "React", "Tailwind", "i18n", "RTL", "Vercel"],
  links: [{ label: { en: "Visit live site", ar: "زيارة الموقع" }, url: "https://arthena.pro/", kind: "live" }],
  cover: hero,
  showcase: {
    desktop: hero,
    phones: [
      shot(s, "hero", "mobile", { en: "Mobile hero", ar: "البطل على الموبايل" }),
      shot(s, "work", "mobile", { en: "Mobile: reels", ar: "الموبايل: الأعمال" }),
      shot(s, "about", "mobile", { en: "Mobile: why us", ar: "الموبايل: لماذا نحن" }),
    ],
  },
  gallery: [
    {
      id: "desktop",
      label: { en: "Desktop, Arabic", ar: "سطح المكتب، عربي" },
      layout: "desktop",
      images: [
        hero,
        shot(s, "work", "desktop", { en: "Reels in phone frames", ar: "الأعمال داخل إطارات هواتف" }),
        shot(s, "why", "desktop", { en: "Why us", ar: "لماذا نحن" }),
        shot(s, "about", "desktop", { en: "About the studio", ar: "عن الاستوديو" }),
        shot(s, "contact", "desktop", { en: "Contact", ar: "التواصل" }),
      ],
    },
    {
      id: "english",
      label: { en: "Desktop, English", ar: "سطح المكتب، إنجليزي" },
      layout: "desktop",
      images: [shot(s, "hero-en", "desktop", { en: "Hero after switching to English (LTR)", ar: "البطل بعد التبديل إلى الإنجليزية (LTR)" })],
    },
    {
      id: "mobile",
      label: { en: "Mobile", ar: "الموبايل" },
      layout: "phone",
      images: [
        shot(s, "hero", "mobile", { en: "Mobile hero", ar: "البطل على الموبايل" }),
        shot(s, "work", "mobile", { en: "Mobile: reels", ar: "الموبايل: الأعمال" }),
        shot(s, "about", "mobile", { en: "Mobile: why us", ar: "الموبايل: لماذا نحن" }),
      ],
    },
  ],
};
