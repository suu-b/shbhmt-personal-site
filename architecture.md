# Architecture

This repo has evolved over time both visually and technically. It started from a minimalist single page portfolio and has grown into a multi-page website with a proper CMS (Content Managment System).

I'd like to its current architectural structure and decisions just because I find them fascinating:

1. This is a pnpm monorepo. Monorepos have lately grown on me. They provide and excellent and elegant way to manage interrelated packages. Though I have encountered monorepos since my first year, they truly grew on me during my summer internship. I wanted to try them and found my personal site to be the best candidate to do so.

Otto - My personal site CMS - was earlier in a separate repo. However, I wanted to reflect it the exact aesthetics and overall UI/UX as the site. This would at least mean having the same styling. This was rather annoying to maintain. The best and most elegant solution was to merge them into a monorepo with a shared package: [shared](./shared/)

2. I checked my site's SEO/performance using Lighthouse. I was disappointed to find that it performed rather poorly. I did some research and found Astro.js - a framework tailored specifically for content-heavy websites. 

3. Otto CSM would be a desktop application. It will allow me to create articles locally and make a commit to the repo. The commit would trigger a netlify deployment and the astro site would reflect it.

4. Shared package has two kinds of styles - vanilla css resets and defintions and reusable tailwind components. This allows me to use the same styles in both the site and the CMS. 