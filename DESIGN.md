---
name: Kha Dinh — Academic Portfolio
description: Systems security researcher portfolio. Technical precision, editorial depth, personal voice.
colors:
  reference-blue: "#0f62fe"
  page-white: "#ffffff"
  ink-black: "#000000"
  void-dark: "#1c1c1d"
  dark-surface: "#212529"
  mid-grey: "#828282"
  light-grey: "#e2e2e2"
  divider-dark: "#424246"
typography:
  display:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.005em"
    fontVariation: '"MONO" 0.5, "CASL" 0, "slnt" 0'
  headline:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 300
    lineHeight: 1.3
    fontVariation: '"MONO" 0.5, "CASL" 0, "slnt" 0'
  title:
    fontFamily: "Recursive, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.4
    fontVariation: '"MONO" 0.5, "CASL" 0, "slnt" 0'
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
  label:
    fontFamily: "Audiowide, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
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
  link:
    textColor: "{colors.reference-blue}"
    typography: "{typography.body}"
  nav-link:
    textColor: "{colors.ink-black}"
    typography: "{typography.title}"
  nav-link-active:
    textColor: "{colors.reference-blue}"
  publication-entry:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  publication-entry-dark:
    backgroundColor: "{colors.void-dark}"
    textColor: "{colors.light-grey}"
    rounded: "{rounded.none}"
    padding: "12px 0"
---

# Design System: Kha Dinh — Academic Portfolio

## 1. Overview

**Creative North Star: "The Systems Paper"**

System built like well-authored academic paper: typography does heavy lifting, structure immediately legible, nothing competes with argument. Recursive carries headings — weight 200-300, optical-size kerning, no decorative flourish. Newsreader handles body: optical-size serif reads like printed editorial at every size. Two fonts = entire visual identity. Color, spacing, component shape exist only to support them.

