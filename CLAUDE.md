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

## Map galleries — community contributions

The **Map galleries** page (`docs/galleries/index.md`) is data-driven so the
community can contribute easily:

- `galleries.yml` (repo root) holds the gallery entries — a flat YAML list of
  `creator` / `link` / `year` / `description`. This is the file contributors edit.
- `main.py` (repo root) is the `mkdocs-macros` module: its `define_env` loads
  `galleries.yml` and exposes it as the Jinja variable `galleries`.
- `docs/galleries/index.md` renders the list with a Jinja loop, grouped by year.
- `mkdocs-macros` is enabled in `mkdocs.yml` under `plugins`. It renders Jinja on
  **all** pages; if a page ever needs literal `{{`/`{%`, add `render_macros: false`
  to its front matter.
- Contribution paths are documented in `CONTRIBUTING.md`, with a GitHub issue
  form at `.github/ISSUE_TEMPLATE/gallery-submission.yml` for non-PR submitters.

## Theme table (dormant until 2026)

There is currently **no live theme table** — the 2025 challenge is archived. The
2025 themes still live in `includes/themes-2025.md`, included by `docs/2025/index.md`
via the snippet directive `--8<-- "includes/themes-2025.md"`.

When the 2026 themes are announced, the theme-table machinery is reactivated:
add `includes/themes-2026.md`, include it where needed, and add a literal copy
to `README.md` between `<!-- TABLE START -->` / `<!-- TABLE END -->` markers
(GitHub does not process snippets). `scripts/ical.py` regenerates `themes.ical`
by parsing those README markers (it expects exactly 30 rows); run it with
`python scripts/ical.py` (needs `pytz`).

## Repository structure

- `README.md` — the GitHub landing page; the data sources / tools / code of
  conduct content (and the theme table, when a year is live).
- `galleries.yml` — community map gallery entries (see "Map galleries" above).
- `main.py` — `mkdocs-macros` module that feeds `galleries.yml` to the docs.
- `CONTRIBUTING.md` — how to add a gallery; `.github/ISSUE_TEMPLATE/` and
  `.github/PULL_REQUEST_TEMPLATE.md` support the contribution flow.
- `includes/` — shared Markdown partials included via snippets (the 2025 theme table).
- `docs/` — the MkDocs site content.
  - `docs/index.md` — site home page.
  - `docs/galleries/index.md` — the unified Map galleries page.
  - `docs/<year>/index.md` — per-year "portfolio collection" (table of participant links).
  - `docs/2020/`, `docs/2021/` and `docs/2022/` also have `dayNN_*.md` files listing
    most-liked tweets per day — a historical Twitter/X-era archive, no longer updated.
  - `docs/resources.md`, `docs/statistics.md`, `docs/404.md`, `docs/stylesheets/`, `docs/imgs/`.
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
- Gallery entries go in `galleries.yml`, not into Markdown by hand.
- Content is plain Markdown; the Material theme enables many `pymdownx` extensions
  (see `markdown_extensions` in `mkdocs.yml`) such as admonitions, task lists, and tabs.
