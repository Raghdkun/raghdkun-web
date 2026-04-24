import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroller from "./components/SmoothScroller";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./lib/i18n";

const monoDisplay = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-display",
  weight: ["400", "500", "700"],
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
  display: "swap",
});

const arabicTech = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-tech",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070b1a",
};

export const metadata: Metadata = {
  title: "Raghdkun — Fullstack Engineer · As Suwayda, Syria",
  description:
    "Fullstack engineer building polished web, mobile and AI-powered interfaces. React, Next.js, Laravel, Flutter, n8n & Dify. Available part-time and freelance, remote from As Suwayda, Syria.",
  metadataBase: new URL("https://raghdkun.dev"),
  keywords: [
    "Raghdkun",
    "Fullstack engineer",
    "Frontend engineer",
    "Next.js",
    "React",
    "Laravel",
    "Flutter",
    "n8n",
    "Dify",
    "AI workflows",
    "As Suwayda",
    "Syria",
    "Remote developer",
  ],
  authors: [{ name: "Raghdkun", url: "https://raghdkun.dev" }],
  creator: "Raghdkun",
  alternates: { canonical: "https://raghdkun.dev" },
  openGraph: {
    title: "Raghdkun — Fullstack Engineer",
    description:
      "Fullstack engineer · React, Next.js, Laravel, Flutter, n8n + Dify. Remote from As Suwayda, Syria.",
    url: "https://raghdkun.dev",
    siteName: "raghdkun",
    locale: "en_US",
    type: "website",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghdkun — Fullstack Engineer",
    description:
      "React · Next.js · Laravel · Flutter · AI workflows. Remote from As Suwayda, Syria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monoDisplay.variable} ${display.variable} ${arabicTech.variable} antialiased`}>
        <LanguageProvider>
          <a href="#main-content" className="skip-nav">
            Skip to content
          </a>
          <ErrorBoundary>
            <SmoothScroller>{children}</SmoothScroller>
          </ErrorBoundary>
        </LanguageProvider>
      </body>
    </html>
  );
}
