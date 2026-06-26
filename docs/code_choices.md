# Recipe for a Reaction — Code choices

## Project structure

```
src/
├── app/               # Next.js App Router pages + layout
│   ├── api/           # Server-side API route handlers
│   ├── components/    # App-level components (page-specific)
│   │   ├── atoms/     # Primitive reusable UI atoms
│   │   └── styles/    # CSS files for atoms (kept separate from modules)
│   ├── history/       # /history page
│   ├── page1/         # /page1 — category selection
│   ├── page2/         # /page2 — area selection
│   ├── recommendation/# /recommendation (random) + /recommendation/[id] (by ID)
│   └── search/        # /search — dynamic search by name
├── components/        # Shared UI components (generic, reusable)
│   ├── footer/
│   ├── form/
│   ├── header/
│   ├── recipeCtas/    # Like/Dislike + action buttons (back, retry, print, share)
│   ├── recipePrint/   # Print-only recipe view
│   ├── RecommendationView/  # Main recommendation display
│   ├── shareButton/
│   └── sidebar/
├── hooks/             # Custom React hooks for data fetching
├── service/           # Business logic + external API integration
├── store/             # Zustand global state (persisted to localStorage)
│   └── slices/        # State slices (form, history)
└── types/             # TypeScript type definitions
```

## Page routes

| Route                  | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `/`                    | Homepage with three navigation links                   |
| `/page1`               | Form step 1 — select a category                        |
| `/page2`               | Form step 2 — select an area (filtered by category)    |
| `/recommendation`      | Random meal selector — fetches and redirects to `[id]` |
| `/recommendation/[id]` | Single meal view with CTAs                             |
| `/search`              | Dynamic search by name (debounced, 3+ chars)           |
| `/history`             | Full-page history with filter and sort                 |

All pages are `"use client"` except the homepage and layout (server components). Thus in order to use React hooks. As a matter of fact, maybe those hooks can be moved elsewhere leveraging SSR, but it can be investigated in the future.

## API layer

### Server-side proxy

TheMealDB requests go through a Next.js Route Handler at `src/app/api/meals/[...path]/route.ts`. This avoids CORS issues and keeps the API key server-side (from `MEALDB_API_KEY` env var, defaults to public key `"1"`). The proxy simply forwards path and query params to `https://www.themealdb.com/api/json/v1/{key}/{path}`.

### Service layer

`src/service/meal-db-service.ts` wraps all TheMealDB endpoints as typed async functions:

- `searchMealsByName(query)` — `search.php?s=`
- `getMealById(id)` — `lookup.php?i=`
- `getRandomMeal()` — `random.php`
- `getCategories()` — `categories.php`
- `filterByCategory(cat)` / `filterByArea(area)` — `filter.php`
- `filterByIngredient(ing)` — `filter.php?i=`
- `getRandomMealByFilter(cat, area, oldId?)` — composes category filter → area filter → random pick → full meal lookup

The service checks `NEXT_PUBLIC_MOCK_API=1` and switches to offline mock data from `meal-db-mock.ts` when set.

### Mock mode

`src/service/meal-db-mock.ts` provides hardcoded responses matching the real API shape, with a simulated 250ms delay. Covers categories, random, lookup, search, and filter endpoints. Used in development and tests by setting the env var.

## Custom hooks pattern

### Generic fetcher: `useApi<T>`

`src/hooks/use-api.ts` is the primitive. Takes a `fetcher: () => Promise<T>` and a dependency array, returns:

```ts
{ data: T | null, isLoading: boolean, error: string | null, refetch: () => void }
```

Features:

- Uses a `ref` to avoid stale closures in the dependency-less `refetch`
- Cancellation flag to prevent state updates after unmount
- Error handling extracts `err.message` or falls back to a generic string

### Specific hooks

All specific hooks delegate to `useApi` with a typed fetcher. They are thin wrappers — the real logic stays in the service layer:

| Hook                            | Fetcher                                                     | Re-fetch deps      |
| ------------------------------- | ----------------------------------------------------------- | ------------------ |
| `useCategories()`               | `getCategories().then(r => r.categories)`                   | `[]` (once)        |
| `useAreasByCategory(category)`  | `filterByCategory(category)` → deduplicate areas            | `[category]`       |
| `useRandomMeal(category, area)` | `getRandomMealByFilter(category, area)`                     | `[category, area]` |
| `useMealById(id)`               | `getMealById(id)` → extract first meal                      | `[id]`             |
| `useSearch()`                   | `searchMealsByName(debouncedText)` via `useDebounce(300ms)` | `[debouncedText]`  |

### Debounce

