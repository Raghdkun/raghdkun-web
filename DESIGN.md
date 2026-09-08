# Design System: Raghdkun Portfolio

## Visual Theme & Atmosphere

Dark operator console. Midnight navy surfaces, one electric blue accent, monospace labels with wide tracking, HUD corner frames and faint scanlines. The mood is a control room at night: calm, precise, alive with small signals. Depth comes from tinted panels and blue glow, never from grey drop shadows.

Register: brand (portfolio). Single page, long scroll, section dividers labelled like log entries (`01 // ABOUT`).

## Color Palette & Roles

All colours are OKLCH. Neutrals are tinted toward hue 258 to 260 (blue), never pure grey or pure black.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `oklch(0.10 0.045 260)` | Page ground |
| `--card` | `oklch(0.14 0.05 260)` | Lifted panels |
| `--muted` | `oklch(0.17 0.045 258)` | Subtle fills, tracks |
| `--foreground` | `oklch(0.96 0.02 240)` | Primary text |
| `--muted-foreground` | `oklch(0.7 0.03 250)` | Secondary text |
| `--primary` | `oklch(0.76 0.18 255)` | The accent. Links, CTAs, active states, glow, corner frames |
| `--primary-foreground` | `oklch(0.08 0.04 260)` | Text on primary fills |
| `--border` | `oklch(0.4 0.14 258)` | Structural lines (usually used at 10 to 50% alpha) |
| `--ring` | same as primary | Focus rings |
| `--glow` | `oklch(0.76 0.2 255)` | Box-shadow glow colour |
| `--destructive` | `oklch(0.6 0.23 25)` | Errors only |

Semantic status colours (emerald for available, amber for remote/warning) appear only inside status chips. No cyan, purple or gradient text anywhere. Colour strategy: Committed. Blue carries 30 to 40% of the surface through borders, glows, labels and fills.

Opacity ladder for the accent: `/5` fills, `/10` hover fills, `/20` resting borders, `/40` active borders, `/60` corner frames, `/100` text and CTAs.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display (`--font-display`) | Space Grotesk 400/500/700 | Headings, all-caps, `letter-spacing: 0.05em`, `line-height: 0.9` on hero |
| Body and labels (`--font-mono-display`) | JetBrains Mono 400/500/700 | Body text, mono labels with `tracking-[0.2em]` to `[0.4em]` |
| Arabic (`--font-arabic-tech`) | IBM Plex Sans Arabic 400 to 700 | Swapped in under `[dir="rtl"]` |

Scale: hero `text-4xl / sm:text-6xl / lg:text-8xl`; section H2 `text-3xl / sm:text-4xl`; card H3 `text-xl`; body `text-sm / sm:text-base` with `leading-relaxed`; labels `text-[10px]` to `text-xs`, never below 11px on mobile for readable content. Tabular numerals on all stats.

## Component Stylings

- **Panels (GlowContainer, DataCard, FeatureCard, BentoGrid)**: `rounded` (0.5rem), `border-primary/20` resting, `border-primary/40` hover, `bg-card/60` to `/80`, 2.5 to 4px corner-frame ticks in `border-primary/40` to `/60`, scanline overlay at 3% black.
- **Buttons**: shadcn `Button`. Primary is filled `bg-primary text-primary-foreground`; outline is `border-primary/40 text-primary`. All get `active:scale-[0.98]`, 160ms transform ease-out, `focus-visible:ring-[3px] ring-ring/50`. Minimum 44px hit area on touch.
- **Chips**: `rounded-full`, mono, `text-[9px]` to `[10px]`, uppercase, `tracking-widest`. Success and warning variants for status only.
- **Dividers**: labelled `Divider` with `glow` or `circuit` variants; the label sits in `text-foreground/30` mono at 9 to 10px.
- **Project cards**: 16:10 screenshot with top-aligned crop, gradient scrim from `background/95` to transparent, tag chip and LIVE badge top-left/right, mono role label, stack chips, footer link row. Whole card is the link. 3D tilt only on fine pointers at 1024px and up.
- **Marquee**: `subtle` variant, slow, pauses on hover, falls back to a wrapped chip list on mobile.

## Layout Principles

- Container `max-w-7xl`, gutters `px-4 / sm:px-6 / lg:px-8`. Contact uses `max-w-5xl`.
- Sections `py-20 / sm:py-28`. Section = labelled divider, then heading row, then content grid.
- Asymmetric two-column grids on desktop (`lg:grid-cols-[1.4fr_1fr]`, `[1fr_1.2fr]`, `[1.2fr_1fr]`) that collapse to one column below `lg`.
- Projects: `md:grid-cols-2 lg:grid-cols-3`, first card spans two columns on desktop.
- Sticky header with backdrop blur; mobile menu is a full-width panel under the header.

## Motion

- GSAP + ScrollTrigger, Lenis smooth scroll on fine-pointer devices only.
- Reveals use `clip-path` inset wipes plus small `y` (12 to 18px), 0.7 to 0.75s, `power2.out`, stagger 0.06 to 0.07s, `once: true`. No opacity-from-zero reveals (content must stay visible if JS fails).
- Hero: per-character clip reveal on the title, scramble/decode on the subtitle and section headings.
- Hover: colour and border changes at 200 to 300ms; image scale 1.04 at 700ms; sweep highlight on cards.
- Everything is disabled under `prefers-reduced-motion: reduce`.

## Iconography

Lucide (stroke 1.5 to 2) at `size-3` to `size-4`, always in a bordered `bg-primary/10` square on cards. Brand icons (GitHub, Instagram) are inline SVG. No emoji as icons.
