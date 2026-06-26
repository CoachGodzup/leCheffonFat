# Style Guide — Code choices

## Styling Choices

### Color Triad System
The design uses a triad color scheme based on the lilac palette:

- **Base Color (Lilac)**: `#6a5f8a` (defined as `--color-lilac`)
- **Lighter Shade**: `#a99bc8` (defined as `--color-lilac-dark`)  
- **Darker Shade**: `#7b6fb8` (used for emphasis/contrast)
- **Accent Gold**: `#c9ad81` (defined as `--color-accent-gold`)

### CSS Custom Properties (Theme Variables)

All colors must use `--color-*` variables. Root variables are defined in `src/app/globals.css`:

```css
:root {
  /* Light theme (default) */
  --color-lilac: #6a5f8a;           /* Main purple/lilac */
  --color-accent-yellow: #c4a97d;  /* Golden accent */
  --color-bg-salvia: #f5f3f0;      /* Light cream background */
  --color-text-main: #2e2a36;      /* Main text color */
  --color-white: #faf8f6;           /* White/Cream */
  
  /* Dark theme values */
  --color-bg-dark: #18161f;
  --color-bg-card-dark: #231f2e;
  --color-lilac-dark: #a99bc8;
  --color-accent-gold: #c9ad81;
  --color-text-primary: #f0eef2;
  --color-text-muted: #6a6578;
  
  --spacing: 1em;
}
```

Dark mode is the primary design target. Light mode degrades from it.

## Component Architecture

### Layout Pattern
- Create components in `src/app/components/` folder
- Each component should have both a `.tsx` and a `.css` file
- Prefer pure components for maximum reusability

### Component Structure
- **Atoms**: Primitive reusable UI atoms (`src/app/components/atoms/`)
  - CSS files kept separate in `src/app/components/styles/atoms/`
- **Generic components**: Truly reusable components (`src/components/`)
  - `Header`, `Footer`, `Sidebar`, `FormSelect`
  - `RecommendationView`, `RecipeCtas`, `ShareButton`, `RecipePrint`
- **Page-specific**: In `src/app/components/`
  - `HistoryList`, `SearchResults`

### Compound Components
- `FormSelect`: Generic form select with label, error display
- `RecommendationView`: Full recipe display with image, details, like/dislike, CTAs
- `RecipeCtas`: Action bar with Back, View full recipe, New idea, Print, Share
- `LikeDislikeCtas`: Like/dislike toggle buttons with `aria-pressed`
- `ShareButton`: Copies current URL to clipboard, shows feedback
- `RecipePrint`: `print-only` CSS class component

### Atoms (primitive UI)
- `Button`: Generic pressed-state toggle button with `aria-pressed`
- `CheckboxFilter`: Generic multi-select checkbox fieldset over type `<T>`
- `SortBy`: Ascending/descending toggle with chevron icons and `aria-label`
- `RecipeImage`: Image wrapper with placeholder fallback on error/missing src

## CSS Approach

### Styling hierarchy
- **CSS Modules** (`.module.css`) — per-component scoped styles
- **Pure CSS files** in `src/app/components/styles/atoms/` — not modules, for global-ish reusable styles
- **CSS Variables** — all colors from `src/app/globals.css` using `--color-*` naming

### Naming conventions
- Component files: PascalCase (e.g., `RecipeImage.tsx`, `RecipeImage.css`)
- Compound components: camelCase (e.g., `LikeDislikeCtas.tsx`)
- Atomic styles: no naming prefixes, descriptive class names only

### Theme colors (use from globals.css)
- All components MUST reference `var(--color-*)` instead of hardcoded values
- Dark mode takes priority — test and polish dark theme first
- If a needed color doesn't exist, use the closest one or add new `--color-*` variable

## React/Next.js Patterns

### Component structure
- Most pages are `"use client"` except homepage and layout (server components)
- Create custom hooks in `src/hooks/` for data fetching
- Use generic fetcher `useApi<T>` pattern (wrapper around `useApi`)
- Use `useShallow` from `zustand/shallow` to prevent unnecessary re-renders

### State management
- Zustand with `persist` middleware stores state in localStorage (key: `"global-store"`)
- Global store with separated slices instead of multiple focused stores
- Form slice tracks `category` and `area` across two-step form
- History slice tracks `Call[]` with `recipeId`, `title`, `imageUrl`, `timestamp`, `like`, `inputs`

### API layer
- All TheMealDB requests go through `src/app/api/meals/[...path]/route.ts` proxy
- API key from `MEALDB_API_KEY` env var, defaults to public key `"1"`
- Service layer in `src/service/meal-db-service.ts` wraps endpoints as typed async functions
- Mock mode: set `NEXT_PUBLIC_MOCK_API=1` for offline mock data from `meal-db-mock.ts`

### Testing approach
- Unit tests in `test/` directory mirroring `src/` structure
- Use Jest + `@testing-library/react`
- `test/utils/mock-fetch.ts` overrides `global.fetch` for service tests
- Component/hook tests use data from `test/fixtures/`
- E2E tests in `test/e2e/happy-path.spec.ts`

### Hooks pattern
All specific hooks delegate to `useApi` with typed fetchers:
- `useCategories()`: `getCategories().then(r => r.categories)`, deps `[]`
- `useAreasByCategory(category)`: `filterByCategory(category)`, deps `[category]`
- `useRandomMeal(category, area)`: `getRandomMealByFilter()`, deps `[category, area]`
- `useMealById(id)`: `getMealById(id)`, deps `[id]`
- `useSearch()`: `searchMealsByName(debouncedText)`, deps `[debouncedText]` via `useDebounce(300ms)`

### Form validation
- Forms and section styles should be moved out of `globals.css` or made more specific
- Use semantic HTML (`<form>`, `<section>`) with proper structure
- Add proper label, error handling, and accessibility attributes

## Accessibility rules
- Skip-to-content link (first focusable element, visually hidden until focused)
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<aside>`, `<nav>`, `<article>`, `<section>`, `<fieldset>`, `<legend>`)
- `aria-label` on icon-only buttons and links
- `aria-pressed` on toggle buttons (like/dislike, filter toggles)
- `aria-invalid` on form selects with validation errors
- `role="alert"` on error messages
- `role="status"` + `aria-live="polite"` on dynamic loading states
- Focus-visible ring using `--color-accent-yellow`
- Lucide icons use `aria-hidden="true"` (decorative)

## Print styles
- `.print-only` class is `display: none` on screen and `display: block` on print
- `@media print` block hides sidebar, footer, CTAs, and links
- Stacks recipe layout vertically

## Build/lint/testing
- Run `npm run lint` and `npx prettier --write .` before committing
- TypeScript strict mode (no `any` unless necessary)
- Semantically meaningful HTML structure
- Use `grep`/`glob` tools for file search when possible
- Always verify code with tests before committing

## Error handling
- All async operations wrapped in try-catch that rejects on failure
- Error messages should be displayed using proper ARIA roles
- Use `try-catch-finally` pattern consistently

## Component lifecycle
- Unmount cleanup with cancellation flag
- Avoid stale closures in refetch functions using refs
- Use proper dependency arrays for hooks
- Optimize re-renders with memoization where appropriate
