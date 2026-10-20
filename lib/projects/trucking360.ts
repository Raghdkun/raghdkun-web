import type { Project } from "./types";
import { shot } from "./helpers";

const s = "trucking360";
const hero = shot(s, "hero", "desktop", { en: "Trucking 360 home page hero", ar: "الصفحة الرئيسية لـ Trucking 360" });

export const trucking360: Project = {
  slug: s,
  title: "Trucking 360",
  kind: "web",
  status: "live",
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  tagline: { en: "AMAZON FREIGHT PARTNER DISPATCH + DASHBOARD", ar: "إرسال وتشغيل لشركاء أمازون للشحن مع لوحة بيانات" },
  summary: {
    en: "Marketing site for a dispatch and driver-recruiting partner that helps Amazon Freight Partner carriers reach Fantastic+ results, built around its automated Dashboard 360.",
    ar: "موقع تسويقي لشريك إرسال وتوظيف سائقين يساعد ناقلي Amazon Freight Partner على بلوغ نتائج Fantastic+، ويتمحور حول لوحة Dashboard 360 المؤتمتة.",
  },
  description: [
    {
      en: "Trucking 360 is a dedicated partner for carriers in the Amazon Freight Partner (AFP) program who want Fantastic+ results. It offers dispatch support available around the clock for drivers, driver recruiting, and a fully automated metrics dashboard.",
      ar: "Trucking 360 شريك متخصص لشركات النقل في برنامج Amazon Freight Partner (AFP) التي تسعى لنتائج Fantastic+. يقدّم دعم إرسال متاحاً على مدار الساعة للسائقين، وتوظيف سائقين، ولوحة مؤشرات مؤتمتة بالكامل.",
    },
    {
      en: "I built the marketing site and the customer-facing surfaces: a clear value proposition up top, partner testimonials, a walkthrough of Dashboard 360, services and pricing, a recruiting FAQ, a contact form with reCAPTCHA and a one-click meeting booking. The goal is to explain a technical service quickly to fleet owners and move them to a call.",
      ar: "بنيت الموقع التسويقي وواجهات العملاء: عرض قيمة واضح في الأعلى، شهادات الشركاء، شرح للوحة Dashboard 360، الخدمات والأسعار، أسئلة شائعة عن التوظيف، نموذج تواصل مع reCAPTCHA، وحجز اجتماع بنقرة. الهدف شرح خدمة تقنية بسرعة لأصحاب الأساطيل ودفعهم إلى مكالمة.",
    },
  ],
  highlights: [
    {
      title: { en: "The marketing site", ar: "الموقع التسويقي" },
      items: [
        { en: "Hero that states the promise in one line, with a persistent “Dashboard 360” and “Book a Meeting” in the header.", ar: "واجهة تعرض الوعد بسطر واحد، مع «Dashboard 360» و«Book a Meeting» ثابتين في الترويسة." },
        { en: "Video testimonials from partners and their drivers, updated regularly.", ar: "شهادات فيديو من الشركاء وسائقيهم، تُحدَّث باستمرار." },
        { en: "Services & pricing, “Beyond Hiring”, newsletter and free-resources pages.", ar: "صفحات الخدمات والأسعار، و«ما بعد التوظيف»، والنشرة، والموارد المجانية." },
        { en: "Recruiting FAQ in expandable rows and a contact form with required fields, protected by reCAPTCHA.", ar: "أسئلة شائعة عن التوظيف بصفوف قابلة للتوسيع، ونموذج تواصل بحقول مطلوبة ومحمي بـ reCAPTCHA." },
      ],
    },
    {
      title: { en: "Dashboard 360, the product it presents", ar: "Dashboard 360، المنتج الذي يعرضه" },
      items: [
        { en: "Fully automated, with no manual entry; scores and analytics update daily and in real time.", ar: "مؤتمتة بالكامل دون إدخال يدوي؛ تُحدَّث التقييمات والتحليلات يومياً ولحظياً." },
        { en: "One centralized command center instead of jumping between portals.", ar: "مركز قيادة واحد بدلاً من التنقل بين عدة بوابات." },
        { en: "Data-driven coaching, tactical and strategic insights, top and bottom performer highlights.", ar: "تدريب مبني على البيانات، ورؤى تكتيكية واستراتيجية، وإبراز أفضل الأداء وأضعفه." },
        { en: "Multi-user, role-based access and a one-click report.", ar: "صلاحيات متعددة المستخدمين بحسب الدور، وتقرير بنقرة واحدة." },
      ],
    },
  ],
  facts: [
    { value: "24/7", label: { en: "dispatch support for drivers", ar: "دعم إرسال للسائقين" } },
    { value: "Daily", label: { en: "automated scorecards", ar: "تقييمات مؤتمتة" } },
    { value: "0", label: { en: "manual data entry", ar: "إدخال يدوي" } },
  ],
  stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "reCAPTCHA", "Vercel"],
  links: [{ label: { en: "Visit live site", ar: "زيارة الموقع" }, url: "https://trucking360solutions.com/", kind: "live" }],
  cover: hero,
  showcase: {
    desktop: hero,
    phones: [
      shot(s, "hero", "mobile", { en: "Mobile home page", ar: "الصفحة الرئيسية على الموبايل" }),
      shot(s, "dashboard", "mobile", { en: "Mobile: Dashboard 360 introduction", ar: "الموبايل: تقديم Dashboard 360" }),
      shot(s, "features", "mobile", { en: "Mobile: what makes it unstoppable", ar: "الموبايل: ما الذي يميّزها" }),
    ],
  },
  gallery: [
    {
      id: "desktop",
      label: { en: "Desktop", ar: "سطح المكتب" },
      layout: "desktop",
      images: [
        hero,
        shot(s, "testimonials", "desktop", { en: "Partner testimonials", ar: "شهادات الشركاء" }),
        shot(s, "dashboard", "desktop", { en: "Introducing Dashboard 360", ar: "تقديم Dashboard 360" }),
        shot(s, "features", "desktop", { en: "Dashboard features carousel", ar: "شريط ميزات اللوحة" }),
        shot(s, "faq", "desktop", { en: "Recruiting FAQ", ar: "الأسئلة الشائعة" }),
        shot(s, "contact", "desktop", { en: "Contact form", ar: "نموذج التواصل" }),
      ],
    },
    {
      id: "mobile",
      label: { en: "Mobile", ar: "الموبايل" },
      layout: "phone",
      images: [
        shot(s, "hero", "mobile", { en: "Mobile home page", ar: "الصفحة الرئيسية على الموبايل" }),
        shot(s, "dashboard", "mobile", { en: "Mobile: Dashboard 360 introduction", ar: "الموبايل: تقديم Dashboard 360" }),
        shot(s, "features", "mobile", { en: "Mobile: what makes it unstoppable", ar: "الموبايل: ما الذي يميّزها" }),
      ],
    },
  ],
};
