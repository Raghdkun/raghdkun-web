"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame";
import { useLanguage } from "./lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main
      id="main-content"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <HUDCornerFrame position="top-left" size={48} />
      <HUDCornerFrame position="top-right" size={48} />
      <HUDCornerFrame position="bottom-left" size={48} />
      <HUDCornerFrame position="bottom-right" size={48} />

      <div className="relative max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
          {t.notFound.code}
        </p>
        <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-8xl">
          404
        </h1>
        <p className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-foreground/90 sm:text-2xl">
          {t.notFound.title}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/65">
          {t.notFound.desc}
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.75} /> {t.notFound.cta}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
