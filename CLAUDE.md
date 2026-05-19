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
mkdocs build                             # build static site into site/ (gitignored)
```

Deployment is automatic: `.github/workflows/gh-deploy.yml` runs `mkdocs gh-deploy --force`
on every push to `main` (Python 3.13). The site is also configured for Read the Docs via
`.readthedocs.yaml` (note: that file still pins Python 3.8 and is out of sync with CI).

## Calendar script

`scripts/ical.py` regenerates `themes.ical` from the theme table in `README.md`. It
expects the table to be wrapped in `<!-- TABLE START -->` / `<!-- TABLE END -->` HTML
comment markers and to contain exactly 30 rows. The current `README.md` does **not**
contain these markers, so the script will fail until they are re-added around the table.

## Repository structure

- `README.md` — the GitHub landing page; holds the **current year's theme table** and
  the data sources / tools / code of conduct content.
- `docs/` — the MkDocs site content.
  - `docs/index.md` — site home page; duplicates the current year's theme table from `README.md`.
  - `docs/<year>/index.md` — per-year "portfolio collection" (table of participant links).
  - `docs/2021/` and `docs/2022/` also have `dayNN_*.md` files listing most-liked tweets per day.
  - `docs/resources.md`, `docs/statistics.md`, `docs/404.md`, `docs/stylesheets/`, `docs/imgs/`.
- `mkdocs.yml` — site config and the **`nav` tree**, which is maintained by hand.
- `archive/<year>/` — frozen snapshots of past years' `README.md` and `themes.ical`.
- `images/` — logos and yearly promotional flyers (referenced via raw GitHub URLs).

## Key conventions

- The theme table is **duplicated** in `README.md` and `docs/index.md` (and `docs/<year>/index.md`).
  When themes change, update all copies so they stay consistent.
- Dates in theme tables use `DD-MM-YYYY` format; tables always have 30 rows (one per November day).
- Adding a new year requires several coordinated edits: a new `docs/<year>/index.md`, a matching
  `nav` entry in `mkdocs.yml`, refreshed theme tables, and (typically) archiving the prior year
  into `archive/<year>/`.
- New pages are only visible on the site once added to the `nav` tree in `mkdocs.yml`.
- Content is plain Markdown; the Material theme enables many `pymdownx` extensions
  (see `markdown_extensions` in `mkdocs.yml`) such as admonitions, task lists, and tabs.
