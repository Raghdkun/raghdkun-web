# Plan: Frame 3 — Work (Street Lamp + Scroll-Reveal Projects)

## TL;DR
Frame 3 extends the visual language of frames 1–2: the lightbulb becomes a street
lamp. Scene starts zoomed into the lamp head → scroll turns it on (emissive glow) →
zoom out + drift left → 4 project entries reveal one-by-one on the right side.
Fully scroll-driven via `workProgressRef` (no clicks), zero conflict with ScrollTrigger.

**GLB**: `/public/street_lamp_02_4k.blend/street_lamp_02_4k.glb`

---

## Scroll Geometry

```
rawProgress = wrappedProgress × lastIndex   (= wrappedProgress × 6)
workProgressRef = clamp(rawProgress − 2, 0, 1)
```

| workRef | What happens |
|---------|-------------|
| 0.00    | Frame 3 entered — lamp zoomed in close, bulb dark |
| 0.00–0.15 | Lamp turns on — emissive intensity 0 → 2.5 |
| 0.00–0.50 | Zoom out: scale 22 → 8, x: 0 → −0.75 |
| 0.25    | Project 1 slides in from right |
| 0.45    | Project 2 slides in |
| 0.50    | Lamp settled on left, gentle idle sway begins |
| 0.63    | Project 3 slides in |
| 0.80    | Project 4 slides in — all 4 visible |
| 1.00    | End of frame 3; transitions to frame 4 |

---

## Phase 1 — `LampCanvas.tsx` (new, mirrors BulbCanvas)

1. `useGLTF` + `scene.clone(true)` (same as BulbCanvas)
2. Traverse mesh on mount — store ref to bulb/glass mesh for emissive
3. `useFrame` driven by `workRef`:
   - ease = `1 − (1 − clamp(phase/0.5, 0, 1))³`
   - Scale: lerp → `22 − ease × 14`
   - position.x: lerp → `ease × −0.75`
   - bulb emissiveIntensity: lerp → `clamp(phase/0.15, 0, 1) × 2.5`
   - After phase > 0.5: `sin(t × 0.4) × 0.03` idle sway
4. Warm amber point light near lamp head `#ffe0a2`
5. Canvas: `pointer-events-none absolute inset-0 z-10`, fov 33

---

## Phase 2 — `WorkFrame.tsx` (new)

6. Wood-plank bg + `bg-black/40` + radial vignette (same as frames 1–2)
7. Label `"WORK"` top-left: `text-[#ffd37a] text-xs font-semibold tracking-[0.35em]`
8. `<LampCanvas workRef={workProgressRef} />`
9. Right-side project overlay:
   - 4 entries, initial `autoAlpha: 0`
   - RAF reads `workProgressRef`, thresholds `[0.25, 0.45, 0.63, 0.80]`
   - Each entry: `gsap.fromTo({ xPercent: 18 } → { xPercent: 0, autoAlpha: 1, 0.55s })`
   - Per-entry: year / title / one-liner, left gold border `border-l-2 border-[#ffd37a]/30`
10. 4 progress dots bottom-right — gold fill when revealed

---

## Phase 3 — FrameScroller wiring

11. Add `workProgressRef = useRef(0)` alongside introZoomRef/aboutZoomRef
12. In onUpdate: `workProgressRef.current = clamp(rawProgress − 2, 0, 1)`
13. Pass `workProgressRef` to `<FramePanel>`

---

## Phase 4 — FramePanel wiring

14. Add `workProgressRef?` to props + fallback ref
15. Work branch → `<WorkFrame workProgressRef={...} />`

---

## Phase 5 — frames.ts

16. `"Frame 3"` → `"Work"`

---

## Phase 6 — Puppeteer test

17. Frame 3 snap test at ~13664 → verify `frame 3 / 7`

---

## Relevant Files
- `app/components/LampCanvas.tsx` — NEW
- `app/components/WorkFrame.tsx` — NEW
- `app/components/FramePanel.tsx` — add workProgressRef + work branch
- `app/components/FrameScroller.tsx` — workProgressRef + onUpdate
- `app/lib/frames.ts` — title
- `scripts/test-snap.mjs` — frame 3 test

---

## Verification
1. Scroll to frame 3 — lamp visible, zoomed in, dark bulb
2. Scroll slowly — lamp glows, zooms out, drifts left
3. Projects 1→4 appear at correct thresholds
4. `node scripts/test-snap.mjs` — all pass
5. `pnpm lint && pnpm build` — zero errors

---

## Excluded Scope
- Real project images (placeholder data only)
- Click-to-expand project details
- Touch swipe
- Frames 4–7