Color disciplined to single accent: Reference Blue (#0f62fe). Appears on links, citations, interactive states — never decoration. Rarity is point. Blue link in sea of black Newsreader text signals meaning like blue hyperlink in research PDF — precise, functional, expected.

System explicitly rejects: generic al-folio defaults (white pages, teal accents, uniform card grids), flashy portfolio theatrics (gradient heroes, scroll animations, floating elements), corporate/LinkedIn register (achievement bullets, navy-and-gold safety). Also rejects over-designed academic pages where visual novelty competes with research. Goal: site feels built by person who designed compartmentalization model, not someone who downloaded theme.

**Key Characteristics:**
- Typography-led: Recursive / Newsreader pairing is signature, not accent color
- Flat surfaces: no shadow vocabulary, no depth theater
- Accent restraint: Reference Blue at ≤10% surface coverage
- 800px max-width: column width chosen for reading, not filling screen
- Dual-theme first: both light and dark modes designed intentionally, not toggled as afterthought

## 2. Colors: The Reference Palette

One accent, two neutrals, two modes. Palette minimal by design — hiring committee reading publication list should focus on titles, not color choices.

### Primary
- **Reference Blue** (#0f62fe): Sole interactive color. Links, citations, inline code references, nav active states, hover treatments. Derived from IBM design system — fitting for researcher whose primary tool is OS. Never background fill, never decorative stripe.

### Neutral

**Light mode:**
- **Page White** (#ffffff): Background. Pure white, no tint. Paper.
- **Ink Black** (#000000): Primary text. Max contrast on Page White. Ink.
- **Mid Grey** (#828282): Secondary text, captions, metadata. Dates, venue abbreviations, less-critical labels.

**Dark mode:**
- **Void Dark** (#1c1c1d): Background. Near-black with slight warm shift — monitor at night, not void.
- **Dark Surface** (#212529): Card and elevated surface background in dark mode.
- **Light Grey** (#e2e2e2): Primary text on dark.
- **Divider Dark** (#424246): Dividers and structural borders in dark mode.

### Named Rules
**The Reference Rule.** Reference Blue on interactive elements only. No colored section headings, no accent borders, no decorative usage. Eye lands on blue = link or citation. Diluting signal anywhere dilutes it everywhere.

## 3. Typography: IBM Plex + Newsreader

**Display/Heading Font:** Recursive (with system-ui, sans-serif fallback) — variable font, MONO=0.5, CASL=0
**Body Font:** Newsreader (with Georgia, serif fallback)
**Label Font:** Audiowide (email/contact only; signature element, not general-purpose label font)

**Character:** Recursive at MONO=0.5 sits halfway between geometric sans and monospace — letterforms carry faint terminal-manual quality without being literally code. Weight 300, CASL=0 (linear, not casual): reads as precise instrument. Newsreader weight 300 reads like well-printed journal article at every optical size. Pairing unusual: half-mono structural font framing humanist serif body. Signals author works at interface of systems and language.

### Hierarchy

- **Display** (Recursive, weight 300, MONO=0.5, clamp(1.75rem, 4vw, 2.5rem), line-height 1.1): Page-level name and major section openers. Half-mono axis creates spacing rhythm without starkness of full mono.
- **Headline** (Recursive, weight 300, MONO=0.5, 1.5rem, line-height 1.3): Section titles (Publications, About, Projects). One step above text without competing with it.
- **Title** (Recursive, weight 300, MONO=0.5, 1.125rem, line-height 1.4): Publication titles, project names. Workhorse heading level.
- **Body** (Newsreader, weight 300, 1rem, line-height 1.7): All prose — bio, abstract excerpts, post content. Max 70ch line length; 800px container enforces at desktop.
- **Label** (Audiowide, weight 400, 0.75rem, letter-spacing 0.04em): Email in profile detail only. Audiowide has technical, slightly retro-futurist quality. Signature detail — one element per page, not general-purpose label style.

### Named Rules
**The Weight Floor Rule.** Recursive at weight 300 only for display and headings. Weight 400+ collapses contrast between headings and body. Emphasis within heading: use size, not weight.

**The Optical Size Rule.** Newsreader is optical-size font (opsz axis 6-72). Always load with `font-optical-sizing: auto`. Without it, body text looks too heavy, captions look wrong.

**The Axis Lock Rule.** Recursive must always set `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0`. MONO=0 default = pure sans = loses distinctive character, reads generic grotesque.

## 4. Elevation

System is flat. No shadow vocabulary. Depth via typographic hierarchy and thin dividers (`border-top: 1px solid var(--global-divider-color)`), not z-axis theater. Publication entry distinguished from neighbors by whitespace, not card shadow.

Dark mode surface layers (cards, inline blocks) use tonal step — `#212529` on `#1c1c1d` — not shadow. Separation structural, not decorative.

**The Flat-By-Default Rule.** Surfaces flat at rest. No hover shadows, no float effects. Element needs interactivity signal: use color (Reference Blue) or underline, not elevation. Link that grows shadow on hover is wrong answer.

## 5. Components

### Navigation
Thin, fixed top bar. Links in Recursive weight 300 (title scale). Default: Ink Black / Light Grey (dark). Active/current: Reference Blue. Hover: Reference Blue. No background fill change on hover — color shift is signal.

### Links
Body text in Newsreader. Link color: Reference Blue. Hover: Reference Blue + underline. No other treatment. Underline on hover (not default) keeps reading flow clean, confirms link on intent.

### Publication Entries
Primary content unit. Not card — no border, no background fill, no shadow. Structured row: title in Recursive (title weight 300), authors in Newsreader weight 300, venue/year in Mid Grey. Internal padding: 12px top/bottom, 0 horizontal — page left margin is frame. Distinguished from neighbors by thin horizontal divider.

**The Anti-Card Rule.** Publication lists, project lists, news items are not cards. Structured text. No border-radius, no background tint, no box-shadow. 1px top divider only permitted separator. Card UI on publication entries = most visible sign of generic template — prohibited.

### Blockquotes
Current implementation uses `border-left: 5px solid var(--global-theme-color)`. Side-stripe pattern — see Do's and Don'ts. Target: replace with Reference Blue background tint at 5% opacity + 1px full border, or indentation + italic without border.

### Profile
Circular image, right-aligned. Email in Audiowide — one place that font appears. Deliberate signature; resist expanding Audiowide to other label contexts.

### Code Blocks
Light mode: white background, black text. Dark mode: black background, white text. No tint, no decorative radius. Spareness correct — systems researcher's site; code looks like code, not designed component.

## 6. Do's and Don'ts

### Do:
- **Do** use Recursive weight 300 with `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0` for headings only. Contrast with Newsreader body is system's core visual move.
- **Do** limit Reference Blue (#0f62fe) to interactive states: links, citations, nav active, focus rings. Rarity is signal.
- **Do** use thin 1px dividers (`var(--global-divider-color)`) to separate list entries. Structure via spacing and line, not card borders.
- **Do** set `font-optical-sizing: auto` on Newsreader at every size. Font designed for it.
- **Do** keep max-width at 800px. Body line length stays 65-75ch — container enforces this.
- **Do** treat Audiowide as signature detail: one instance per page (profile email). Not general label style.
- **Do** support dark mode as first-class design variant. Test both modes when changing colors.

### Don't:
- **Don't** use `border-left` greater than 1px as colored accent stripe on any element. Not blockquotes, not publication entries, not callouts. Most recognizable al-folio default, generic pattern. Replace with background tints or full borders.
- **Don't** use gradient text (`background-clip: text` with gradient). Single solid color only.
- **Don't** use Reference Blue (#0f62fe) as section heading color, background fill, or decorative element. Interactive signal only.
- **Don't** use cards for publication lists, project lists, news items. No `border-radius` + `box-shadow` + `background-color` on list entries. Publications are not products.
- **Don't** add scroll-driven animations, hero entrance effects, or floating UI elements. Site loads, immediately readable — no choreography.
- **Don't** use generic al-folio defaults without intentional override: white/teal color scheme (overridden to IBM Blue), card grid layout (overridden to structured text), uniform spacing (override with deliberate rhythm).
- **Don't** use Audiowide for anything other than profile email detail. Expanded use collapses signature function.
- **Don't** use Recursive at weight 400+ in headings. Visual emphasis needed: use size scale.
- **Don't** use Recursive without `font-variation-settings: "MONO" 0.5, "CASL" 0`. At MONO=0, indistinguishable from generic geometric sans, loses all character.
- **Don't** design for LinkedIn register: no achievement-bullet formatting, no "impact metrics" typography (big number + small label), no corporate blue/navy palette swaps.