`src/hooks/use-debounce.ts` is a generic debounce hook using `setTimeout`/`clearTimeout`. Used by `useSearch` to delay API calls until the user stops typing for 300ms. The minimum search length is 3 characters to avoid flooding the API with single-character queries.

## State management

Zustand with `persist` middleware stores state in localStorage under key `"global-store"`. I preferred a global store with separated slices instead of multiple, more focused stores. Again, could have been a wise choice, but a bit confusing.

### Form slice

Tracks `category` and `area` values across the two-step form flow. Actions: `setPage1`, `setPage2`, `resetForm`.

### History slice

Tracks `calls: Call[]` — an ordered list of viewed recipes. Each call stores `recipeId`, `title`, `imageUrl`, `timestamp`, `like` (boolean | null), and `inputs` (category + area).

Actions:

- `logRequest(data)` — adds a new entry (deduplicates by recipeId)
- `remove(recipeId)` — deletes a single entry
- `setLike(recipeId, like)` — toggles like/dislike
- `resetHistory()` — clears all entries

`useShallow` from `zustand/shallow` is used in components to prevent unnecessary re-renders when picking multiple values.

## Component architecture

Two component directories:

- **`src/app/components/`** — page-specific or app-level components (`HistoryList`, `SearchResults`, atoms)
- **`src/components/`** — truly reusable, generic components (`Header`, `Footer`, `Sidebar`, `FormSelect`, `RecommendationView`, `RecipeCtas`, `ShareButton`, `RecipePrint`)

### Atoms (primitive UI)

- `Button` — generic pressed-state toggle button, uses `aria-pressed`
- `CheckboxFilter` — generic multi-select checkbox fieldset, generic over value type `<T>`
- `SortBy` — asc/desc toggle button with chevron icons and `aria-label`
- `RecipeImage` — image wrapper with placeholder fallback on error/missing src

### Compound components

- `FormSelect` — generic form select with label, error display, `aria-invalid`
- `RecommendationView` — full recipe display (image, details, like/dislike, CTAs)
- `RecipeCtas` — action bar with Back, View full recipe (external link), New idea, Print, Share
- `LikeDislikeCtas` — like/dislike toggle buttons with `aria-pressed`
- `ShareButton` — copies current URL to clipboard, shows "Copied!" feedback for 2s
- `RecipePrint` — `print-only` CSS class component, shows ingredients + instructions on print

### Layout components

- `Header` — app title with chef hat icon, links to home
- `Footer` — credits with link to author
- `Sidebar` — history panel with filter and sort, hides on homepage (`/`). Shows compact entries with date/category/area, remove button per entry.

### Legacy / unused components

Two components in `src/app/components/` are not wired into any page:

- **`History.tsx`** — standalone component with its own `useState` and a custom `HistoryData` interface (`id`, `title`, `likes`, `dislikes`). Not connected to the Zustand store. Superseded by the history page (`/history/page.tsx`) and sidebar, which use the store directly.
- **`HistoryFilter.tsx`** — filter bar using the `Button` atom with like/dislike/none toggle. Not used anywhere. The actual filtering is done via `CheckboxFilter` + `SortBy` atoms directly in the sidebar and history page.

Both are candidates for removal.

## Type system

### `src/types/`

- `meal-db.ts` — Meal, Category, Area, Ingredient types matching TheMealDB response shape. Uses a mapped `Index` type (1–20) for ingredient/measure fields.
- `form.ts` — `UserRequest` (category + area), `Page1Request`, `Page2Request`
- `history.ts` — `Call` (recipe view entry with like/timestamp/inputs), `History` (array of calls)

### Root `types/` (auto-generated by Next.js)

- `routes.d.ts` — typed route params for App Router
- `cache-life.d.ts` — `cacheLife` profile types
- `validator.ts` — compile-time validation of page/layout exports

## Styling approach

### Pure CSS with modules

- **`src/app/globals.css`** — CSS custom properties (theme tokens), reset, typography, layout grid, shared component styles, print styles
- **CSS Modules** (`.module.css`) — per-component scoped styles
- **Separate atom CSS** (`src/app/components/styles/atoms/`) — plain `.css` files imported by atom components (not modules, for global-ish reusable styles)

### Theme

Dark mode is the primary design target. Light mode degrades from it.

Variables defined in `:root` with light defaults, then overridden in `@media (prefers-color-scheme: dark)` blocks. The body uses a CSS Grid layout that adapts when the sidebar is present (`body:has(aside)`) vs absent.

Key tokens: `--color-lilac`, `--color-accent-yellow`, `--color-bg-salvia`, `--color-text-main`, `--color-white`, `--color-bg-dark`, `--color-bg-card-dark`, `--color-lilac-dark`, `--color-accent-gold`, `--color-text-primary`, `--color-text-muted`.

No component CSS file uses hardcoded hex values — all reference `var(--color-*)`.

