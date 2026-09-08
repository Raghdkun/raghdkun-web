"use client";

/**
 * SKILLS — temporarily removed from the landing page (see app/page.tsx).
 * Kept compiled so it can be re-enabled by rendering <SkillsSection /> again.
 */

import { Chip } from "@/components/thegridcn/chip";
import { Divider } from "@/components/thegridcn/divider";
import { EnergyMeter } from "@/components/thegridcn/energy-meter";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { ProgressBar } from "@/components/thegridcn/progress-bar";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { useLanguage } from "../lib/i18n";

const SKILL_VALUES = [94, 92, 90, 86, 84, 80, 82, 86];
const ENERGY_VALUES = [96, 86, 84, 78];

const CHIP_TAGS = [
  "PHP", "Postgres", "MySQL", "REST",
  "n8n", "Dify", "OpenAI", "Stripe",
  "Vercel", "Cloudflare", "Figma", "GSAP",
  "Framer Motion", "i18n", "RTL",
];

export function SkillsSection() {
  const { locale, t } = useLanguage();

  return (
    <section id="skills" className="relative border-t border-primary/10 py-16 sm:py-24">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-scan>
          <Divider label={t.skills.divider} variant="circuit" />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          <GlowContainer data-reveal intensity="sm" hover className="bg-card/60">
            <h2
              key={`skills-${locale}`}
              data-decode
              className="font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              {t.skills.title}
            </h2>
            <p className="mt-2 text-sm text-foreground/60">{t.skills.intro}</p>
            <div className="mt-6 space-y-5">
              {t.skills.skillLabels.map((label, i) => (
                <ProgressBar key={label} label={label} value={SKILL_VALUES[i]} showValue />
              ))}
            </div>
          </GlowContainer>

          <div className="space-y-6">
            <div data-reveal>
              <StatusBar
                leftContent={<span>{t.about.powerLabel}</span>}
                rightContent={<span className="text-primary">{t.about.powerStatus}</span>}
              />
            </div>
            {t.skills.energyLabels.map((label, i) => (
              <div key={label} data-reveal>
                <EnergyMeter label={label} value={ENERGY_VALUES[i]} showValue />
              </div>
            ))}
            <ul data-reveal aria-label="Also working with" className="flex flex-wrap gap-2 pt-2">
              {CHIP_TAGS.map((tag) => (
                <li key={tag}>
                  <Chip>{tag.toUpperCase()}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
