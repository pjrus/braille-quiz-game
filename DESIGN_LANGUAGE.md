# Braille Quiz — Design Language

A flat-color redesign of the Braille Character Quiz Game. No gradients,
no glassmorphism, no blurred translucency. Solid surfaces, crisp borders,
and a single accent color drive the visual identity.

> Source rewrite: Vite + React → **Next.js (App Router) + TypeScript**.
> This document is the source of truth for every color, spacing, and
> component decision in the new app.

---

## 1. Principles

1. **Flat by default.** Every fill is a single solid color. `linear-gradient`,
   `radial-gradient`, `conic-gradient`, and `backdrop-filter` are forbidden.
2. **One accent.** A single accent color carries brand identity. Users can
   cycle between six accents, but only one is active at a time.
3. **Contrast over decoration.** Hierarchy comes from size, weight, and
   contrast — never from shine, glow, or blur.
4. **Token-driven.** All colors, radii, and spacing live as CSS custom
   properties so themes (light/dark) and accents swap without code changes.
5. **Accessible & responsive.** Honors `prefers-reduced-motion`, supports
   keyboard, and works from 320px up to widescreen desktops.

---

## 2. Color System

All colors are opaque hex values (light) or opaque dark values (dark).
No `rgba`/`hsla` translucency for surfaces — use solid tokens instead.

### 2.1 Neutral surfaces (light theme)

| Token              | Value     |用途                       |
| ------------------ | --------- | ------------------------- |
| `--bg-page`        | `#FFFFFF` | Page background           |
| `--bg-surface`     | `#F5F5F7` | Cards, panels             |
| `--bg-sunken`      | `#EBEBEF` | Inputs, wells, insets     |
| `--bg-hover`       | `#E4E4EA` | Hover surface             |
| `--bg-inset`       | `#F0F0F3` | Braille grid well         |
| `--border`         | `#D9D9DF` | Default 1px borders       |
| `--border-strong`  | `#B8B8C0` | Hover / focus borders     |
| `--text-primary`   | `#1A1A1F` | Primary text              |
| `--text-secondary` | `#4A4A52` | Labels, captions          |
| `--text-tertiary`  | `#6E6E76` | Muted helper text         |
| `--text-inverse`   | `#FFFFFF` | Text on accent fills       |

### 2.2 Neutral surfaces (dark theme)

| Token              | Value     | 用途                      |
| ------------------ | --------- | ------------------------- |
| `--bg-page`        | `#0E0E12` | Page background           |
| `--bg-surface`     | `#16161C` | Cards, panels             |
| `--bg-sunken`      | `#1E1E26` | Inputs, wells, insets     |
| `--bg-hover`       | `#26262F` | Hover surface             |
| `--bg-inset`       | `#1A1A22` | Braille grid well         |
| `--border`         | `#2E2E38` | Default 1px borders       |
| `--border-strong`  | `#45454F` | Hover / focus borders     |
| `--text-primary`   | `#F4F4F6` | Primary text              |
| `--text-secondary` | `#C0C0C8` | Labels, captions          |
| `--text-tertiary`  | `#9A9AA2` | Muted helper text         |
| `--text-inverse`   | `#0E0E12` | Text on accent fills      |

> Use `color-scheme: light` by default and switch it to `dark` with the
> `data-theme` attribute so native controls match the active theme.

### 2.3 Accent palettes (one active at a time)

Set via `data-accent="<name>"` on `<html>`. Each accent exposes four
flat, opaque tokens. **No light/dark variants of the accent itself** —
we instead pair accent + neutral surface for contrast.

| Accent    | `--accent` | `--accent-strong` | `--accent-text` | `--accent-surface` |
| --------- | ---------- | ----------------- | ---------------- | ------------------ |
| purple    | `#7C3AED`  | `#6D28D9`         | `#FFFFFF`        | `#EDE9FE`          |
| teal      | `#0D9488`  | `#0F766E`         | `#FFFFFF`        | `#CCFBF1`          |
| emerald   | `#059669`  | `#047857`         | `#FFFFFF`        | `#D1FAE5`          |
| amber     | `#D97706`  | `#B45309`         | `#FFFFFF`        | `#FEF3C7`          |
| rose      | `#E11D48`  | `#BE123C`         | `#FFFFFF`        | `#FFE4E6`          |
| blue      | `#2563EB`  | `#1D4ED8`         | `#FFFFFF`        | `#DBEAFE`          |

