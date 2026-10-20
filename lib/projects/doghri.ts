import type { Project } from "./types";
import { doghriCover, doghriGallery, doghriShowcase } from "./doghri-gallery";

export const doghri: Project = {
  slug: "doghri",
  title: "Doghri",
  titleAr: "دُغري",
  kind: "platform",
  year: "2026",
  status: "building",
  role: {
    en: "Fullstack · Flutter, Laravel, dashboard",
    ar: "فول-ستاك · Flutter وLaravel ولوحة التحكم",
  },
  tagline: {
    en: "RIDE-HAILING SUPER APP FOR SYRIA",
    ar: "تطبيق نقل ذكي لسوريا",
  },
  summary: {
    en: "A bilingual Arabic/English ride-hailing platform with fair, fuel-indexed fares, no surge pricing, live tracking, built-in safety features and an admin dashboard that controls everything without an app release.",
    ar: "منصّة نقل ذكي ثنائية اللغة بأجرة عادلة مرتبطة بسعر الوقود دون زيادة وقت الذروة، تتبّع مباشر، ميزات أمان مدمجة، ولوحة تحكم تدير كل شيء دون إصدار جديد للتطبيق.",
  },
  description: [
    {
      en: "Doghri (دُغري, “straight there”) is a ride-hailing platform built for the Syrian market: Arabic-first with full right-to-left support, and English throughout. Riders plan a trip with up to two stops and see a fare range before they book. The final fare is calculated on the server from the trip's real GPS distance and time and today's fuel price, and the rider gets the same line-by-line breakdown as the captain.",
      ar: "دُغري منصّة نقل ذكي مبنية للسوق السوري: عربية أولاً مع دعم كامل للاتجاه من اليمين إلى اليسار، وإنجليزية في كل مكان. يخطّط الراكب رحلته مع ما يصل إلى محطتين ويرى نطاق الأجرة قبل الحجز. تُحسب الأجرة النهائية على الخادم من مسافة GPS الفعلية والوقت وسعر الوقود اليوم، ويحصل الراكب على نفس تفاصيل الأجرة التي يراها الكابتن.",
    },
    {
      en: "While the captain is on the way and during the trip, riders follow the car live and can chat or call, and the app never shows either side's number. They can ask for an extra stop, share the trip with family through a live web page, or raise an SOS. Behind it, a Laravel dashboard lets the operator run the business from one place: fare rules, fuel prices, promotions, notification templates, theme colours, feature switches, SMS, WhatsApp and map providers, and the SYP↔USD rate.",
      ar: "أثناء قدوم الكابتن وخلال الرحلة يتابع الراكب السيارة مباشرة ويمكنه المراسلة أو الاتصال، دون أن يعرض التطبيق رقم أي من الطرفين. يمكنه طلب محطة إضافية، أو مشاركة الرحلة مع العائلة عبر صفحة ويب مباشرة، أو طلب المساعدة الطارئة. وخلف ذلك لوحة تحكم Laravel تدير العمل كله من مكان واحد: قواعد الأجرة وأسعار الوقود والعروض وقوالب الإشعارات والألوان والميزات ومزوّدي الرسائل والخرائط وسعر صرف الليرة مقابل الدولار.",
    },
    {
      en: "Status: the customer ride flow, the backend and the dashboard are built. The partner (captain) app and an optional multi-vendor delivery module are next on the roadmap. All people, numbers and trips in the screenshots are test data.",
      ar: "الحالة: تجربة الراكب والخادم ولوحة التحكم مكتملة. تطبيق الكابتن ووحدة التوصيل متعددة المتاجر الاختيارية هما التاليان في خارطة الطريق. كل الأشخاص والأرقام والرحلات في اللقطات بيانات تجريبية.",
    },
  ],
  highlights: [
    {
      title: { en: "Rider app (Flutter)", ar: "تطبيق الراكب (Flutter)" },
      items: [
        {
          en: "Arabic by default (RTL) and English (LTR), mirrored layouts, light and dark themes.",
          ar: "العربية افتراضياً (RTL) والإنجليزية (LTR)، تخطيطات معكوسة، وثيمان فاتح وداكن.",
        },
        {
          en: "Phone-code sign-in over SMS or WhatsApp, trip planner with up to two stops, live fare ranges, promo codes.",
          ar: "تسجيل الدخول برمز على الهاتف عبر SMS أو واتساب، مخطط رحلة بمحطتين، نطاق أجرة مباشر، ورموز خصم.",
        },
        {
          en: "Real-time matching and tracking over WebSockets with a polling fallback; the car glides between GPS fixes and the driven route turns grey.",
          ar: "مطابقة وتتبّع لحظيان عبر WebSockets مع بديل بالاستطلاع؛ تنساب السيارة بين نقاط GPS ويتحوّل الجزء المقطوع من المسار إلى الرمادي.",
        },
        {
          en: "In-trip chat with read receipts; calling works only during the trip and the app never shows the number.",
          ar: "مراسلة أثناء الرحلة مع إشعارات القراءة؛ الاتصال متاح خلال الرحلة فقط ولا يعرض التطبيق الرقم أبداً.",
        },
        {
          en: "Safety: a live share-trip page for family with no phone numbers or prices, and SOS with an instant alert to the operations team.",
          ar: "السلامة: صفحة مشاركة مباشرة للعائلة دون أرقام هواتف أو أسعار، وزر طوارئ مع تنبيه فوري لفريق العمليات.",
        },
      ],
    },
    {
      title: { en: "Operations dashboard (Laravel + Inertia/React)", ar: "لوحة العمليات (Laravel + Inertia/React)" },
      items: [
        {
          en: "KPIs, a live map of captains and trips, and trip detail with a full fare audit and an audited GPS route replay.",
          ar: "مؤشرات أداء، خريطة مباشرة للكباتن والرحلات، وتفاصيل الرحلة مع تدقيق كامل للأجرة وإعادة عرض موثّقة لمسار GPS.",
        },
        {
          en: "Versioned fare rules with a simulator, official fuel prices with an impact preview, a promotions builder.",
          ar: "قواعد أجرة بإصدارات مع محاكي، وأسعار وقود رسمية مع معاينة الأثر، ومنشئ عروض.",
        },
        {
          en: "App control: modules, feature switches, home layout, theme editor, version and maintenance policy, all without an app release.",
          ar: "التحكم بالتطبيق: الوحدات ومفاتيح الميزات وتخطيط الرئيسية ومحرر الثيم وسياسة الإصدار والصيانة، كل ذلك دون إصدار جديد.",
        },
        {
          en: "Notification templates in AR/EN with live preview, segment broadcasts, CSV/XLSX reports, staff roles, audit log, captain approvals and settlements.",
          ar: "قوالب إشعارات AR/EN بمعاينة مباشرة، رسائل جماعية بالشرائح، تقارير CSV/XLSX، أدوار الفريق، سجل التدقيق، وموافقات الكباتن والتسويات.",
        },
      ],
    },
    {
      title: { en: "Engineering", ar: "الهندسة" },
      items: [
        {
          en: "Laravel 13 / PHP 8.4 on PostgreSQL + PostGIS, Redis and Reverb. Thin controller → FormRequest → Action → API Resource, an explicit ride state machine, versioned /api/v1 with one JSON envelope and OpenAPI drift checks in CI.",
          ar: "Laravel 13 وPHP 8.4 على PostgreSQL وPostGIS وRedis وReverb. متحكم رفيع ← FormRequest ← Action ← API Resource، آلة حالات صريحة للرحلة، و/api/v1 بإصدارات وغلاف JSON موحّد وفحص انحراف OpenAPI في CI.",
        },
        {
          en: "Money in integer minor units with a currency code and an exchange-rate snapshot on every record (SYP and USD).",
          ar: "المبالغ بوحدات صغرى صحيحة مع رمز العملة ولقطة سعر الصرف في كل سجل (ليرة ودولار).",
        },
        {
          en: "The fare comes from the GPS trail: it filters jitter and impossible jumps, fills gaps with routed distance and flags trips far off the planned route.",
          ar: "الأجرة من مسار GPS: تُرشَّح الاهتزازات والقفزات المستحيلة، وتُملأ الفجوات بمسافة الطريق، وتُعلَّم الرحلات البعيدة عن المسار المخطط.",
        },
        {
          en: "Pluggable providers chosen with Syria's sanctions history in mind: SMS (Twilio, Syriatel, MTN, HTTP gateway), WhatsApp (Cloud API, Open-WA) and a free OpenStreetMap stack by default, with a circuit breaker and automatic fallback.",
          ar: "مزوّدون قابلون للتبديل اختيروا مع مراعاة العقوبات على سوريا: SMS (Twilio وسيرياتل وMTN وبوابة HTTP) وواتساب (Cloud API وOpen-WA) وحزمة OpenStreetMap مجانية افتراضياً مع قاطع دارة وبديل تلقائي.",
        },
        {
          en: "One Flutter codebase builds two apps (customer and partner flavors) using Riverpod 3, go_router and feature-first clean architecture.",
          ar: "قاعدة Flutter واحدة تبني تطبيقين (الراكب والشريك) باستخدام Riverpod 3 وgo_router وبنية نظيفة بحسب الميزة.",
        },
      ],
    },
  ],
  facts: [
    { value: "579", label: { en: "backend tests (Pest)", ar: "اختبار للخادم (Pest)" } },
    { value: "225", label: { en: "Flutter tests", ar: "اختبار Flutter" } },
    { value: "2", label: { en: "languages, RTL + LTR", ar: "لغتان، RTL وLTR" } },
  ],
  stack: [
    "Flutter", "Dart", "Riverpod", "Laravel", "PHP", "React", "Inertia", "PostgreSQL", "PostGIS", "Redis", "WebSockets", "MapLibre", "OpenStreetMap",
  ],
  links: [],
  cover: doghriCover,
  showcase: doghriShowcase,
  gallery: doghriGallery,
  featured: true,
};
