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

This system is built like a well-authored academic paper: the typography does the heavy lifting, the structure is immediately legible, and nothing on the page competes with the argument. Recursive carries the headings with sparse, technical authority — weight 200-300, optical-size kerning, no decorative flourish. Newsreader handles the body: an optical-size serif that reads like printed editorial at every size. These two fonts are the entire visual identity. Everything else — color, spacing, component shape — exists to support them.

Color is disciplined to a single accent: Reference Blue (#0f62fe). It appears on links, citations, and interactive states, never as decoration. Its rarity is the point. A blue link in a sea of black Newsreader text signals meaning the way a blue hyperlink in a research PDF does — precise, functional, expected.

The system explicitly rejects: generic al-folio defaults (white pages with teal accents and uniform card grids), flashy portfolio theatrics (gradient heroes, scroll animations, floating elements), and the corporate/LinkedIn register (achievement bullets, suit-and-tie gravitas, navy-and-gold safety). It also rejects over-designed academic pages where visual novelty competes with the research. The goal is a site that feels built by the person who designed the compartmentalization model, not by someone who downloaded a theme.

**Key Characteristics:**
- Typography-led: the Recursive / Newsreader pairing is the signature, not an accent color
- Flat surfaces: no shadow vocabulary, no depth theater
- Accent restraint: Reference Blue at ≤10% surface coverage
- 800px max-width: column width chosen for reading, not filling a screen
- Dual-theme first: both light and dark modes are designed intentionally, not toggled as an afterthought

## 2. Colors: The Reference Palette

One accent, two neutrals, two modes. The palette is minimal by design — a hiring committee reading a publication list should be focused on titles, not noticing color choices.

### Primary
- **Reference Blue** (#0f62fe): The sole interactive color. Applied to links, citations, inline code references, nav active states, and hover treatments. Derived from IBM's design system — fitting for a researcher whose primary tool is the OS. Never used as a background fill, never as a decorative stripe.

### Neutral

**Light mode:**
- **Page White** (#ffffff): Background. Pure white, no tint. The paper.
- **Ink Black** (#000000): Primary text. Maximum contrast on Page White. The ink.
- **Mid Grey** (#828282): Secondary text, captions, metadata. Dates, venue abbreviations, less-critical labels.

**Dark mode:**
- **Void Dark** (#1c1c1d): Background. Near-black with a very slight warm shift — a monitor at night, not a void.
- **Dark Surface** (#212529): Card and elevated surface background in dark mode.
- **Light Grey** (#e2e2e2): Primary text on dark.
- **Divider Dark** (#424246): Dividers and structural borders in dark mode.

### Named Rules
**The Reference Rule.** Reference Blue appears on interactive elements only. No colored section headings, no accent borders, no decorative usage. When the eye lands on blue, it means "this is a link or citation." Diluting this signal anywhere dilutes it everywhere.

## 3. Typography: IBM Plex + Newsreader

**Display/Heading Font:** Recursive (with system-ui, sans-serif fallback) — variable font, MONO=0.5, CASL=0
**Body Font:** Newsreader (with Georgia, serif fallback)
**Label Font:** Audiowide (for email/contact detail only; treat as a signature element, not a general-purpose label font)

**Character:** Recursive at MONO=0.5 sits halfway between geometric sans and monospace — the letterforms carry a faint terminal-manual quality without being literally code. At weight 300 and CASL=0 (linear, not casual), it reads as a precise instrument. Newsreader at weight 300 reads like a well-printed journal article at every optical size. The pairing is unusual: a half-mono structural font framing a humanist serif body. It signals that the author works at the interface of systems and language.

### Hierarchy

- **Display** (Recursive, weight 300, MONO=0.5, clamp(1.75rem, 4vw, 2.5rem), line-height 1.1): Page-level name and major section openers. The half-mono axis creates spacing rhythm without the starkness of full mono.
- **Headline** (Recursive, weight 300, MONO=0.5, 1.5rem, line-height 1.3): Section titles (Publications, About, Projects). One step above the text without competing with it.
- **Title** (Recursive, weight 300, MONO=0.5, 1.125rem, line-height 1.4): Publication titles, project names. The workhorse heading level.
- **Body** (Newsreader, weight 300, 1rem, line-height 1.7): All prose — bio, abstract excerpts, post content. Max 70ch line length; the 800px container enforces this at desktop.
- **Label** (Audiowide, weight 400, 0.75rem, letter-spacing 0.04em): Email address in the profile detail only. Audiowide has a technical, slightly retro-futurist quality. Use it as a signature detail — one element per page, not a general-purpose label style.

### Named Rules
**The Weight Floor Rule.** Recursive appears at weight 300 only for display and headings. Weight 400+ collapses the contrast between headings and body text. If something needs emphasis within a heading, use size, not weight.

**The Optical Size Rule.** Newsreader is an optical-size font (opsz axis 6-72). Always load with `font-optical-sizing: auto`. Without this, body text looks slightly too heavy and captions look wrong.

**The Axis Lock Rule.** Recursive must always be set with `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0`. Do not let it default to MONO=0 (pure sans) — that loses the distinctive character and reads as a generic grotesque.

## 4. Elevation

This system is flat. No shadow vocabulary. Depth is communicated through typographic hierarchy and thin dividers (`border-top: 1px solid var(--global-divider-color)`), not through z-axis theater. A publication entry is distinguished from its neighbors by whitespace, not by a card shadow lifting it off the page.

In dark mode, surface layers (cards, inline blocks) use a tonal step — `#212529` on `#1c1c1d` — rather than a shadow. The separation is structural, not decorative.

**The Flat-By-Default Rule.** Surfaces are flat at rest. No hover shadows, no float effects. If an element needs to signal interactivity, use color (Reference Blue) or underline, not elevation. A link that grows a shadow on hover is the wrong answer.

## 5. Components

### Navigation
Thin, fixed top bar. Links in Recursive weight 300 (title scale). Default state: Ink Black / Light Grey (dark). Active/current: Reference Blue. Hover: Reference Blue. No background fill change on hover — the color shift is the signal.

### Links
Body text in Newsreader. Link color: Reference Blue. Hover: Reference Blue + underline. No other treatment. The underline on hover (not default) keeps reading flow clean while confirming the link on intent.

### Publication Entries
The primary content unit. Not a card — no border, no background fill, no shadow. A structured row: title in Recursive (title weight 300), authors in Newsreader weight 300, venue/year in Mid Grey. Internal padding: 12px top/bottom, 0 horizontal — the left margin of the page is the frame. Distinguished from neighboring entries by a thin horizontal divider.

**The Anti-Card Rule.** Publication lists, project lists, and news items are not cards. They are structured text. No border-radius, no background tint, no box-shadow. A 1px top divider is the only permitted separator. Card UI on publication entries is the most visible sign of a generic template — prohibited.

### Blockquotes
Current implementation uses `border-left: 5px solid var(--global-theme-color)`. This is a side-stripe pattern — see Do's and Don'ts. Target state: replace with a background tint of Reference Blue at 5% opacity and a 1px full border, or use indentation + italic without any border.

### Profile
Circular image, right-aligned. Email in Audiowide — the one place that font appears. This is a deliberate signature; resist expanding Audiowide to other label contexts.

### Code Blocks
Light mode: white background, black text. Dark mode: black background, white text. No tint, no decorative radius. The spareness is correct — this is a systems researcher's site; code should look like code, not like a designed component.

## 6. Do's and Don'ts

### Do:
- **Do** use Recursive at weight 300 with `font-variation-settings: "MONO" 0.5, "CASL" 0, "slnt" 0` for headings only. The contrast between this and Newsreader body is the system's core visual move.
- **Do** limit Reference Blue (#0f62fe) to interactive states: links, citations, nav active, focus rings. Its rarity is the signal.
- **Do** use thin 1px dividers (`var(--global-divider-color)`) to separate list entries. Structure through spacing and line, not through card borders.
- **Do** set `font-optical-sizing: auto` on Newsreader at every size. The font is designed for it.
- **Do** keep max-width at 800px. Line length for body text should stay at 65-75ch — the container enforces this.
- **Do** treat Audiowide as a signature detail: one instance per page (profile email). Not a general label style.
- **Do** support dark mode as a first-class design variant. Test both modes when changing colors.

### Don't:
- **Don't** use `border-left` greater than 1px as a colored accent stripe on any element. Not on blockquotes, not on publication entries, not on callouts. This is the most recognizable al-folio default and a generic pattern. Replace with background tints or full borders.
- **Don't** use gradient text (`background-clip: text` with a gradient). Single solid color only.
- **Don't** use Reference Blue (#0f62fe) as a section heading color, background fill, or decorative element. It is an interactive signal, nothing else.
- **Don't** use cards for publication lists, project lists, or news items. No `border-radius` + `box-shadow` + `background-color` on list entries. Publications are not products.
- **Don't** add scroll-driven animations, hero entrance effects, or floating UI elements. The site should load and be immediately readable — no choreography.
- **Don't** use generic al-folio defaults without intentional override: the white/teal color scheme (overridden to IBM Blue), the card grid layout (overridden to structured text), the uniform spacing (override with deliberate rhythm).
- **Don't** use Audiowide for anything other than the profile email detail. Expanded use collapses its signature function.
- **Don't** use Recursive at weight 400 or above in headings. If visual emphasis is needed, use size scale.
- **Don't** use Recursive without `font-variation-settings: "MONO" 0.5, "CASL" 0`. At MONO=0 it is indistinguishable from a generic geometric sans and loses all character.
- **Don't** design for the LinkedIn register: no achievement-bullet formatting, no "impact metrics" typography (big number + small label), no corporate blue/navy palette swaps.
