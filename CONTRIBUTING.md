# Contributing

Thanks for helping grow the #30DayMapChallenge! The most common contribution is
**adding your map gallery** to the [galleries page](https://30daymapchallenge.com/galleries/).

## Add your map gallery

A "gallery" is any page where you've collected your challenge maps — a GitHub
repo, a personal website, an ArcGIS StoryMap, an Observable collection, a blog,
and so on. There are three ways to get yours listed:

### 1. Open a pull request (preferred)

1. Edit [`galleries.yml`](galleries.yml) in the repository root.
2. Add an entry to the list:

   ```yaml
   - creator: Your Name
     link: https://example.com/my-30daymapchallenge
     year: 2026
     description: One short sentence about your gallery.
   ```

   - `creator`, `link` and `year` are required; `description` is optional.
   - Keep the list roughly ordered by `year`, newest first.
3. Commit and open a pull request. The `build` check will preview the site —
   once it's green, a maintainer will review and merge.

### 2. Open an issue

Not comfortable with pull requests? Open a
[gallery submission issue](https://github.com/tjukanovt/30DayMapChallenge/issues/new?template=gallery-submission.yml)
with your details and a maintainer will add the entry for you.

### 3. Get in touch

You can also reach the maintainers through the challenge's social channels
linked from [30daymapchallenge.com](https://30daymapchallenge.com/).

## Guidelines

- Link to **your own** work, or a collection you have permission to share.
- One entry per gallery. If a gallery spans several years, pick the most recent
  year and mention the range in the description.
- Make sure the link is public and works without a login.

## Building the site locally

The site is built with [MkDocs](https://www.mkdocs.org/):

```bash
pip install -r requirements-mkdocs.txt
mkdocs serve          # preview at http://127.0.0.1:8000
mkdocs build --strict # what CI runs
```
