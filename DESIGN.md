---
name: Kha Dinh — Academic Portfolio
description: Systems security researcher portfolio. Technical precision, editorial depth, personal voice.
colors:
  # Primary accent (OKLCH — project uses OKLCH doctrine; Stitch linter will warn, values are correct)
  reference-blue: "oklch(46% 0.27 264)"
  reference-blue-dark: "oklch(61% 0.22 264)"
  # Light mode neutrals — warm paper stock tint (hue 80), ink stays blue-cast (hue 264)
  page-bg: "oklch(98.5% 0.006 80)"
  page-bg-surface: "oklch(96.5% 0.007 80)"
  ink: "oklch(5% 0.004 264)"
  ink-secondary: "oklch(48% 0.002 264)"
  divider: "oklch(88% 0.004 264)"
  # Dark mode neutrals
  void-dark: "oklch(13% 0.003 264)"
  void-dark-surface: "oklch(21% 0.004 264)"
  ink-on-dark: "oklch(90% 0.002 264)"
  ink-secondary-on-dark: "oklch(62% 0.002 264)"
  divider-dark: "oklch(28% 0.003 264)"
typography:
  display:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: '"MONO" 0.5, "CASL" 0, "slnt" 0'
  headline:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 300
    letterSpacing: "0.14em"
    fontVariation: '"MONO" 0.75, "CASL" 0, "slnt" 0'
  title:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: "-0.005em"
    fontVariation: '"MONO" 0.5, "CASL" 0, "slnt" 0'
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
  sidebar-mono:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "0.02em"
    fontVariation: '"MONO" 1, "CASL" 0, "slnt" 0'
  label:
    fontFamily: "Recursive, monospace"
    fontVariation: '"MONO" 1, "CASL" 0, "slnt" 0'
    fontSize: "0.8125rem"
    fontWeight: 300
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  pub-topic-tag:
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.none}"
    padding: "1px 7px"
  pub-topic-tag-hover:
    textColor: "{colors.reference-blue}"
  filter-btn:
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.none}"
    padding: "3px 10px"
  filter-btn-active:
    textColor: "{colors.reference-blue}"
  link-btn:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0"
  link-btn-hover:
    textColor: "{colors.reference-blue}"
  pub-abbr-badge:
    backgroundColor: "{colors.reference-blue}"
    textColor: "{colors.page-bg}"
    rounded: "{rounded.none}"
    padding: "2px 10px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  nav-link-active:
    textColor: "{colors.reference-blue}"
  pub-entry:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  pub-entry-dark:
    backgroundColor: "transparent"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.none}"
    padding: "8px 0"
---

# Design System: Kha Dinh — Academic Portfolio

## 1. Overview

**Creative North Star: "The Systems Paper — Retro-Modern"**

System built like well-authored academic paper from the 90s USENIX/SIGOPS era, rendered with modern precision. Typography does heavy lifting, structure immediately legible, nothing competes with argument. Recursive carries headings — weight 300, MONO=0.5, CASL=0, no decorative flourish. Section stamps push to MONO=0.75 for typewriter authority. Newsreader handles body: optical-size serif reads like printed editorial at every size. Two fonts constitute the entire visual identity.

Light mode background is warm paper stock (`oklch(98.5% 0.006 80)`) — not blue-cast white. Feels like a printed CMU tech report, not a browser default. Ink and UI elements stay blue-cast (hue 264) for coherence with dark mode. Dark mode is the opposite: deep blue-void, monitor at night.

Color disciplined to single accent: Reference Blue `oklch(46% 0.27 264)`. Appears on links, citations, interactive states — never decoration. Rarity is the point. Blue link in sea of black Newsreader text signals meaning like blue hyperlink in research PDF — precise, functional, expected.

Publication link buttons render as `[pdf]`, `[slides]` — bracket notation from 90s paper conventions. About page header reads like a paper author block: name, affiliation line, provenance metadata.

