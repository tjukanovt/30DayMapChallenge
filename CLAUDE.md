# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is the official repository for **#30DayMapChallenge**, a daily social mapping
project held every November. It is a **content and documentation repository**, not a
software application. There is no application code to build or test — the deliverables
are Markdown content and the MkDocs-generated website at https://30daymapchallenge.com
(domain set by `CNAME`).

## Site build commands

The website is built with [MkDocs](https://www.mkdocs.org/) + the Material theme.

```bash
pip install -r requirements-mkdocs.txt   # install dependencies
mkdocs serve                             # local preview at http://127.0.0.1:8000
mkdocs build --strict                    # build into site/ (gitignored); --strict is what CI runs
```

Always run `mkdocs` from the repository root (where `mkdocs.yml` lives) — the
`pymdownx.snippets` include paths are resolved relative to it.

## CI / deployment

- `.github/workflows/build.yml` — runs on **pull requests**: runs
  `mkdocs build --strict` and uploads the built site as a `site-preview`
  artifact. This is the staging gate; treat a red check as a blocker.
- `.github/workflows/gh-deploy.yml` — runs on **push to `main`**: deploys to GitHub
  Pages via `mkdocs gh-deploy --force` (Python 3.13).

GitHub Pages serves only the production site. For a per-PR preview, download the
`site-preview` artifact from the `build` workflow run and open it locally.

## Map collections — community contributions

The **Map collections** page (`docs/galleries/index.md`, still served at the
`/galleries/` URL) is data-driven so the community can contribute easily:

- `galleries.yml` (repo root) holds the collection entries — a flat YAML list of
  `creator` / `link` / `year` / `description`. This is the file contributors edit.
- `main.py` (repo root) is the `mkdocs-macros` module: its `define_env` loads
  `galleries.yml` and exposes it as the Jinja variable `galleries`, plus a
  `sort_creators` filter that orders entries by visible name (case-insensitive,
  ignoring a leading `@` so handles don't all clump at the top).
- `docs/galleries/index.md` renders the list with a Jinja loop, grouped by year
  and ordered with `sort_creators`.
- `mkdocs-macros` is enabled in `mkdocs.yml` under `plugins`. It renders Jinja on
  **all** pages; if a page ever needs literal `{{`/`{%`, add `render_macros: false`
  to its front matter.
- Contribution paths are documented in `CONTRIBUTING.md`, with a GitHub issue
  form at `.github/ISSUE_TEMPLATE/gallery-submission.yml` for non-PR submitters.

## Theme tables

Each archived year has its theme table in `includes/themes-<year>.md`
(`themes-2019.md` … `themes-2025.md`), pulled into the matching
`docs/<year>/index.md` via the snippet directive `--8<-- "includes/themes-<year>.md"`.
There is currently **no live theme table** for an upcoming year.

When the 2026 themes are announced: add `includes/themes-2026.md`, include it
where needed, and add a literal copy to `README.md` between
`<!-- TABLE START -->` / `<!-- TABLE END -->` markers (GitHub does not process
snippets). `scripts/ical.py` regenerates `themes.ical` by parsing those README
markers (it expects exactly 30 rows); run it with `python scripts/ical.py`
(needs `pytz`).

## Repository structure

- `README.md` — a minimal GitHub landing page: what the challenge is, pointers to
  the website (collections, resources), the Code of Conduct, and contributing. It
  deliberately does **not** duplicate the site's data/tools/tutorials lists (those
  live in `docs/resources.md`). The theme table is added here, between the
  `<!-- TABLE START -->` / `<!-- TABLE END -->` markers, when a year is live.
- `galleries.yml` — community map collection entries (see "Map collections" above).
- `main.py` — `mkdocs-macros` module that feeds `galleries.yml` to the docs.
- `CONTRIBUTING.md` — how to add a collection; `.github/ISSUE_TEMPLATE/` and
  `.github/PULL_REQUEST_TEMPLATE.md` support the contribution flow.
- `includes/` — shared Markdown partials included via snippets (per-year theme tables).
- `docs/` — the MkDocs site content.
  - `docs/index.md` — site home page. Hosts the countdown widget (see below).
  - `docs/galleries/index.md` — the unified Map collections page.
  - `docs/<year>/index.md` — per-year archive page (intro + that year's theme table).
  - `docs/2020/`, `docs/2021/` and `docs/2022/` also have `dayNN_*.md` files listing
    most-liked tweets per day — a historical Twitter/X-era archive, no longer updated.
  - `docs/resources.md`, `docs/404.md`, `docs/imgs/`.
  - `docs/stylesheets/extra.js` — opens external links in a new tab, drives the
    home-page countdown, and pulls a small recent-Bluesky preview into the
    "Across the web" section on the home page; `docs/stylesheets/gbextra.css`
    — site-wide custom styling.
    Both are wired in via `extra_javascript` / `extra_css` in `mkdocs.yml`.
  - `docs/manifest.webmanifest` and `docs/CNAME` — PWA manifest (referenced from
    `extra.manifest` in `mkdocs.yml`) and the custom domain pin for GitHub Pages.
- `mkdocs.yml` — site config and the **`nav` tree**, which is maintained by hand.
- `archive/<year>/` — frozen snapshots of past years' `README.md` and `themes.ical`
  (includes `archive/2025/`).
- `images/` — logos and yearly promotional flyers (referenced via raw GitHub URLs).

## Key conventions

- Dates in the theme table use `DD-MM-YYYY` format; the table always has 30 rows.
- New pages are only visible on the site once added to the `nav` tree in `mkdocs.yml`.
- Adding a new year requires coordinated edits: a new `docs/<year>/index.md`, a matching
  `nav` entry in `mkdocs.yml`, a new `includes/themes-<year>.md` (with a literal copy
  in the `README.md` markers), and archiving the prior year into `archive/<year>/`.
- Collection entries go in `galleries.yml`, not into Markdown by hand.
- Content is plain Markdown; the Material theme enables many `pymdownx` extensions
  (see `markdown_extensions` in `mkdocs.yml`) such as admonitions, task lists, and tabs.

## Home-page countdown

`docs/index.md` includes a `#challenge-countdown` block (initially `hidden`) with
two sub-blocks: one for the **themes announcement** (1 October) and one for the
**challenge start** (1 November). `docs/stylesheets/extra.js` populates both each
second, switches the themes block to a "Now available" banner once 1 October has
passed, and switches the challenge block to a "Day N of 30" banner during
November. After 1 December it advances to the next year's milestones. The script
re-runs on Material's instant-navigation page swaps via `window.document$`, so
edits to the markup or labels must keep the `data-cd-*` hooks intact.
