# Product

## Register

brand

## Users

Hiring managers, founders and agency leads evaluating a remote fullstack developer for part-time, freelance or contract work. They arrive from a WhatsApp link, a GitHub profile or a client referral, usually on a phone or a laptop, and decide within about a minute whether to message. A secondary audience is peer developers who land here from GitHub and judge the craft of the site itself.

The job to be done: confirm in one scroll that Raghdkun ships real products (web, mobile, AI automation), see the proof, and reach him through the fastest channel (WhatsApp first, email second).

## Product Purpose

A single-page portfolio for Raghdkun (Raghd Alshoufani), fullstack developer in As Suwayda, Syria. It exists to turn visitors into conversations. Success is a WhatsApp message or email from a qualified lead, and a visitor who leaves believing the site itself is evidence of the engineering standard.

Bilingual (English and Arabic, RTL) because a meaningful share of clients are in the Arabic-speaking market.

## Brand Personality

Precise, kinetic, disciplined.

The voice is an operator console: terminal labels, numbered sections, HUD corner frames, scanlines, one electric blue. It should read as a control room, not a video game. Confident and specific, never loud. Copy uses plain claims backed by shipped work, not adjectives.

## Anti-references

- The generic AI portfolio: centered hero, three icon-title-text cards, purple-to-blue gradient text, Inter everywhere.
- Neon cyberpunk overload: multiple accent colours (cyan, magenta, green) competing, glitch effects on everything, unreadable body text.
- Editorial-serif "studio" aesthetics (italic display serif, cream backgrounds). Considered and rejected; the identity stays technical.
- Template cards with a 1px grey border, drop shadow and a rocket icon.

## Design Principles

1. Practice what you preach. The site must demonstrate the standards it claims: measurable Core Web Vitals, keyboard access, reduced-motion respect, no layout shift, flawless RTL.
2. Every ornament earns its place. HUD frames, scanlines and sweeps are identity, but each one must add hierarchy or rhythm. Where two decorations compete, remove one.
3. One voice, one accent. Electric blue is the only accent. Semantic colours (success, warning) appear only in status chips. No cyan, no purple, no gradient text.
4. Proof over adjectives. Projects carry role, stack, and what shipped. Stats are real counts. Copy states what was built, not how "seamless" it was.
5. Mobile is a first-class terminal. Every section is designed for a 390px phone first, then expanded. Touch targets are 44px, text is never below 12px, nothing hides behind hover.

## Accessibility & Inclusion

- WCAG 2.2 AA: text contrast at least 4.5:1, focus-visible rings on every interactive element, skip link, semantic landmarks.
- `prefers-reduced-motion` disables scroll reveals, marquee and parallax; content is always visible without JS animation.
- Full Arabic RTL layout with an Arabic-capable font; logical properties (`ms-`, `me-`, `start`, `end`) instead of physical left/right where direction matters.
- Touch targets at least 44x44px on mobile. Hover-only affordances are gated behind `(hover: hover) and (pointer: fine)`.