System explicitly rejects: generic al-folio defaults (white pages, teal accents, uniform card grids), flashy portfolio theatrics (gradient heroes, scroll animations, floating elements), corporate/LinkedIn register (achievement bullets, navy-and-gold safety). Also rejects over-designed academic pages where visual novelty competes with research content. Goal: site feels built by someone who grew up reading SOSP proceedings and now works in 2024.

**Key Characteristics:**
- Typography-led: Recursive / Newsreader pairing is the signature, not the accent color
- Section stamps at MONO=0.75 — typewriter pull for document structure markers
- Light mode background warm paper tint (hue 80); ink blue-cast (hue 264); dark mode blue-void
- Flat surfaces: no shadow vocabulary, no depth theater
- Accent restraint: Reference Blue at ≤10% surface coverage
- 800px max-width: column width chosen for reading, not filling a screen
- Dual-theme first: both light and dark modes designed intentionally, not toggled as afterthought
- Axis-locked: Recursive always set with `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0` (stamps: MONO=0.75)

## 2. Colors: The Reference Palette

One accent, tinted neutrals, two modes. Palette minimal by design — hiring committee reading publication list should focus on titles, not color choices.

### Primary
- **Reference Blue** (`oklch(46% 0.27 264)` light / `oklch(61% 0.22 264)` dark): Sole interactive color. Links, citations, nav active states, hover treatments, focus rings, filter button active state, topic tag hover/active, publication title underline on hover. Never background fill, never decorative stripe. Dark-mode value is lighter to maintain contrast against `void-dark` background.

### Neutral

**Light mode:**
- **Page Background** (`oklch(98.5% 0.006 80)`): Warm paper stock tint. Hue 80 (amber-neutral) — reads like a printed tech report, not a browser default. Not pure white, not blue-cast.
- **Page Surface** (`oklch(96.5% 0.007 80)`): Slightly darker warm tint for code backgrounds and surface elements.
- **Ink** (`oklch(5% 0.004 264)`): Primary text. Near-black with residual blue cast. Ink.
- **Ink Secondary** (`oklch(48% 0.002 264)`): Secondary text, captions, metadata. Author lines, venue abbreviations, dates, filter button labels, topic tag default state. Near achromatic at this lightness.
- **Divider** (`oklch(91% 0.003 264)`): Publication list dividers, section borders, flat-list separators.

**Dark mode:**
- **Void Dark** (`oklch(13% 0.003 264)`): Background. Near-black with residual blue-grey — monitor at night, not void.
- **Void Dark Surface** (`oklch(21% 0.004 264)`): Elevated surface background, footer, code blocks in dark mode.
- **Ink on Dark** (`oklch(90% 0.002 264)`): Primary text on dark backgrounds.
- **Ink Secondary on Dark** (`oklch(62% 0.002 264)`): Secondary text on dark backgrounds.
- **Divider Dark** (`oklch(28% 0.003 264)`): Structural dividers in dark mode.

### Named Rules

**The Reference Rule.** Reference Blue on interactive elements only. No colored section headings, no accent borders, no decorative usage. Eye lands on blue = link or citation. Diluting this signal anywhere dilutes it everywhere.

**The Tinted Neutral Rule.** No raw `oklch(0% 0 0)` or `oklch(100% 0 0)`. Light mode background uses warm paper tint (hue 80, chroma ≥ 0.005). All ink and UI neutrals tilt toward hue 264. The split — warm ground, cool text — mirrors printed paper under fluorescent light. Dark mode stays all-264.

## 3. Typography: Recursive + Newsreader

**Display/Heading Font:** Recursive (with system-ui, sans-serif fallback) — variable font, MONO=0.5, CASL=0, slnt=0
**Body Font:** Newsreader (with Georgia, serif fallback)
**Sidebar Mono Font:** Recursive MONO=1, CASL=0 (contact info, location — full monospace register)
**Label Font:** Recursive MONO=1 (email contact only; matches sidebar metadata register)

**Character:** Recursive at MONO=0.5 sits halfway between geometric sans and monospace — letterforms carry faint terminal-manual quality without being literally code. Weight 300, CASL=0 (linear, not casual): reads as precise instrument. Newsreader weight 300 reads like a well-printed journal article at every optical size. Pairing unusual: half-mono structural font framing humanist serif body. Signals author works at the interface of systems and language.

