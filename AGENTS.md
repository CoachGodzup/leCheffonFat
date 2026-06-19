<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commits

- Use conventional commits (e.g. `feat:`, `fix:`, `chore:`, `test:`, `docs:`).
- Use imperative: "add X"
- Be short: 70 chars max
- Before committing, run `npx prettier --write .` and `npm run lint` to ensure formatting and lint consistency.
- Stage only the intended files; never commit secrets or env files.

## React Components

- Create components in 'src/app/components' folder.
- in the same folder, there should be a '.tsx' and a '.css' file.
- when you create a component, create the unit test
- prefer pure components

## Code quality

- Write semantic, accessible HTML — use proper landmarks, heading hierarchy, alt text, labels, and ARIA attributes where needed.
- Run WCAG checks locally with tools like `axe-core` or the Accessibility panel in DevTools.
- Use strict TypeScript; avoid `any` unless absolutely necessary.
- Prefer pure CSS (modules) — no CSS frameworks.
- use helper functions whenever possible, and save it in a './src/service' folder. Update or create a '/agents/services.md' file as a list of every available services. Keep it updated, and search there before creating other overlapping services.
- Create short functions

## Testing

- Unit tests use Jest + `@testing-library/react`.
- Place test files in a separate folder (./test) that mirrors ./src tree.
- Every page or component should have a test covering:
  - Renders without crashing.
  - Key content / interactions.
- Run tests with `npm test` before committing.
