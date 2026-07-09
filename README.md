# Handoff: Humble Audacity — Strategic Clarity Consulting

A five-page marketing site for **Humble Audacity**, the strategic-clarity consulting
practice of Roberto Chavarria. Warm-editorial in tone: a soft sand-paper ground,
a literary serif for headlines, a deep-navy accent ("the audacity"), and quiet
mono labels. One of three sibling brands under the personal brand *Roberto Chavarria*;
this bundle follows a shared family design standard (see **Family design standard** below).

---

## About the design files

The files in this bundle are **design references built in plain HTML/CSS/JS** — a
working prototype of the intended look, content, and behavior. They are **not meant
to be shipped as-is**. Your task is to **recreate these pages in the target codebase's
environment** (Next.js, Astro, a CMS theme, etc.) using its established patterns,
component model, and asset pipeline. If no codebase exists yet, pick the framework
that best fits a small, content-driven marketing site (a static-site generator or
Next.js/Astro are natural fits) and implement the designs there.

Everything here is self-contained and runs with no build step — open `index.html`
in a browser, or serve the folder (`npx serve .`) to click through all five pages.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interactions. Recreate
the UI faithfully. All design tokens are centralized in `styles.css` `:root` — port
them as your design tokens / theme rather than hard-coding values.

---

## Files

```
index.html        Home
approach.html     The Approach (includes the animated "climbing line" section)
about.html        About Roberto
work.html         Ways to Work Together (three engagement cards)
contact.html      Let's Talk (contact page, has page-local <style> block)
styles.css        ALL shared styles + design tokens (:root). Every page links this.
site.js           Shared behavior (nav, mobile menu, scroll reveals, climbing-line SVG)
images/           The 6 images actually used across the site
README.md         This document
```

**Shared chrome** (identical markup on every page, drive it from one component/partial):
- `<nav id="nav">` — fixed top bar: brand lockup + links + CTA pill
- `<footer>` — three-column footer + base bar
- `<div class="quote">` — navy full-bleed pull-quote (home + contact)
- `.page-cta` — closing call-to-action section (all pages)

> **Note on `index.html`:** during design we layered an interactive "Tweaks" panel
> (React/Babel) over the home page to explore mood variations. That overlay has been
> **removed from this bundle** — it was a design-exploration tool, not part of the
> site. The home page here is the clean, shipping version and renders identically.

---

## Family design standard

These patterns are shared across all three sibling brands. Keep them consistent:

1. **Eyebrow / kicker → pill chip.** Every small label above a headline is a
   fully-rounded outline chip with a leading navy dot, in mono caps. Class `.eyebrow`.
2. **Buttons → pills.** Fully-rounded (`border-radius: 999px`). Primary = filled navy
   (`.btn`); secondary = outline (`.btn.ghost` / `.nav-cta`). Keep the `→` arrow,
   which nudges right on hover.
3. **Label layer in mono.** Nav items, lockup subtitle, eyebrows, section numbers,
   captions, footer headings — all **IBM Plex Mono**, uppercase, letter-spaced.
   The serif is reserved for headlines and the one italic accent phrase.
4. **The lockup.** "Humble *Audacity*" in Newsreader (with "Audacity" navy italic)
   over "STRATEGIC CLARITY CONSULTING" in mono caps.
5. **The accent phrase.** A single Newsreader serif-italic phrase in navy is the
   family signature (e.g. "to change *something.*" in the hero `<em>`).

---

## Design tokens

All defined in `styles.css` `:root`. **Port these as your theme — never hard-code the raw values.**

