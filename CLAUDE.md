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

- `.github/workflows/build.yml` — runs on **pull requests**: verifies the theme table
  is in sync, runs `mkdocs build --strict`, and uploads the built site as a
  `site-preview` artifact. This is the staging gate; treat a red check as a blocker.
- `.github/workflows/gh-deploy.yml` — runs on **push to `main`**: deploys to GitHub
  Pages via `mkdocs gh-deploy --force` (Python 3.13).

GitHub Pages serves only the production site. For a per-PR preview, download the
`site-preview` artifact from the `build` workflow run and open it locally.

## Theme table — single source of truth

The 30-row November theme table has one canonical copy: **`includes/themes-2025.md`**
(at the repo root, outside `docs/` so it is not built as its own page).

- `docs/index.md` and `docs/2025/index.md` pull it in with the snippet directive
  `--8<-- "includes/themes-2025.md"` — never paste the table into those files.
- `README.md` keeps a literal copy between the `<!-- TABLE START -->` /
  `<!-- TABLE END -->` markers, because GitHub does not process snippets. When the
  table changes, edit `includes/themes-2025.md` **and** the README block to match —
  the `build` workflow fails if they drift apart.

`scripts/ical.py` regenerates `themes.ical` by parsing the marked table in `README.md`
(it expects exactly 30 rows between the markers). Run it with `python scripts/ical.py`;
it needs `pytz` installed.

## Repository structure

- `README.md` — the GitHub landing page; holds the marked theme table plus the data
  sources / tools / code of conduct content.
- `includes/` — shared Markdown partials included via snippets (currently the theme table).
- `docs/` — the MkDocs site content.
  - `docs/index.md` — site home page.
  - `docs/<year>/index.md` — per-year "portfolio collection" (table of participant links).
  - `docs/2021/` and `docs/2022/` also have `dayNN_*.md` files listing most-liked tweets per day.
  - `docs/resources.md`, `docs/statistics.md`, `docs/404.md`, `docs/stylesheets/`, `docs/imgs/`.
- `mkdocs.yml` — site config and the **`nav` tree**, which is maintained by hand.
- `archive/<year>/` — frozen snapshots of past years' `README.md` and `themes.ical`.
- `images/` — logos and yearly promotional flyers (referenced via raw GitHub URLs).

## Key conventions

- Dates in the theme table use `DD-MM-YYYY` format; the table always has 30 rows.
- New pages are only visible on the site once added to the `nav` tree in `mkdocs.yml`.
- Adding a new year requires coordinated edits: a new `docs/<year>/index.md`, a matching
  `nav` entry in `mkdocs.yml`, a new `includes/themes-<year>.md` (update the snippet
  references and README markers), and archiving the prior year into `archive/<year>/`.
- Content is plain Markdown; the Material theme enables many `pymdownx` extensions
  (see `markdown_extensions` in `mkdocs.yml`) such as admonitions, task lists, and tabs.