- `--accent` → primary buttons, active nav indicator, active braille dots.
- `--accent-strong` → pressed/hover state of accent fills.
- `--accent-text` → text color painted on top of `--accent` (always flat).
- `--accent-surface` → soft flat tint for accent chips / info wells
  (used directly, **not** as an alpha blend).

In dark theme, soften `--accent-surface` to a dark flat tone:

| Accent    | Dark `--accent-surface` |
| --------- | ----------------------- |
| purple    | `#2A2342`               |
| teal      | `#102E2C`               |
| emerald   | `#0C2A1C`               |
| amber     | `#34260F`               |
| rose      | `#3A1620`               |
| blue      | `#16244A`               |

### 2.4 Status colors

Flat, used for feedback states, never as primary brand.

| Token            | Light     | Dark      | Meaning       |
| ---------------- | --------- | --------- | ------------- |
| `--success`      | `#15803D` | `#22C55E` | Correct answer|
| `--success-surf` | `#DCFCE7` | `#0C2A1C` | Correct well  |
| `--danger`       | `#B91C1C` | `#F87171` | Wrong answer  |
| `--danger-surf`  | `#FEE2E2` | `#3A1620` | Wrong well    |
| `--warning`      | `#B45309` | `#FBBF24` | Low time      |

---

## 3. Typography

- System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Monospace for braille unicode: `"SFMono-Regular", ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
- Page `<h1>`: 2rem / 700. Section `<h2>`: 1.5rem / 650. `<h3>`: 1.15rem / 600.
- Body: 1rem / 1.6 line-height. Helper text: 0.875rem.
- Headings use `text-wrap: balance` to prevent widows.
- Tabular numerals (`font-variant-numeric: tabular-nums`) on score, timer, and stats so digits don't shift.

---

## 4. Spacing & Layout

4-point scale as CSS variables:

```
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-7: 32px;  --space-8: 40px;
--space-9: 48px;  --space-10: 64px;
```

- Sidebar: fixed 240px wide; collapses to 64px (icons only). Below 768px it slides off-canvas.
- Main content: `margin-left` tracks sidebar width; centered `max-width: 880px`.
- Page padding: `--space-6` desktop, `--space-4` tablet, `--space-3` mobile.

---

## 5. Radii & Elevation

No shadows-as-decoration. A single hairline border separates surfaces.
Shadows are reserved for floating layers (mobile drawer, dropdown menu).

```
--radius-1: 6px;
--radius-2: 10px;
--radius-3: 14px;
--radius-pill: 9999px;

--shadow-1: 0 1px 2px rgba(0,0,0,0.08), 0 1px 1px rgba(0,0,0,0.04);
--shadow-2: 0 6px 16px rgba(0,0,0,0.16);   /* drawer/poster only */
```

Active braille dots use a flat `--accent` fill + 1px `--border` — no glow.

---

## 6. Motion

- Default transition: `color, background-color, border-color, transform` — 180ms `cubic-bezier(0.4, 0, 0.2, 1)`. **Never** `transition: all`.
- Feedback toast: fade + 4px upward translate, 160ms.
- `@media (prefers-reduced-motion: reduce)` disables all transitions and animations.
- Timer pulse below 10s uses opacity keyframes (disabled under reduced motion).

---

## 7. Components

| Component         | Notes                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| Sidebar nav       | Flat surface, 1px right border. Active item: flat `--accent` fill + `--accent-text`. |
| Theme/Accent toggles | 44px circle buttons, flat surface, hairline border, labeled icon.                 |
| Braille grid      | Flat `--bg-inset` well, 1px border. Active dots: flat `--accent`, `scale(1.05)`.     |
| Option buttons    | Flat `--bg-surface`, 1.5px `--border-strong`. Hover: invert to `--text-primary` fill. Selected: flat accent fill. |
| Primary button    | Flat `--accent` fill, `--accent-text`, hover `--accent-strong`.                      |
| Cards / panels    | Flat `--bg-surface`, 1px `--border`, `--radius-3`. No shadow on the page body.      |
| Feedback banner   | Flat `--success-surf`/`--danger-surf`, 1px status border, status text color.        |

---

## 8. Rules of Thumb (what changed from the old design)

- `linear-gradient(...)` → single solid color
- `backdrop-filter: blur(...)` → removed
- `rgba(bg, 0.95)` translucent surfaces → opaque tokens
- Glow / `box-shadow` halos on dots → flat fill + hairline border
- Gradient text (`background-clip: text`) → solid `--text-primary`
- Hover lift (`translateY(-3px)` + glow shadow) → subtle border darkening