### Hierarchy

- **Display** (Recursive, weight 300, MONO=0.5, `clamp(2.25rem, 5.5vw, 3.5rem)`, line-height 1.05, letter-spacing -0.025em): Page-level name only. About page `h1`. Half-mono axis creates visual spacing rhythm without starkness of full mono.
- **Section Stamp** (Recursive, weight 300, MONO=0.75, `0.8125rem`, uppercase, letter-spacing 0.14em, `ink-secondary` color): About page section labels. MONO=0.75 pushes toward typewriter register without going full monospace. Border-bottom 1px divider line.
- **Title** (Recursive, weight 300, MONO=0.5, `0.9375rem`, line-height 1.4, letter-spacing -0.005em): Publication titles, project names. Workhorse heading level.
- **Body** (Newsreader, weight 300, `1rem`, line-height 1.7, `font-optical-sizing: auto`): All prose — bio, abstract excerpts, post content. Max ~70ch line length; 800px container enforces at desktop.
- **Sidebar Mono** (Recursive, weight 300, MONO=1, `0.8125rem`, letter-spacing 0.02em): Contact info, office location in profile sidebar. Full monospace axis for technical metadata.
- **Venue / Meta** (Recursive, weight 300, `0.75rem`): Publication venue abbreviation, year, periodical lines, filter button labels.
- **Label** (Recursive, weight 300, MONO=1, `0.8125rem`, letter-spacing 0.02em): Email in profile detail. Full monospace register — same axis as sidebar location, consistent metadata treatment.

### Named Rules

**The Weight Floor Rule.** Recursive at weight 300 only for display and headings. Weight 400+ collapses contrast between headings and body. Emphasis within heading: use size, not weight.

**The Optical Size Rule.** Newsreader is an optical-size font (opsz axis 6–72). Always load with `font-optical-sizing: auto`. Without it, body text looks too heavy and captions look wrong.

**The Axis Lock Rule.** Recursive must always set `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0`. Exception: sidebar mono context uses MONO=1. At MONO=0 (browser default), Recursive is indistinguishable from generic geometric sans — loses all character.

**The Global Lock.** `_typography.scss` sets `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0` on `*` globally. Newsreader silently ignores unknown axes. Never remove this global rule — it prevents Recursive from reverting to MONO=0 on any unspecified element.

## 4. Elevation

System is flat. No shadow vocabulary. Depth via typographic hierarchy and thin dividers (`border-top: 1px solid var(--global-divider-color)`), not z-axis theater. Publication entry distinguished from neighbors by whitespace and a 1px line, not card shadow or elevation.

Dark mode surface layers (code blocks, footer) use tonal step — `oklch(21% 0.004 264)` on `oklch(13% 0.003 264)` — not shadow. Separation structural, not decorative.

### Named Rules

**The Flat-By-Default Rule.** Surfaces flat at rest. No hover shadows, no float effects. Element needs interactivity signal: use color (Reference Blue) or underline, not elevation. Link that grows shadow on hover is wrong answer.

## 5. Components

### Navigation

Thin, sticky top bar. Links in Recursive weight 300 (title scale). Default: `ink` / `ink-on-dark`. Active/current: Reference Blue. Hover: Reference Blue. No background fill change on hover — color shift is the signal. Focus: `outline: 2px solid var(--global-theme-color); outline-offset: 2px`. Bootstrap 4 collapse for mobile.

### Links

Body text in Newsreader. Link color: Reference Blue at rest. Hover: underline added. No other treatment. Underline on hover (not default) keeps reading flow clean, confirms link on intent.

### Publication Entries

Primary content unit. Not a card — no border, no background fill, no shadow. Structured column: title in Recursive (title scale, weight 300, letter-spacing -0.005em), authors in Newsreader weight 300, coauthor links with Reference Blue underline, venue/year in Ink Secondary (Recursive 0.75rem). Internal padding: 8px top/bottom, 0 horizontal. Separated by 1px `var(--global-divider-color)` top divider. Title link: default color matches body text, `::after` pseudo underline (Reference Blue, opacity 0.25 at rest → 1.0 on hover), full color shift on hover. All transitions guarded by `@media (prefers-reduced-motion: no-preference)`.

