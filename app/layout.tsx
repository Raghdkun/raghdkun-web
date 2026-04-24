import type { Metadata } from "next";
import { Playfair_Display, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroller from "./components/SmoothScroller";
import ErrorBoundary from "./components/ErrorBoundary";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raghdkun — Full Stack Developer",
  description:
    "Portfolio of Raghdkun — Full Stack Developer crafting cinematic digital experiences across Web, Mobile & Cloud.",
  metadataBase: new URL("https://raghdkun.dev"),
  openGraph: {
    title: "Raghdkun — Full Stack Developer",
    description:
      "Crafting cinematic digital experiences across Web, Mobile & Cloud.",
    url: "https://raghdkun.dev",
    siteName: "Raghdkun",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Raghdkun — Full Stack Developer",
    description:
      "Crafting cinematic digital experiences across Web, Mobile & Cloud.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <ErrorBoundary>
          <SmoothScroller>{children}</SmoothScroller>
        </ErrorBoundary>
      </body>
    </html>
  );
}