### Print styles

Print is handled entirely via CSS. The `.print-only` class is `display: none` on screen and `display: block` on print. The `@media print` block hides the sidebar, footer, CTAs, and links, and stacks the recipe layout vertically.

## Testing

### Unit tests (Jest + @testing-library/react)

Separate `test/` directory mirroring `src/` structure:

```
test/
├── app/
│   ├── components/    # Component tests (atoms + shared)
│   ├── layout.test.tsx
│   └── page.test.tsx
├── e2e/               # Playwright E2E tests
├── fixtures/          # Hardcoded API response fixtures
│   ├── index.ts       # Re-exports all fixtures
│   ├── meals.ts       # fishPieFull, pizzaMargherita, seafoodFilterResponse, buildMeal()
│   ├── categories.ts  # mockCategoriesResponse
│   └── areas.ts       # mealsWithAreas
├── hooks/             # Hook tests (renderHook)
├── pages/             # Page tests (render + check heading + links)
├── service/           # Service function tests
├── store/             # Zustand store tests
└── utils/             # Test utilities (mock-fetch helper)
```

### Mock fetch pattern

`test/utils/mock-fetch.ts` overrides `global.fetch` with a `jest.fn()` for service-level tests. For component/hook tests, mock data comes from `test/fixtures/`.

### E2E (Playwright)

`test/e2e/happy-path.spec.ts` tests the main user flow end-to-end. Four scenarios: full form → recommendation, search → results, history → empty state + viewed recipe, and back-navigation preserves category.

## URL sharing

The recommendation pages support shareable URLs. The mechanism is detailed in `docs/url-sharing.md`. In short:

1. `/recommendation` fetches a random meal then redirects to `/recommendation/[id]?category=X&area=Y` via `router.replace()`
2. `/recommendation/[id]` resolves search criteria from three sources (priority order): URL params → store history → meal data
3. "New Idea" re-runs `getRandomMealByFilter(category, area)` when criteria are available
4. "Back" uses `router.back()` to return to the origin regardless of entry point

## Configuration files

| File                   | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `tsconfig.json`        | TypeScript config: `strict`, `bundler` moduleResolution, `@/` path alias |
| `next.config.ts`       | Next.js config: `remotePatterns` for TheMealDB image host                |
| `jest.config.ts`       | Jest via `next/jest`, jsdom environment, `@/` path mapped to `./src/`    |
| `playwright.config.ts` | Playwright: chromium only, dev server on port 3000 with `MOCK_API=1`     |
| `eslint.config.mjs`    | ESLint flat config with `eslint-config-next`                             |

## Build tooling

### NPM scripts

| Script              | Command           |
| ------------------- | ----------------- |
| `npm run dev`       | `next dev`        |
| `npm run build`     | `next build`      |
| `npm run start`     | `next start`      |
| `npm run lint`      | `eslint`          |
| `npm run typecheck` | `tsc --noEmit`    |
| `npm test`          | `jest`            |
| `npm run test:e2e`  | `playwright test` |

### Key dependencies

| Package               | Version | Purpose                                 |
| --------------------- | ------- | --------------------------------------- |
| `next`                | 16.2.9  | Framework (App Router)                  |
| `react` / `react-dom` | 19.2.4  | UI library                              |
| `zustand`             | 5.0.14  | State management + localStorage persist |
| `react-hook-form`     | 7.80.0  | Form handling and validation            |
| `lucide-react`        | 1.21.0  | Icon set                                |
| `jest`                | 30.4.2  | Test runner                             |
| `ts-jest`             | 29.4.11 | TypeScript transformer for Jest         |
| `@playwright/test`    | 1.61.1  | E2E testing                             |

The API key lives in `.env.local` as `MEALDB_API_KEY` (defaults to TheMealDB public key `"1"`). Set `NEXT_PUBLIC_MOCK_API=1` to use offline mock data.

## Accessibility

- Skip-to-content link (first focusable element, visually hidden until focused)
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<aside>`, `<nav>`, `<article>`, `<section>`, `<fieldset>`, `<legend>`)
- `aria-label` on icon-only buttons and links
- `aria-pressed` on toggle buttons (like/dislike, filter toggles)
- `aria-invalid` on form selects with validation errors
- `role="alert"` on error messages
- `role="status"` + `aria-live="polite"` on dynamic loading states
- `tabindex` management — focus-visible ring using `--color-accent-yellow`
- Lucide icons use `aria-hidden="true"` (decorative)

A full WCAG compliance report is available in `docs/wcag-report.md`.

## UI icons

Lucide React icons (`lucide-react`) replace emojis for consistency across devices. Icons are always decorative (`aria-hidden="true"`), never carry semantic meaning on their own.
