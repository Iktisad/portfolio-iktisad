# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start frontend dev server (http://localhost:5173)
npm run dev

# Start the local API server (http://localhost:3005) — required for the admin dashboard
npm run api

# Build for production
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

No test suite is configured.

## Architecture

This is a single-page React + TypeScript + Vite portfolio site with two routes:

- `/` — The public portfolio page (`src/pages/HomePage.tsx`)
- `/dashboard` — The admin dashboard (`src/pages/AdminPage.tsx`), **localhost-only**, blocked client-side for any other hostname

### Data flow

All portfolio content lives in `src/data/data.json`. The shape is defined in `src/components/admin/types.ts` as `ProfileData`. The frontend imports this JSON statically at build time for the public page. The admin dashboard can mutate it at runtime via a local Node.js API server (`api/app.cjs`) that reads/writes the file directly.

The API server exposes two endpoints:
- `GET /data` — returns `data.json`
- `POST /update` — shallow-merges the request body into `data.json`

`VITE_API_URL` in `.env.local` points the dashboard to the API server (default `http://localhost:3005`). Copy `.env.example` to `.env.local` to set this up.

### Admin dashboard

`AdminPage` → `AdminSidebar` + `SectionView` + `EditModal`

Each section (experiences, projects, skills, etc.) has a dedicated form component under `src/components/admin/forms/`. The shared form primitives (`FormInput`, `FormTextarea`, `ArrayField`, `DescriptionBlockEditor`, etc.) live in `src/components/admin/shared/`. `SECTION_DEFAULTS` in `types.ts` defines the blank template for each section type.

Changes are held in React state until the user clicks **Save All**, which POSTs the full `ProfileData` object to `/update`. Deletes persist immediately (they call `persistData` directly after updating state).

### Frontend

`main.tsx` wraps the app in `BrowserRouter` + `ThemeProvider`. Dark/light mode is managed by `ThemeContext` — it reads `localStorage` and the `prefers-color-scheme` media query on mount and toggles the `dark` class on `<html>`.

The public portfolio opens with an animated `IntroOverlay` before rendering the page sections. Sakura petal animations use two hooks: `useDynamicSakura` (interval-based petal spawning via the Web Animations API) and `useStaticSakura`. Petals are disabled on mobile (`window.innerWidth < 768`).

`Projects` and `ExpandableProjectCard` drive a `ProjectModal` overlay; `isModalOpen` is lifted to `HomePage` to suppress body scroll while open.

### Styling

TailwindCSS v4 is loaded as a Vite plugin (`@tailwindcss/vite`), not via PostCSS. Global styles are in `public/css/style.css` and `public/css/intro.css`. The config is `tailwind.config.ts`. All dark-mode styles use the `dark:` variant with class strategy.
