This site is about me, my ideas, and my pursuits. It is neither a commercial website to attract traffic nor a presentation to please someone. Instead, an introduction to me. Therefore, it should be called a preface rather than a portfolio.

# Astro Migration Requirements

## Goal

Migrate the existing React SPA into an Astro-based static website while preserving the existing publishing workflow.

The final website must remain **100% static** and deploy entirely on Netlify. No backend or runtime server should be required.

---

# Existing Publishing Flow

Desktop CMS
→ User publishes content
→ CMS writes Markdown + Frontmatter
→ CMS commits & pushes to Git
→ Netlify automatically redeploys
→ Astro generates static pages

The CMS is responsible only for authoring and publishing content. Astro is responsible for presentation, routing, rendering, and SEO.

---

# Content Model

Support multiple content collections:

- Blog
- Projects
- Notes
- Essays
- Books (future)

Every content item is a Markdown file.

Example:

```
src/content/blog/my-post.md
```

Each file contains frontmatter:

```yaml
---
title:
description:
slug:
date:
updated:
tags:
draft:
cover:
---
```

---

# Routing

Automatically generate static routes.

Examples:

```
/blog/documentation-drift

/projects/syncmydocs

/notes/linux-permissions

/essays/sincerity
```

No URL parameters.

No runtime markdown fetching.

No client-side routing requirement.

---

# Rendering

Render Markdown into static HTML during build.

Support:

- Syntax highlighting
- Tables
- Images
- Blockquotes
- Code fences
- Internal links
- GitHub-flavored markdown

Optional:

- Reading time
- Table of contents
- Math support

---

# SEO

Every page must automatically generate:

- HTML title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter card metadata

Site-wide:

- sitemap.xml
- robots.txt
- RSS feed

Support JSON-LD structured data.

---

# Performance

Produce minimal JavaScript.

Prefer static rendering wherever possible.

Optimize images.

Support lazy-loading where appropriate.

---

# Navigation

Generate:

- Homepage
- Collection index pages
- Tag pages
- Previous/Next navigation
- 404 page

Optional:

- Breadcrumbs

---

# Search

Integrate Pagefind for client-side static search.

---

# CMS Contract

The CMS should remain framework-agnostic.

Its responsibilities:

- Create Markdown
- Edit Markdown
- Delete Markdown
- Generate frontmatter
- Commit & Push to Git

The CMS must not know anything about Astro internals.

---

# Build Responsibilities

During every Netlify deployment Astro should:

- Discover all content
- Validate frontmatter
- Generate routes
- Render HTML
- Generate sitemap
- Generate RSS
- Generate search index
- Generate tag pages

---

# Future Enhancements

- Automatic Open Graph image generation
- Analytics integration
- Comments
- Newsletter
- Related posts
- Series support
- Multiple themes

---

# Architecture

```
Desktop CMS
        │
        ▼
Markdown + Frontmatter
        │
        ▼
Git Repository
        │
        ▼
Netlify Build
        │
        ▼
Astro
        │
        ├── Static HTML
        ├── SEO Metadata
        ├── Sitemap
        ├── RSS
        ├── Search Index
        └── Optimized Assets
        │
        ▼
Static Website
```