### Color
| Token | Value | Role |
|---|---|---|
| `--bg` | `#F1E7D4` | Warm sand — page ground |
| `--bg-2` | `#E7DAC1` | Slightly deeper sand — cards, panels |
| `--ink` | `#1E1915` | Near-black warm ink — body text, navy-quote ground |
| `--ink-soft` | `#5A5046` | Muted ink — secondary text, labels |
| `--accent` | `#2B4C6F` | Deep navy — *the audacity*; links, accents, dots, fills |
| `--accent-deep` | `#1E3A56` | Darker navy — primary-button hover |
| `--line` | `rgba(30,25,21,0.14)` | Hairline borders |
| `--line-soft` | `rgba(30,25,21,0.08)` | Fainter hairline |
| `#7CA7D4` | (literal) | Light-blue accent **on the dark navy quote/flag card only** |

A faint SVG fractal-noise overlay (`body::after`, `opacity:0.05`, `mix-blend-mode:multiply`)
gives the whole page a subtle paper grain. Keep it — it's part of the warmth.

### Type
| Token | Stack | Use |
|---|---|---|
| `--serif` | `"Newsreader", Georgia, serif` | Headlines, leads, pull-quote, accent phrase |
| `--sans` | `"Hanken Grotesk", -apple-system, sans-serif` | Body copy, buttons |
| `--mono` | `"IBM Plex Mono", monospace` | All labels/eyebrows/nav/captions, uppercase + letter-spaced |

Google Fonts loaded per page: Newsreader (italic, opsz 6–72, wght 300–600),
Hanken Grotesk (400/500/600), IBM Plex Mono (400/500).

Display headings use light serif weights (`330–440`) and tight tracking
(`-0.02em` to `-0.015em`), sized with `clamp()` for fluid scaling. Headline italic
`<em>` is always navy (`--accent`).

### Spacing / radius / motion
- Content width: `.wrap` = `max-width: 1180px`, side padding `40px` (→ `24px` ≤860px).
- Section rhythm: `section` = `92px` vertical padding (`.tight` = `66px`).
- Radii: pills `999px`; cards/images `4–5px`. Borders are `1px` hairlines using `--line`.
- Reveal-on-scroll: `.reveal` fades/translates up `26px` over `0.9s`
  `cubic-bezier(.16,1,.3,1)`; `[data-stagger]` items add an `0.08s × index` delay.
- Buttons/links transition `0.25s ease`; arrows translate `4–5px` on hover.
- All animation respects `@media (prefers-reduced-motion: reduce)`.

---

## Pages & key sections

### `index.html` — Home
- **Hero** (`.hero`): two-column grid (`1.4fr / 0.82fr`) — text left, portrait right
  (`images/portrait-web.jpg`). Eyebrow pill → two-line serif `<h1>` (lines slide up
  on load) with the navy-italic accent "something." → serif sub-paragraph → primary
  pill button + text link. Below the grid, a hand-drawn **rising-line SVG** (`.risingline`)
  strokes itself in on load, ending in a navy dot.
- **01 — Where you might be right now** (`#signs`): six "problem" statements in a
  2-col grid with hairline dividers, each a mono `↗` mark + serif `<h3>` + muted line.
- **Pull quote** (`.quote`): full-bleed navy band — "The clarity to see the whole,
  and the *nerve* to go for it." with mono cite.
- **02 — What it is** (`#what-teaser`): serif lead + body + text link.
- **Closing CTA** (`.page-cta`) + footer (footer here uniquely includes the discreet
  **"A practice of Roberto Chavarria ↗"** link → robertochavarria.com — see below).

### `approach.html` — The Approach
- **Masthead** (`.masthead`): eyebrow pill + serif `<h1>` + serif standfirst + rising line.
  This masthead pattern (eyebrow → big serif head → standfirst) is reused on about/work/contact.
- **What it is** section.
- **Photo band** (`.photoband`, `images/workshop-web.jpg`) with a mono caption.
- **The shape of the work** (`#shape`): the signature **climbing-line** section — four
  `.step` cards on an ascending diagonal (each steps up `-46px`) connected by an SVG path
  that `site.js` draws dynamically through the dots (disabled ≤860px, where steps stack
  into a vertical timeline).
- Second photo band (`images/facilitating-1-web.jpg`) + closing CTA + footer.