**The Anti-Card Rule.** Publication lists, project lists, news items are not cards. Structured text. No border-radius, no background tint, no box-shadow on list entries. 1px top divider only. Card UI on publication entries is the most visible sign of a generic template — prohibited.

### Publication Filter Bar

Row of filter buttons above the publication list. Recursive `0.75rem` weight 300, MONO=0.5. `padding: 3px 10px`, `border: 1px solid var(--global-divider-color)`, no radius. Inactive: Ink Secondary + divider border. Active/hover: Reference Blue + Reference Blue border. Transition: `color 120ms, border-color 180ms`. Focus: `outline: 2px solid var(--global-theme-color); outline-offset: 2px`. Built dynamically from rendered topic tags via JS.

### Topic Tags (`.pub-topic-tag`)

Inline chip used in publication entries and about page bio. `padding: 1px 7px`, Recursive `0.7rem` weight 300. Same inactive/active color behavior as filter buttons. Keyboard accessible: `role="button"`, `onkeydown` handler, `focus-visible` outline. Clicking on about page redirects to `/publications/?topic=...`; clicking on publications page triggers filter directly. Tooltip on hover (about page only) shows linked paper list — lazy-fetched, cached after first load.

### Publication Link Buttons

`[pdf]`, `[abstract]`, `[bibtex]`, `[slides]`, etc. Bracket notation — 90s paper convention. Zero visual weight: `padding: 0`, no border, no background. Recursive `0.8125rem` weight 300, MONO=1. Default: Ink Secondary. Hover: Reference Blue. Transition `color 120ms`. Focus-visible outline. Render label text with brackets in markup, not CSS content.

### Venue Abbreviation Badge

Conference abbreviation (e.g. `CCS`, `USENIX`). Reference Blue fill, `ink-on-dark` text (Recursive MONO=1, weight 300, `0.7rem`, letter-spacing 0.04em), no radius. Appears when `abbr` field set in bib entry.

### Section Stamps (About Page `h2`)

`.post article > h2` elements are styled as section stamps, not traditional headings: Recursive `0.8125rem`, weight 300, MONO=0.75, letter-spacing `0.14em`, uppercase, `var(--global-text-color-light)` color, `border-bottom: 1px solid var(--global-divider-color)`. Labels sections without competing with content beneath. Links inside stamps inherit color — no accent on section labels.

### Flat List Items (Awards / Community Service)

2-column CSS grid: `44px` year column + `1fr` text column, `gap: 20px`, `padding: 12px 0`, 1px top divider. Year: Recursive `0.75rem`, Ink Secondary, `font-variant-numeric: tabular-nums`. Text: Newsreader body. Same structural logic as publication entries — text, not cards.

### News Items

Same 2-column grid pattern as flat list. Date column is `72px`. Date in Recursive tabular numerals, Ink Secondary. News text in Newsreader with `font-optical-sizing: auto`.

### About Page — Paper Header Block

About page top reads like a paper author block, not a hero section. Structure (flush left, no centering):

1. **Name** — Display scale (Recursive, weight 300, MONO=0.5, `clamp(2rem, 5vw, 3rem)`)
2. **Affiliation line** — Recursive `0.875rem`, MONO=0.5, uppercase, letter-spacing 0.08em, Ink Secondary
3. **Provenance line** — Recursive `0.75rem`, MONO=1, Ink Secondary: `Vancouver, BC · email@domain · 2024`. Full monospace register — same as sidebar metadata.
4. **Bio** — Newsreader body, max 62ch, follows provenance with 16px gap
5. **Contact links** — Recursive MONO=1, `0.8125rem`, Ink Secondary at rest, Reference Blue on hover

Photo: present but subordinated (96px, top-right, border 1px divider). Layout: CSS grid `1fr 96px`. Photo never the focus — this is a text document.

### Footer — Document Colophon

