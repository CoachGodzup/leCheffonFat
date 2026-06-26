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
- There's two branches: `main` and `develop`. Please use `git flow` branching convention, create a new branch for each prompt you get, and merge into `develop`. Be careful if it's a feature or an hotfix, and merge accordingly.

## React Components

- Create components in 'src/components/' using atomic design: atoms/, molecules/, organisms/.
- Each component in its own subfolder with a `.tsx` and a `.module.css` file.
- When you create a component, create the unit test.
- Prefer pure components.

See full guidelines in `/docs/code_guide.md` (code) and `/docs/graphics_guide.md` (graphics).

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
- Always use `type` (not `interface`) for component props
- Create short functions
- Prefer arrow functions over `function` declarations
- Wrap every async operation in a try-catch that rejects on failure. See `src/service/meal-db-service.ts:17-22` for the pattern.
- **Prettier** sorts imports (third-party → `@/` → relative) and orders `package.json` fields. Run `npx prettier --write .` before committing.
- **ESLint** uses `eslint-plugin-unicorn` on top of Next.js defaults. Run `npm run lint` before committing; it must pass with zero warnings.

## Colors

- **Always** use colors from `src/app/globals.css` CSS custom properties (`var(--color-*)`).
- If a needed color doesn't exist, find the closest one in `globals.css`; if none is close enough, add a new `--color-*` variable (both light and dark variants).
- **Dark mode takes priority** — test and polish the dark theme first, then ensure light mode degrades well.
- All component CSS module files should reference `var(--color-*)`, never hardcoded hex values.

## Testing

- Unit tests use Jest + `@testing-library/react`.
- Run tests with `npm test` before committing.

- E2E tests live in `test/e2e/` and use Playwright. Run with `npm run test:e2e`.

### Where to place tests

- **Page tests**: `test/pages/[name].test.tsx` (e.g. `test/pages/page1.test.tsx`)
- **Component tests**: `test/app/components/[name].test.tsx` mirroring `src/components/`
- **Layout/utility tests**: `test/app/` mirroring `src/app/`

### What to test for pages

- Renders without crashing.
- Heading or main title is present.
- All navigation Links are rendered with correct `href`.

### Cleanup

- When removing a component, class, or module, always remove its corresponding test file(s) too.

### What to test for components

- Renders without crashing.
- Key content / props are displayed.
- User interactions (click, input) trigger expected behavior.
