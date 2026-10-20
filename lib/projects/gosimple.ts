import type { Project } from "./types";
import { shot } from "./helpers";

const s = "gosimple";
const hero = shot(s, "hero", "desktop", { en: "GoSimple home page hero", ar: "الصفحة الرئيسية لـ GoSimple" });

export const gosimple: Project = {
  slug: s,
  title: "GoSimple",
  kind: "web",
  status: "live",
  role: { en: "Frontend Developer · Team", ar: "مطوّر واجهات · ضمن فريق" },
  tagline: { en: "DIGITAL SOLUTIONS STUDIO", ar: "استوديو حلول رقمية" },
  summary: {
    en: "Studio site for a team that builds websites, custom software, data analytics and smart automations for ambitious founders. “Think big. Make it simple.”",
    ar: "موقع استوديو لفريق يبني مواقع وبرمجيات مخصّصة وتحليل بيانات وأتمتة ذكية لروّاد الأعمال الطموحين. «فكّر كبيراً. واجعله بسيطاً.»",
  },
  description: [
    {
      en: "GoSimple is a technology partner for people building websites, apps and internal tools. The site has to do one job well: make a visitor feel the studio is clear and calm, understand the four services in seconds, and book a consultation.",
      ar: "GoSimple شريك تقني لمن يبنون مواقع وتطبيقات وأدوات داخلية. على الموقع أن يؤدي مهمة واحدة جيداً: أن يشعر الزائر بوضوح الاستوديو وهدوئه، ويفهم الخدمات الأربع في ثوانٍ، ويحجز استشارة.",
    },
    {
      en: "I worked as a frontend developer on the product team across the marketing site and the case-study work: a dark, minimal interface with a particle-sphere hero, a floating pill navigation, a services grid, an audience section, a case-study carousel, a three-phase process with time estimates, a filterable FAQ and a consultation form with a service picker.",
      ar: "عملت مطوّر واجهات في فريق المنتج على الموقع التسويقي وصفحات دراسات الحالة: واجهة داكنة بسيطة ببطل من جسيمات كروية، وتنقّل عائم بشكل حبّة، وشبكة خدمات، وقسم الجمهور المستهدف، وشريط دراسات حالة، وعملية بثلاث مراحل مع تقديرات زمنية، وأسئلة شائعة قابلة للتصفية، ونموذج استشارة باختيار الخدمة.",
    },
  ],
  highlights: [
    {
      title: { en: "Structure", ar: "البنية" },
      items: [
        { en: "Four services: website and brand presence, custom software, data analytics and insights, smart automations.", ar: "أربع خدمات: حضور الموقع والعلامة، برمجيات مخصّصة، تحليل بيانات ورؤى، وأتمتة ذكية." },
        { en: "“This is for you if” strip that speaks to founders and big dreamers directly.", ar: "شريط «هذا لك إذا» يخاطب المؤسسين وأصحاب الأحلام الكبيرة مباشرة." },
        { en: "Work carousel with “The Challenge” write-ups: a learning platform, a web build and a logistics dashboard.", ar: "شريط أعمال مع «التحدي» لكل مشروع: منصة تعلّم، وموقع ويب، ولوحة لوجستيات." },
        { en: "How We Work in three steps: talk and understand (1–2 days), scope and plan (3–5 days), build and deliver (2–8 weeks).", ar: "كيف نعمل بثلاث خطوات: التحدث والفهم (١–٢ يوم)، التحديد والتخطيط (٣–٥ أيام)، البناء والتسليم (٢–٨ أسابيع)." },
      ],
    },
    {
      title: { en: "Interface", ar: "الواجهة" },
      items: [
        { en: "Dark, high-contrast type on near-black with generous spacing; a floating pill navigation that collapses to a menu on phones.", ar: "خط عالي التباين على خلفية شبه سوداء مع مسافات واسعة؛ وتنقّل عائم يتحوّل إلى قائمة على الهاتف." },
        { en: "Ambient particle backgrounds that stay behind the content and never compete with the copy.", ar: "خلفيات جسيمات هادئة تبقى خلف المحتوى ولا تنافس النص." },
        { en: "FAQ with category filters (general, process, pricing, technical, support) and expandable answers.", ar: "أسئلة شائعة بتصفية حسب الفئة (عام، العملية، الأسعار، تقني، الدعم) وإجابات قابلة للتوسيع." },
        { en: "Consultation form with service chips so the first message already says what the visitor needs.", ar: "نموذج استشارة برقائق خدمات ليذكر أول طلب ما يحتاجه الزائر." },
      ],
    },
  ],
  facts: [
    { value: "4", label: { en: "services presented", ar: "خدمات معروضة" } },
    { value: "3", label: { en: "delivery phases", ar: "مراحل تسليم" } },
    { value: "5", label: { en: "FAQ categories", ar: "فئات أسئلة" } },
  ],
  stack: ["Next.js", "React", "TypeScript", "Tailwind", "Design System", "Vercel"],
  links: [{ label: { en: "Visit live site", ar: "زيارة الموقع" }, url: "https://gosimple.io/", kind: "live" }],
  cover: hero,
  showcase: {
    desktop: hero,
    phones: [
      shot(s, "hero", "mobile", { en: "Mobile hero", ar: "البطل على الموبايل" }),
      shot(s, "services", "mobile", { en: "Mobile: services", ar: "الموبايل: الخدمات" }),
      shot(s, "process", "mobile", { en: "Mobile: how we work", ar: "الموبايل: كيف نعمل" }),
    ],
  },
  gallery: [
    {
      id: "desktop",
      label: { en: "Desktop", ar: "سطح المكتب" },
      layout: "desktop",
      images: [
        hero,
        shot(s, "services", "desktop", { en: "Our services", ar: "خدماتنا" }),
        shot(s, "audience", "desktop", { en: "This is for you if", ar: "هذا لك إذا" }),
        shot(s, "work", "desktop", { en: "Case-study carousel", ar: "شريط دراسات الحالة" }),
        shot(s, "process", "desktop", { en: "How we work", ar: "كيف نعمل" }),
        shot(s, "consultation", "desktop", { en: "Book a free consultation", ar: "احجز استشارة مجانية" }),
      ],
    },
    {
      id: "mobile",
      label: { en: "Mobile", ar: "الموبايل" },
      layout: "phone",
      images: [
        shot(s, "hero", "mobile", { en: "Mobile hero", ar: "البطل على الموبايل" }),
        shot(s, "services", "mobile", { en: "Mobile: services", ar: "الموبايل: الخدمات" }),
        shot(s, "process", "mobile", { en: "Mobile: how we work", ar: "الموبايل: كيف نعمل" }),
      ],
    },
  ],
};