Minimal footer. Border-top 1px divider. Two-column: left = `Name · Institution · Location` in Recursive MONO=1, `0.75rem`, Ink Secondary. Right = `last updated Month Year`. Same provenance line logic as header — site signs itself like a tech report.

### Blockquotes

Full 1px border (`color-mix(in oklch, var(--global-theme-color) 20%, var(--global-bg-color))`) + background tint (`color-mix(in oklch, var(--global-theme-color) 5%, var(--global-bg-color))`). Not side-stripe — full perimeter border. Newsreader 1.2rem. Tip/warning/danger variants use semantic color tokens (`--global-tip-block`, `--global-warning-block`, `--global-danger-block`) defined in `_themes.scss`.

### Code

Light mode: near-white `var(--global-code-bg-color)`, ink text. Dark mode: near-black (`oklch(5% 0.002 264)`), light-grey text. No radius, no tint, no decoration.

## 6. Do's and Don'ts

### Do:
- **Do** use Recursive weight 300 with `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0` for all headings. Contrast with Newsreader body is the system's core visual move.
- **Do** use MONO=1 for sidebar contact info and venue abbreviation badge text — full monospace register signals metadata.
- **Do** limit Reference Blue (`oklch(46% 0.27 264)` light / `oklch(61% 0.22 264)` dark) to interactive states: links, citations, nav active, focus rings, filter active, tag hover. Rarity is signal.
- **Do** use thin 1px dividers (`var(--global-divider-color)`) to separate list entries. Structure via spacing and line, not card borders.
- **Do** set `font-optical-sizing: auto` on Newsreader at every size. Font designed for it.
- **Do** keep max-width at 800px. Body line length stays 65–75ch.
- **Do** use Recursive MONO=1 for all sidebar metadata: location, email, contact info. Consistent full-monospace register for technical metadata.
- **Do** support dark mode as first-class design variant. Both modes use CSS custom property tokens; test both.
- **Do** use warm paper stock tint for light mode background (`oklch(98.5% 0.006 80)`, hue 80). Ink and UI neutrals stay at hue 264. The split — warm ground, cool text — is intentional.
- **Do** use `color-mix(in oklch, ...)` for tinted state backgrounds (ToC active, blockquote fill). Stays on-hue under theme switch.
- **Do** guard all non-essential transitions with `@media (prefers-reduced-motion: no-preference)`.

### Don't:
- **Don't** use `border-left` greater than 1px as a colored accent stripe on any element. Not blockquotes, not publication entries, not callouts. Most recognizable al-folio default. Replace with background tints or full borders.
- **Don't** use gradient text (`background-clip: text` with a gradient). Single solid color only.
- **Don't** use Reference Blue as a section heading color, background fill, or decorative element. Interactive signal only.
- **Don't** use cards for publication lists, project lists, news items. No `border-radius` + `box-shadow` + `background-color` on list entries. Publications are not products.
- **Don't** add scroll-driven animations, hero entrance effects, or floating UI elements. Site loads, immediately readable — no choreography.
- **Don't** use generic al-folio defaults without intentional override: white/teal color scheme (overridden to Reference Blue), card grid layout (overridden to structured text), uniform spacing (override with deliberate rhythm).
- **Don't** introduce a third typeface for decorative or "personality" purposes. Two fonts (Recursive + Newsreader) cover all roles.
- **Don't** use Recursive without `font-variation-settings: "MONO" 0.5, "CASL" 0`. At MONO=0, indistinguishable from generic geometric sans, loses all character.
- **Don't** use Recursive at weight 400+ in headings. Visual emphasis needed: use size scale.
- **Don't** design for the LinkedIn register: no achievement-bullet formatting, no "impact metrics" typography (big number + small label), no corporate blue/navy palette swaps.
- **Don't** use IBM Plex Sans. Personal negative association — prohibited regardless of fit.
- **Don't** use raw `oklch(0% 0 0)` or `oklch(100% 0 0)` for text or background. Light bg: tint hue 80. Ink: tint hue 264.
- **Don't** render publication link labels as plain text. Use bracket notation: `[pdf]`, `[slides]`. Brackets in markup, not CSS content pseudo-element.
