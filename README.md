# jacob-mckiernan

Jacob McKiernan's one-page developer portfolio. It has a loud zine / manga-panel look, five color palettes, a light and dark mode, and a mascot whose eyes follow your cursor.

Built with **Vite + React + TypeScript** and plain CSS custom properties, and deployed on **Vercel**.

## Run it

```bash
npm install
npm run dev       # local dev server with hot reload → http://localhost:5173
npm run build     # type-check, then build static files into dist/
npm run preview   # serve dist/ locally to check the production build
npm run lint      # ESLint (TypeScript, React hooks, accessibility rules)
```

Run `npm run build` and `npm run lint` before you call a section done.

## Project layout

```
index.html          Entry page. Vite injects the bundled JS here. Loads Google Fonts.
public/             Copied as-is to the site root (favicon, resume.pdf, projects/<slug>.png)
src/
  main.tsx          Mounts <App /> into #root
  App.tsx           Page shell: header, sections, footer
  components/       One folder or file per page section (Header, Hero, Mascot, …)
  data/             Content as typed TS: projects, experience, toolkit, interests
  hooks/            Reusable React logic (e.g. useTheme)
  styles/           global.css (reset + fonts) and tokens.css (palettes)
vercel.json         Sends every route to index.html so /projects survives a refresh
```

## Theming

Two attributes on `<html>` control the colors: `data-palette` (`sour-patch | overdrive | pop-art | lily-pad | slate`) and `data-mode` (`light | dark`). Components only ever use CSS custom properties (tokens), never hex colors.

## Deploy

The repo is connected to Vercel. A push to `main` deploys to production. Every other branch gets a preview URL. Secrets such as a GitHub token go in Vercel environment variables, never in `src/`.
