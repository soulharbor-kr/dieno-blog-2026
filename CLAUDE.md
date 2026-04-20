# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

Personal blog and portfolio site for "DieNo" (다이노), a Korean educator and startup mentor. Built with **Next.js 16.2.1** (App Router), **React 19**, **Tailwind CSS v4**, and **Supabase** as the backend database.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, port 3000)
npm run build    # Production build
npm run lint     # ESLint (flat config, v9)
```

No test framework is configured.

## Architecture

### Data Flow

All data access goes through `src/lib/supabase.ts`, which exports typed async functions (`getPosts`, `getPostBySlug`, `getRelatedPosts`, `submitContact`, `subscribeNewsletter`). If Supabase is unavailable (missing env vars), pages fall back to `src/lib/mockData.ts`.

Pages use **ISR** with `export const revalidate = 3600` — not `getStaticProps`/`getServerSideProps`.

### Page Tracking

Two-part system: `src/components/TrackPageView.tsx` (client component, fires on pathname change via `useEffect`) calls `POST /api/track`, which hashes `IP+UA` with SHA-256 for anonymous visitor deduplication and writes to a Supabase `page_views` table. `sessionStorage` prevents duplicate counts within a session. Bot detection runs server-side in the route handler.

### Supabase Tables

- `posts` — blog content (see `Post` type in `src/types/index.ts`)
- `contacts` — contact form submissions
- `newsletter_subscribers` — email list with `active` flag, upserted on conflict
- `page_views` — analytics (path, hashed visitor_id, user_agent, referer)

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Design tokens live as CSS custom properties in `src/app/globals.css`. Badge variants for categories are defined there as utility classes (e.g. `badge-startup`, `badge-faith`). Fonts: Pretendard (body/UI), Noto Serif KR (headings), Material Symbols (icons) — all loaded via CDN in the root layout.

### Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anon key
ADMIN_PASSWORD                  # Protects GET /api/admin/stats
```

## Key Conventions

- **Categories** are a fixed union type in `src/types/index.ts`. Adding a new category requires updating the `Category` type, `CATEGORY_LABELS`, `CATEGORY_COLORS`, and the corresponding badge CSS class in `globals.css`.
- Blog posts are stored in Supabase (not as local markdown files), though `gray-matter` is available as a dependency.
- The admin stats dashboard at `/admin/stats` uses `sessionStorage` for password persistence — there is no server-side session.
- Turbopack is enabled in `next.config.ts`; do not switch to webpack unless a Turbopack incompatibility is confirmed.
- Image external domains are allowlisted in `next.config.ts` (`images.unsplash.com`, `lh3.googleusercontent.com`). `images.unoptimized` is set to `true` because Railway's server IP is blocked by Unsplash CDN — browsers fetch images directly.
- When inserting posts, `cover_image` must **not** contain angle brackets (`< >`). Use a plain URL string only: `https://images.unsplash.com/photo-xxx?w=800&q=80`. Also populate `featured_image_url` with the same value.
