import type { Project } from "./types";

/**
 * NOT LISTED YET: needs real app screenshots before it is added to PROJECTS in ./index.ts.
 * The repo (github.com/Raghdkun/weathers) does not build for iOS (Xcode 27), Android (Gradle 7.5 on
 * JDK 21) or web with current toolchains, so no screenshots were captured. Add them to
 * public/projects/weathers/, set `cover`, `showcase` and `gallery` below (use `appShot` from ./helpers),
 * then add `weathers` to PROJECTS.
 */
export const weathers: Project = {
  slug: "weathers",
  title: "Weathers",
  kind: "mobile",
  status: "shipped",
  role: { en: "Solo build · Mobile", ar: "بناء فردي · موبايل" },
  tagline: { en: "BILINGUAL WEATHER APP", ar: "تطبيق طقس ثنائي اللغة" },
  summary: {
    en: "A Flutter weather app with current conditions, hourly and 10-day forecasts, astronomy data, periodic weather notifications and full English and Arabic support.",
    ar: "تطبيق طقس بـ Flutter يعرض الأحوال الحالية وتوقعات بالساعة لعشرة أيام، وبيانات فلكية، وإشعارات طقس دورية، ودعماً كاملاً للإنجليزية والعربية.",
  },
  description: [
    {
      en: "Weathers shows the weather for any city in the world. After a short onboarding it asks for location permission, or lets the user pick a country and city from a searchable list, then presents the current conditions with wind, humidity, pressure and UV index, the hours ahead, and a 10-day forecast with precipitation, wind and temperature details.",
      ar: "يعرض Weathers الطقس لأي مدينة في العالم. بعد تعريف قصير يطلب إذن الموقع أو يتيح اختيار الدولة والمدينة من قائمة قابلة للبحث، ثم يعرض الأحوال الحالية مع الرياح والرطوبة والضغط ومؤشر الأشعة فوق البنفسجية، والساعات القادمة، وتوقعات عشرة أيام بتفاصيل الهطول والرياح ودرجة الحرارة.",
    },
    {
      en: "It also covers astronomy (sunrise, sunset, moonrise, moonset and moon phase), temperature units, light and dark themes, and a language switch between English and Arabic. A background service can send a weather notification on a timer from every half hour to once a day, and the app handles offline and error states with dedicated animations.",
      ar: "ويشمل المعلومات الفلكية (الشروق والغروب وطلوع القمر وغروبه ومرحلته)، ووحدات الحرارة، والمظهرين الفاتح والداكن، ومفتاح اللغة بين الإنجليزية والعربية. وتستطيع خدمة في الخلفية إرسال إشعار طقس بمؤقّت من كل نصف ساعة إلى مرة يومياً، ويعالج التطبيق حالات انعدام الاتصال والأخطاء برسوم متحركة مخصّصة.",
    },
  ],
  highlights: [
    {
      title: { en: "Features", ar: "الميزات" },
      items: [
        { en: "Current conditions, hourly forecast and a 10-day forecast.", ar: "الأحوال الحالية وتوقعات بالساعة وتوقعات عشرة أيام." },
        { en: "Wind, humidity, pressure, UV index and precipitation panels.", ar: "لوحات للرياح والرطوبة والضغط ومؤشر UV والهطول." },
        { en: "Astronomy: sunrise, sunset, moonrise, moonset and moon phase.", ar: "معلومات فلكية: الشروق والغروب وطلوع القمر وغروبه ومرحلته." },
        { en: "City from device location, or country and city search.", ar: "المدينة من موقع الجهاز، أو بحث بالدولة والمدينة." },
        { en: "Periodic weather notifications (every 30 minutes up to daily) from a background service.", ar: "إشعارات طقس دورية (من ٣٠ دقيقة إلى يومياً) من خدمة في الخلفية." },
      ],
    },
    {
      title: { en: "Engineering", ar: "الهندسة" },
      items: [
        { en: "GetX for state, routing and dependency injection; bindings and controllers per screen.", ar: "GetX للحالة والتوجيه وحقن الاعتماديات؛ مع bindings وcontrollers لكل شاشة." },
        { en: "Weather data over HTTP from WeatherAPI, with an Either-style result type for loading, offline and error states.", ar: "بيانات الطقس عبر HTTP من WeatherAPI، مع نوع نتيجة على نمط Either لحالات التحميل وانعدام الاتصال والأخطاء." },
        { en: "Local persistence with Hive and shared preferences; network-status listener and Lottie states.", ar: "تخزين محلي بـ Hive وshared preferences؛ ومراقب لحالة الشبكة وحالات Lottie." },
        { en: "English and Arabic translations with RTL, light and dark themes, responsive sizing with flutter_screenutil.", ar: "ترجمات عربية وإنجليزية مع RTL، ومظهران فاتح وداكن، وقياسات متجاوبة بـ flutter_screenutil." },
      ],
    },
  ],
  stack: ["Flutter", "Dart", "GetX", "Hive", "WeatherAPI", "Lottie", "Local notifications"],
  links: [{ label: { en: "View source", ar: "عرض الشيفرة" }, url: "https://github.com/Raghdkun/weathers", kind: "repo" }],
  cover: { src: "/projects/weathers/logo.webp", w: 640, h: 640, alt: { en: "Weathers app logo", ar: "شعار تطبيق Weathers" } },
  gallery: [],
};
