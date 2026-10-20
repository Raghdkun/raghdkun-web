import type { Project } from "./types";
import { appShot } from "./helpers";

const s = "wavlet";
const a = (name: string, en: string, ar: string) => appShot(s, name, { en, ar });

const welcome = a("welcome", "Welcome screen with animated waves", "شاشة الترحيب بالأمواج المتحركة");
const currency = a("currency", "Choose a currency: USD or SYP", "اختيار العملة: دولار أو ليرة");
const whatsNew = a("whats-new", "What's New sheet shown after an over-the-air update", "نافذة «ما الجديد» بعد التحديث عن بُعد");
const dashboard = a("dashboard", "Dashboard: net balance, budgets and recent transactions", "الرئيسية: الرصيد الصافي والميزانيات وآخر المعاملات");
const income = a("income", "Income list with period, category and amount filters", "قائمة الدخل مع تصفية بالفترة والفئة والمبلغ");
const expenses = a("expenses", "Expense list with the same filters", "قائمة المصاريف بنفس التصفيات");
const analytics = a("analytics", "Analytics: totals and monthly or weekly bars", "التحليلات: المجاميع وأعمدة شهرية أو أسبوعية");
const charts = a("analytics-charts", "Income vs expenses and category donut charts", "الدخل مقابل المصاريف ومخططات الفئات");
const addExpense = a("add-expense", "Add an expense: name, amount, currency, category", "إضافة مصروف: الاسم والمبلغ والعملة والفئة");
const settings = a("settings", "Settings: profile, updates, budgets, recurring rules, CSV export", "الإعدادات: الملف والتحديثات والميزانيات والتكرار وتصدير CSV");
const budgets = a("budgets", "Budgets with live progress per category", "ميزانيات بتقدّم مباشر لكل فئة");

