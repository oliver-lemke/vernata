# vernata

Public repository of **Vernata: Self-Supervised Learning of LiDAR Point Representations** (IROS 2026).

## `website` branch

This branch hosts the source for the Vernata **project page** — a single, dependency-free
static site (no build step) served as-is, e.g. via GitHub Pages.

### Structure

```
index.html            # the full project page (hero, abstract, video, method, results, links, BibTeX)
static/css/style.css  # all styling — light theme with a signature LiDAR depth-ramp accent
static/js/main.js     # vanilla JS: active-nav, scroll reveals, before/after compare slider, copy-BibTeX
static/images/        # teaser, architecture diagram, and PCA comparison rows (Sonata vs. ours)
static/videos/        # placeholder for self-hosted media (the overview video embeds from YouTube)
```

### Run it locally

It's plain static files — just serve the folder over HTTP:

```bash
python3 -m http.server 8000
# then open http://127.0.0.1:8000/
```

Editing `index.html`, `style.css`, or `main.js` and refreshing the page is the full dev loop.
