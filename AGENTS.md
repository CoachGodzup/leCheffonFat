<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commits

- Use conventional commits (e.g. `feat:`, `fix:`, `chore:`, `test:`, `docs:`).
- Use imperative verbs: "add X"
- Be short: 70 chars max
- Before committing, run `npx prettier --write .` and `npm run lint` to ensure formatting and lint consistency.
- Stage only the intended files; never commit secrets or env files.

## React Components

- Create components in 'src/app/components' folder.
- in the same folder, there should be a '.tsx' and a '.css' file.
- when you create a component, create the unit test
- prefer pure components

## Security

- API keys and secrets go in `.env.local` at the project root (`KEY=VALUE` format).
- `.env*` files are in `.gitignore` — never commit them.
- Access via `process.env.KEY` (Next.js loads `.env.local` automatically).

## Code quality

- Write semantic, accessible HTML — use proper landmarks, heading hierarchy, alt text, labels, and ARIA attributes where needed.
- Run WCAG checks locally with tools like `axe-core` or the Accessibility panel in DevTools.
- Use strict TypeScript; avoid `any` unless absolutely necessary.
- Prefer pure CSS (modules) — no CSS frameworks.
- use helper functions whenever possible, and save it in a './src/service' folder. Update or create a '/agents/services.md' file as a list of every available services. Keep it updated, and search there before creating other overlapping services.
- Create short functions
- Prefer arrow functions over `function` declarations
- Wrap every async operation in a try-catch that rejects on failure. See `src/service/meal-db-service.ts:17-22` for the pattern.

## Colors

- **Always** use colors from `src/app/globals.css` CSS custom properties (`var(--color-*)`).
- If a needed color doesn't exist, find the closest one in `globals.css`; if none is close enough, add a new `--color-*` variable (both light and dark variants).
- **Dark mode takes priority** — test and polish the dark theme first, then ensure light mode degrades well.
- All component CSS module files should reference `var(--color-*)`, never hardcoded hex values.

## Testing

- Unit tests use Jest + `@testing-library/react`.
- Run tests with `npm test` before committing.

### Where to place tests

- **Page tests**: `test/pages/[name].test.tsx` (e.g. `test/pages/page1.test.tsx`)
- **Component tests**: `test/app/components/[name].test.tsx` mirroring `src/app/components/`
- **Layout/utility tests**: `test/app/` mirroring `src/app/`

### What to test for pages

- Renders without crashing.
- Heading or main title is present.
- All navigation Links are rendered with correct `href`.

### What to test for components

- Renders without crashing.
- Key content / props are displayed.
- User interactions (click, input) trigger expected behavior.
