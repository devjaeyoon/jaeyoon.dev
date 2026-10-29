# Repository Guidelines

## Project Structure & Module Organization

This repository is an Astro 6 blog with React islands and MDX content.

- `src/pages/` defines routes, including dynamic post pages and the RSS feed.
- `src/layouts/` contains shared Astro page shells.
- `src/components/astro/` holds static UI; `src/components/react/` holds interactive,
  client-hydrated components.
- `src/lib/` contains reusable TypeScript helpers, while `src/styles/` contains global CSS.
- `content/` stores posts as `index.mdx` files with colocated images. `about/` stores the
  About-page content.
- `public/` contains assets copied unchanged to the built site.

Use the `@/*` alias for imports rooted at `src/`.

## Build, Test, and Development Commands

Use Node.js 22.12 or newer and pnpm (the lockfile is committed).

- `pnpm install` installs exact dependencies.
- `pnpm dev` starts Astro's local development server.
- `pnpm build` creates the production site in `dist/` and validates Astro content.
- `pnpm preview` serves the production build locally.
- `pnpm lint` runs Biome checks without modifying files.
- `pnpm lint:fix` applies safe lint fixes; `pnpm format` formats supported files.

## Coding Style & Naming Conventions

Biome enforces two-space indentation, 100-character lines, double quotes, semicolons,
trailing commas, and organized imports. Run `pnpm lint` before committing. Use
`PascalCase` for Astro and React component files, `camelCase` for functions and variables,
and lowercase route filenames. Keep framework-specific components in their existing
`astro/`, `react/`, or `mdx/` directories.

For posts, place content and media together (for example,
`content/topic/index.mdx` and `content/topic/cover.png`). Frontmatter must satisfy
`src/content.config.ts`; dates use `YYYY.MM.DD`.

## Testing Guidelines

No automated test framework or coverage target is currently configured. Treat
`pnpm lint` and `pnpm build` as the required checks for every change. For UI updates,
also inspect affected routes with `pnpm dev`, checking responsive layout, dark mode,
links, and MDX rendering. If tests are introduced, colocate them with source files as
`*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Recent commits use a capitalized type and concise subject, such as
`Feat: biome + astro 마이그레이션` or `Docs: README 업데이트`. Follow the same
`Feat:`, `Fix:`, `Docs:`, or `Chore:` pattern and keep each commit focused.

Pull requests should explain the purpose and notable implementation choices, link any
related issue, and report the commands run. Include before/after screenshots for visual
changes and call out content-schema, routing, or deployment changes explicitly.
