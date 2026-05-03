# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Site runs via Docker (Jekyll + al-folio base image):

```bash
docker compose up          # start with live reload at localhost:8080
docker compose up --build  # rebuild image first
```

No local Ruby/Jekyll install needed. All changes to `_sass/`, `_layouts/`, `_includes/`, `_pages/`, `_news/`, `_bibliography/` hot-reload automatically.

## Architecture

**Base theme:** [al-folio](https://github.com/alshedivat/al-folio) (Jekyll). Heavily customized — do not assume al-folio defaults apply; read actual files.

**Key customization layers (priority order):**
1. `_sass/_themes.scss` — CSS custom properties (oklch color tokens, both light/dark). Source of truth for all colors.
2. `_sass/_base.scss` — Typography, component styles, layout overrides. Bootstrap overrides live here.
3. `_sass/_layout.scss` — Page-level layout, container sizing.
4. `_layouts/about.html` + `_layouts/bib.html` — About page and publication entry HTML. Both heavily modified from al-folio defaults.
5. `_includes/header.html` — Navbar (Bootstrap-based, restyled to match design system).

**Content sources:**
- Publications: `_bibliography/papers.bib` — jekyll-scholar renders this. Fields `selected=true` appear on homepage via `_includes/selected_papers.html`. Fields `abbr`, `pdf`, `slides`, `award`, `abstract`, `bibtex_show` control what renders.
- News items: `_news/*.md` — inline items render directly on homepage; non-inline link to full post.
- About page content: `_pages/about.md` front matter + body. Profile image, subtitle, social flags all set here.
- CV data: `_data/cv.yml` — structured YAML rendered by `_layouts/cv.html`.
- Coauthor links: `_data/coauthors.yml` — maps last name → URL for author linking in bib entries.

**Bootstrap caveat:** Site uses Bootstrap 4 for grid/navbar. Publication entries collapse the Bootstrap 2-column `.row` layout to single-column via CSS in `_base.scss` (`.publications ol.bibliography li .row { flex-direction: column }`). When editing bib entry styles, check Bootstrap specificity — override selectors need to be `.publications ol.bibliography li .whatever`.

## Design System

Full spec in `DESIGN.md`. Key rules that affect code decisions:

- **Fonts:** Recursive (headings, MONO=0.5, CASL=0, weight 300) + Newsreader (body, weight 300, `font-optical-sizing: auto`). Audiowide for profile email only. IBM Plex Sans is **prohibited** (personal negative association).
- **Accent:** Reference Blue `oklch(46% 0.27 264)` light / `oklch(61% 0.22 264)` dark. Interactive states only — links, hover, focus. Never decoration.
- **No cards on publication/news lists.** No `border-radius` + `box-shadow` + `background-color` on list entries. 1px dividers only.
- **No `border-left` accent stripes** (e.g., on blockquotes). Use background tints or full borders instead.
- **Max-width 800px** — set via `max_width: 800px` in `_config.yml`, consumed as `$max-content-width` in `assets/css/main.scss`.
- Dark mode is first-class. CSS tokens in `_themes.scss` cover both `:root` (light) and `html[data-theme="dark"]`. Always test both.

## Adding Content

**New publication:** Add entry to `_bibliography/papers.bib`. Add `selected={true}` to show on homepage. PDF links use `pdf = {filename.pdf}` (resolved from `/assets/pdf/`) or full URL.

**New news item:** Create `_news/YYYY.slug.md` with front matter `layout: post`, `date:`, `inline: true` (renders text inline on homepage) or `inline: false` (links to full post).

**Changing nav links:** Nav items come from `_pages/*.md` front matter (`nav: true`, `nav_order: N`). Blog link is always present if `blog_nav_title` set in `_config.yml`.