export const wavlet: Project = {
  slug: s,
  title: "Wavlet",
  kind: "mobile",
  status: "shipped",
  role: { en: "Solo build · Mobile", ar: "بناء فردي · موبايل" },
  tagline: { en: "PERSONAL FINANCE APP", ar: "تطبيق مالية شخصية" },
  summary: {
    en: "“Feel your finances flow.” An offline-first personal finance app with a fully custom liquid, wave-based interface: income, expenses, budgets, recurring rules and charts.",
    ar: "«اشعر بتدفّق ماليّتك.» تطبيق مالية شخصية يعمل دون اتصال بواجهة سائلة مخصّصة بالكامل: دخل ومصاريف وميزانيات وقواعد تكرار ومخططات.",
  },
  description: [
    {
      en: "Wavlet is a personal finance companion built around one idea: money should feel like something that moves. The interface is custom from the ground up, with no stock Material or Cupertino widgets. Waves, blobs and glass panels are drawn with custom painters, and the palette is deep navy with indigo and aqua accents.",
      ar: "Wavlet رفيق مالي شخصي مبني على فكرة واحدة: المال يجب أن يبدو متحرّكاً. الواجهة مخصّصة من الأساس دون أي عناصر Material أو Cupertino جاهزة؛ الأمواج والبقع والألواح الزجاجية مرسومة بـ custom painters، واللوحة كحلية داكنة بلمسات نيلية وأكوامارين.",
    },
    {
      en: "Everything lives on the device. Income, expenses, budgets and recurring rules are stored in a local Isar database, so the app works fully offline and needs no account. It supports USD and Syrian pounds, and new builds ship over the air with Shorebird, followed by a “What's New” sheet so users see what changed.",
      ar: "كل شيء على الجهاز. يُخزَّن الدخل والمصاريف والميزانيات وقواعد التكرار في قاعدة Isar محلية، فيعمل التطبيق دون اتصال وبلا حساب. يدعم الدولار والليرة السورية، وتصل الإصدارات الجديدة عن بُعد عبر Shorebird متبوعة بنافذة «ما الجديد» ليعرف المستخدم ما تغيّر.",
    },
    {
      en: "The screenshots were captured from the running app on an iPhone 17 Pro simulator with demo data.",
      ar: "اللقطات من التطبيق وهو يعمل على محاكي iPhone 17 Pro ببيانات تجريبية.",
    },
  ],
  highlights: [
    {
      title: { en: "Money tracking", ar: "تتبّع المال" },
      items: [
        { en: "Income with frequency (daily, weekly, monthly, one-time) and categories; expenses with categories and notes; custom categories for both.", ar: "دخل بتكرار (يومي وأسبوعي وشهري ومرة واحدة) وفئات؛ ومصاريف بفئات وملاحظات؛ مع فئات مخصّصة للاثنين." },
        { en: "Filters by period (7D, 30D, 90D, all), category and min/max amount.", ar: "تصفية بالفترة (٧ أيام، ٣٠، ٩٠، الكل) والفئة وحدّي المبلغ." },
        { en: "Budgets per category, weekly or monthly, with live progress bars on the dashboard.", ar: "ميزانيات لكل فئة، أسبوعية أو شهرية، بأشرطة تقدّم مباشرة في الرئيسية." },
        { en: "Recurring rules that generate repeating income and expenses automatically.", ar: "قواعد تكرار تنشئ الدخل والمصاريف المتكررة تلقائياً." },
      ],
    },
    {
      title: { en: "Insight", ar: "الرؤى" },
      items: [
        { en: "Net balance at a glance, with income and expense totals on an animated wave card.", ar: "الرصيد الصافي بنظرة واحدة، مع مجموع الدخل والمصاريف على بطاقة أمواج متحركة." },
        { en: "Income vs expenses bars (monthly or weekly), and donut breakdowns by category for both income and spending.", ar: "أعمدة الدخل مقابل المصاريف (شهرياً أو أسبوعياً)، ومخططات دائرية بحسب الفئة للدخل والإنفاق." },
        { en: "Trend comparison against the previous period; CSV export of all transactions.", ar: "مقارنة الاتجاه بالفترة السابقة؛ وتصدير كل المعاملات بصيغة CSV." },
      ],
    },
    {
      title: { en: "Engineering", ar: "الهندسة" },
      items: [
        { en: "Feature-first clean architecture with Riverpod for state and go_router for navigation.", ar: "بنية نظيفة بحسب الميزة مع Riverpod للحالة وgo_router للتنقل." },
        { en: "Isar for local storage; fl_chart plus custom painters for charts; flutter_animate for motion.", ar: "Isar للتخزين المحلي؛ وfl_chart مع custom painters للمخططات؛ وflutter_animate للحركة." },
        { en: "Over-the-air patches with Shorebird and a versioned changelog sheet.", ar: "تحديثات عن بُعد عبر Shorebird ونافذة تغييرات بإصدارات." },
      ],
    },
  ],
  facts: [
    { value: "2", label: { en: "currencies: USD and SYP", ar: "عملتان: دولار وليرة" } },
    { value: "0", label: { en: "servers needed, data stays on device", ar: "خوادم مطلوبة، البيانات على الجهاز" } },
    { value: "100%", label: { en: "custom-drawn interface", ar: "واجهة مرسومة مخصّصاً" } },
  ],
  stack: ["Flutter", "Dart", "Riverpod", "Isar", "go_router", "fl_chart", "Shorebird", "CustomPainter"],
  links: [{ label: { en: "View source", ar: "عرض الشيفرة" }, url: "https://github.com/Raghdkun/wavlet", kind: "repo" }],
  cover: dashboard,
  showcase: { phones: [dashboard, charts, budgets] },
  gallery: [
    {
      id: "app",
      label: { en: "App screens", ar: "شاشات التطبيق" },
      layout: "phone",
      images: [welcome, currency, dashboard, income, expenses, analytics, charts, addExpense, budgets, settings, whatsNew],
    },
  ],
};
