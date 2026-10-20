"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Menu, MessageCircle, X, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnnouncementBar } from "@/components/thegridcn/announcement-bar";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { useLanguage } from "../lib/i18n";
import { EMAIL, GITHUB_URL, INSTAGRAM_URL, NAV_LINKS, WHATSAPP_URL } from "../lib/site";

/** Highlights the landing-page section currently in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function LocaleToggle() {
  const { locale, setLocale, t } = useLanguage();
  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");
  return (
<button
  type="button"
  onClick={toggleLocale}
  aria-label={t.toggleAria}
  lang={locale === "en" ? "ar" : "en"}
  className="press inline-flex h-10 cursor-pointer items-center gap-1.5 rounded border border-primary/30 px-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:h-9"
>
  <Languages className="size-3.5" strokeWidth={1.5} />
  {t.toggleLabel}
</button>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const spy = useActiveSection(SECTION_IDS);
  // On the landing page follow the scroll position; on project pages "Projects" stays current.
  const activeSection = pathname.startsWith("/projects") ? "projects" : spy;

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close the mobile menu on Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar
        text={t.announcement.text}
        variant="highlight"
        icon={<Zap className="size-3" strokeWidth={1.5} />}
        dismissLabel={t.announcement.dismiss}
        action={{ label: t.announcement.action, href: WHATSAPP_URL }}
      />

      {/* ───────── NAVIGATION ───────── */}
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/#hero" className="group flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <div className="flex size-9 items-center justify-center rounded border border-primary/40 bg-primary/10 font-bold text-primary glow-border transition-all">
              RK
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span dir="ltr" className="text-[10px] uppercase tracking-[0.4em] text-foreground/60">
                IDENTITY // 00.RK
              </span>
              <span dir="ltr" className="text-xs font-semibold uppercase tracking-widest text-primary">
                RAGHDKUN
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative py-1 text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-start after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                    isActive ? "text-primary after:scale-x-100" : "text-foreground/60",
                  )}
                >
                  {t.nav[link.key]}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleToggle />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-primary/40 text-primary lg:inline-flex"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-3.5" strokeWidth={1.5} /> {t.nav.whatsapp}
              </a>
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">{t.nav.cta}</a>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
              className="press flex size-10 cursor-pointer items-center justify-center rounded border border-primary/40 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden"
            >
              {menuOpen ? <X className="size-4" strokeWidth={1.5} /> : <Menu className="size-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="border-t border-primary/20 bg-background/95 md:hidden">
            <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === link.id ? "location" : undefined}
                  className="flex min-h-11 items-center rounded border border-transparent px-3 text-xs uppercase tracking-[0.3em] text-foreground/75 hover:border-primary/30 hover:text-primary aria-[current]:text-primary"
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="lg" className="border-primary/40 text-primary">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                    <MessageCircle className="size-4" strokeWidth={1.5} /> {t.nav.whatsapp}
                  </a>
                </Button>
                <Button asChild size="lg">
                  <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.cta}</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
      <footer className="relative border-t border-primary/20 bg-card/40">
        <UplinkHeader
          leftText={t.footer.end}
          rightText={`${t.footer.signal} · ${new Date().getFullYear()}`}
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div dir="ltr" className="font-display text-lg font-bold uppercase text-primary rtl:text-end">RAGHDKUN</div>
            <p className="mt-2 max-w-[40ch] text-xs leading-relaxed text-foreground/60">{t.footer.bio}</p>
            <div className="mt-4"><LocaleToggle /></div>
          </div>
          <nav aria-label="Footer">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.navigate}
            </div>
            <ul className="mt-2 text-xs text-foreground/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-10 items-center hover:text-primary">{t.nav[l.key]}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.channels}
            </div>
            <ul className="mt-2 text-xs text-foreground/70">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  WhatsApp — +963 958 743 823
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  Instagram — @raghd.m4a
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-10 items-center hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">
                  GitHub — @Raghdkun
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {t.footer.stack}
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-foreground/70">
              <li>Next.js 16 // React 19</li>
              <li>Tailwind v4 // shadcn/ui</li>
              <li>Laravel // PHP // Postgres</li>
              <li>Flutter // Dart</li>
              <li>n8n // Dify // Python // Node</li>
              <li>DevOps // CI/CD // IT Solutions</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary/10 px-4 py-4 text-center text-[10px] uppercase tracking-[0.3em] text-foreground/40 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} RAGHDKUN — {t.footer.copyright}
        </div>
      </footer>
  );
}