### `about.html` — About Roberto
- Masthead.
- **What I bring** (`#bring`): two-column — left is intro (small portrait
  `images/headshot-web.jpg` + serif lead + body); right is a `.ballast` panel
  (mono tag + bordered credential list).
- Photo band (`images/facilitating-2-web.jpg`).
- **Who it's for** (`#fit`): section head + body + a `.duo` two-column "good fit /
  not the right fit" split with a hairline divider.
- Closing CTA + footer.

### `work.html` — Ways to Work Together
- Masthead.
- **Engagements** (`#engagements`): three `.card`s in a 3-col grid — "The Counsel",
  "The Read", and the flagship **"The Leap"** (`.card.flag`, dark navy with a
  "Flagship" mono badge). Cards lift on hover. Each: mono label, serif title, italic
  subtitle, body, and a bordered "Best for" footer.
- Photo band (`images/facilitating-1-web.jpg`) + "How it starts" section + CTA + footer.

### `contact.html` — Let's Talk
- Masthead (headline only).
- **Contact** two-column (`.contact-grid`, defined in a page-local `<style>` block):
  left = serif lead + body + mailto pill button; right = `.contact-card`
  (portrait `images/portrait-web.jpg` + Email / What to expect / Who I work with rows).
- Pull quote + footer.

---

## Interactions & behavior (`site.js`)

- **Sticky nav border:** `#nav` gains class `scrolled` (adds a bottom hairline) once
  `scrollY > 30`.
- **Mobile menu:** `.nav-toggle` toggles `body.menu-open`; the hamburger animates to
  an X and `.nav-links` slides down as a panel (≤980px). Links close it on click.
- **Active nav link:** marked by matching the current filename; gets an underline accent.
- **Scroll reveals:** an `IntersectionObserver` (threshold `0.16`) adds `.in` to
  `.reveal` elements as they enter; `[data-stagger]` children within `.problems` and
  `.cards` get incremental `--d` delays.
- **Climbing line** (approach page): on entering view, `site.js` measures the four
  `.step .dot` centers, builds a smooth SVG path threading them, and animates the stroke
  drawing over ~2.4s. Rebuilds on resize; disabled ≤860px; instant if reduced-motion.

### Footer "practice of" link
Add the discreet family-standard link in the footer brand column — quiet mono, not
prominent — linking to the parent personal brand:
```html
<a class="foot-practice" href="https://robertochavarria.com">A practice of Roberto Chavarria <span class="arr">↗</span></a>
```
In this bundle it currently appears on `index.html`. When you template the footer, render
it on **every** page.

---

## Responsive behavior

Breakpoints in `styles.css`: **980px** (nav collapses to mobile menu; footer → 2-col),
**900px** (hero stacks), **860px** (tighter padding; climbing line → vertical timeline;
cards/duo/problems stack; contact grid stacks), **560px** (footer → 1-col; about intro stacks).
Mobile-first port recommended.

---

## Assets

All in `images/`, supplied by the client (photos of Roberto Chavarria; the round avatar
is his headshot). Six images, each referenced by the pages:

| File | Used on | Role |
|---|---|---|
| `portrait-web.jpg` | index hero, contact card | Primary portrait |
| `headshot-web.jpg` | about intro | Small portrait |
| `roberto-round.png` | all footers | Round avatar in footer lockup |
| `workshop-web.jpg` | approach | Photo band |
| `facilitating-1-web.jpg` | approach, work | Photo band |
| `facilitating-2-web.jpg` | about | Photo band |

Optimize/resize for production as your pipeline dictates. No icon set is used —
the only glyphs are typographic arrows (`→`, `↗`, `↗` marks) set in text.

## What was intentionally excluded

To keep this lean: design screenshots, raw/original full-resolution source photos and
duplicates, unused image variants, and the React/Babel "Tweaks" design-exploration
overlay (and its two `.jsx` files). None are needed to rebuild the site.
