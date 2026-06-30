Comprehensive Project Summary: Le Cheffon Fat

1. What Is This Project?
   Le Cheffon Fat is a two-step recipe recommender web application built with Next.js. It helps users decide what to cook by:

- Recommending a random meal filtered by category + area (a two-step wizard).
- Allowing dynamic search by recipe name.
- Tracking history with likes/dislikes for past recommendations.
  The name is a playful pun on "Le Chat" (a French AI meme from 2026) and "chef."
- README.md, line 1-13 (ASCII art logo), line 21: "Two-step recipe recommender app, built with Next.js that uses TheMealDB API"
- package.json, line 2: "name": "le-cheffon-fat", version 0.1.2
- LICENSE: MIT

2. Tech Stack
   Layer Technology Version Key File(s)
   Framework Next.js (App Router) 16.2.9 package.json:18
   UI Library React / React DOM 19.2.4 package.json:19-20
   Language TypeScript (strict) 5.x tsconfig.json
   State Management Zustand + persist middleware 5.0.14 package.json:22, src/store/index.ts
   Form Handling react-hook-form 7.80.0 package.json:21
   Icons lucide-react 1.21.0 package.json:17
   CSS Pure CSS Modules + global CSS vars — src/app/globals.css, various .module.css/.css files
   External API TheMealDB (public key = "1") — src/service/meal-db-service.ts
   Testing (Unit) Jest + @testing-library/react Jest 30.4.2 jest.config.ts, jest.setup.ts
   Testing (E2E) Playwright 1.61.1 playwright.config.ts
   Linting ESLint (flat config) + eslint-plugin-unicorn ESLint 9 eslint.config.mjs
   Formatting Prettier + import sort plugin — .prettierrc
   Transpiler ts-jest 29.4.11 package.json:40
   Deploy Netlify — netlify.toml
3. Main Features & Pages
   All page routes and their files:
   Route File Purpose
   / src/app/page.tsx:10-26 Homepage — welcome hero with 3 nav links: "Inspire me!", "Search", "Last recipes"
   /page1 src/app/page1/page.tsx Wizard Step 1 — select a category via <FormSelect>, uses useCategories() hook
   /page2 src/app/page2/page.tsx Wizard Step 2 — select an area (filtered by chosen category), uses useAreasByCategory()
   /recommendation src/app/recommendation/page.tsx Fetches random meal by category+area, then router.replace() to /[id]?category=X&area=Y
   /recommendation/[id] src/app/recommendation/[id]/page.tsx Full recipe detail — image, ingredients, instructions, like/dislike, CTAs (back, view full recipe, new idea, print, share)
   /search src/app/search/page.tsx Dynamic search by recipe name with debounce (300ms, min 3 chars)
   /history src/app/history/page.tsx Full-page history with filter by rating (liked/disliked/unrated) and sort by date
   API Route:
   Route File Purpose
   /api/meals/[...path] src/app/api/meals/[...path]/route.ts Server-side proxy to TheMealDB — avoids CORS, hides API key from client
4. Project Structure
   leCheffonFat/
   ├── AGENTS.md # AI agent instructions (commit conventions, code quality rules)
   ├── README.md # Project overview and getting started
   ├── package.json # Dependencies and scripts
   ├── tsconfig.json # TypeScript config (strict, @/ alias)
   ├── next.config.ts # Next.js config (remote image patterns)
   ├── jest.config.ts # Jest config (jsdom, @/ alias)
   ├── jest.setup.ts # Jest setup (@testing-library/jest-dom)
   ├── playwright.config.ts # Playwright config (chromium, MOCK_API=1)
   ├── eslint.config.mjs # ESLint flat config (next + unicorn)
   ├── .prettierrc # Prettier with import sorting
   ├── netlify.toml # Netlify deploy config
   ├── .env_example # Env var template
   ├── .gitignore
   ├── types/ # Auto-generated Next.js types
   │ ├── routes.d.ts # Route param types
   │ ├── cache-life.d.ts # CacheLife types
   │ └── validator.ts # Export validation
   │
   ├── src/
   │ ├── app/ # Next.js App Router pages
   │ │ ├── layout.tsx # Root layout (Header, main, Sidebar, Footer)
   │ │ ├── page.tsx # Homepage
   │ │ ├── page.module.css # Homepage styles
   │ │ ├── globals.css # Global CSS vars, reset, theme, utilities
   │ │ ├── page1/ # Category selection wizard step
   │ │ │ ├── page.tsx
   │ │ │ └── page1.module.css
   │ │ ├── page2/ # Area selection wizard step
   │ │ │ ├── page.tsx
   │ │ │ └── page2.module.css
   │ │ ├── search/ # Dynamic search
   │ │ │ ├── page.tsx
   │ │ │ └── search.module.css
   │ │ ├── recommendation/
   │ │ │ ├── page.tsx # Random meal (redirects to [id])
   │ │ │ └── [id]/
   │ │ │ └── page.tsx # Meal detail view
   │ │ ├── history/
   │ │ │ ├── page.tsx # History page
   │ │ │ └── history.module.css
   │ │ └── api/meals/[...path]/
   │ │ └── route.ts # TheMealDB proxy
   │ │
   │ ├── components/ # Atomic Design components
   │ │ ├── atoms/
   │ │ │ ├── Button/ # Generic toggle button with aria-pressed
   │ │ │ ├── CheckboxFilter/ # Generic multi-checkbox fieldset
   │ │ │ ├── RecipeImage/ # Next/Image wrapper with error placeholder
   │ │ │ ├── ShareButton/ # Clipboard share with "Copied!" feedback
   │ │ │ └── SortBy/ # Asc/desc toggle with chevron
   │ │ ├── molecules/
   │ │ │ ├── FormSelect/ # Controlled select for react-hook-form
   │ │ │ ├── RecipeCtas/ # LikeDislikeCtas + RecipeCtas (action bar)
   │ │ │ └── RecipePrint/ # Print-only ingredient/instruction view
   │ │ └── organisms/
   │ │ ├── Header/ # Site header with home link
   │ │ ├── Footer/ # Site footer with attribution
   │ │ ├── Sidebar/ # History sidebar (filter, sort, remove)
   │ │ └── RecommendationView/ # Full recipe display organism
   │ │
   │ ├── hooks/ # Custom React hooks
   │ │ ├── use-api.ts # Generic async fetcher (data/loading/error/refetch)
   │ │ ├── use-categories.ts # Fetches categories
   │ │ ├── use-areas-by-category.ts # Fetches areas filterable by category
   │ │ ├── use-random-meal.ts # Fetches random meal by category+area
   │ │ ├── use-meal-by-id.ts # Fetches meal by ID
   │ │ ├── use-search.ts # Debounced search hook
   │ │ └── use-debounce.ts # Generic debounce hook
   │ │
   │ ├── service/ # Business logic + API integration
   │ │ ├── meal-db-service.ts # All TheMealDB endpoints + composition functions
   │ │ └── meal-db-mock.ts # Offline mock data fixture
   │ │
   │ ├── store/ # Zustand state management
   │ │ ├── index.ts # Composed store with persist (localStorage)
   │ │ └── slices/
   │ │ ├── form-slice.ts # Form state (category, area)
   │ │ └── history-slice.ts # History state (calls[], likes)
   │ │
   │ └── types/ # TypeScript type definitions
   │ ├── meal-db.ts # Meal, Category, Area, Ingredient, responses
   │ ├── form.ts # UserRequest, Page1Request, Page2Request
   │ └── history.ts # Call, History
   │
   ├── docs/ # Documentation
   │ ├── technical_specs.md # Architecture & technical decisions
   │ ├── code_guide.md # Code conventions, project map, testing guide
   │ ├── graphics_guide.md # Color system, typography, layout, CSS tokens
   │ └── wcag-report.md # WCAG accessibility audit (20 issues found)
   │
   ├── agents/ # AI agent reference files (kept in sync with code)
   │ ├── components.md # Component registry (names, paths, props)
   │ ├── services.md # Service/hook registry
   │ ├── types.md # Type definitions
   │ ├── pages.md # Page/routing table
   │ └── store.md # Store slices
   │
   ├── test/ # Tests
   │ ├── app/
   │ │ ├── layout.test.tsx # Root layout test
   │ │ ├── page.test.tsx # Homepage test
   │ │ └── components/ # Component tests
   │ │ ├── atoms/RecipeImage.test.tsx
   │ │ ├── CheckboxFilter.test.tsx
   │ │ ├── FormSelect.test.tsx
   │ │ ├── RecipePrint.test.tsx
   │ │ ├── RecommendationView.test.tsx
   │ │ └── ShareButton.test.tsx
   │ ├── pages/ # Page tests
   │ │ ├── page1.test.tsx
   │ │ ├── page2.test.tsx
   │ │ ├── recommendation.test.tsx
   │ │ └── recommendation-id.test.tsx
   │ ├── hooks/ # Hook tests (6 files)
   │ ├── service/ # Service tests (2 files)
   │ ├── store/ # Store tests (2 files)
   │ ├── e2e/happy-path.spec.ts # Playwright E2E (4 scenarios)
   │ ├── fixtures/ # Mock data (meals, categories, areas)
   │ └── utils/mock-fetch.ts # Test fetch helpers
   │
   └── public/ # Static assets (SVG icons)
5. Key Architectural Decisions & Patterns
   5.1 Two-Step Wizard Flow

- /page1 selects a category (stores in Zustand via setPage1)
- /page2 selects an area filtered by that category (stores via setPage2)
- Both use react-hook-form for validation
- On submit, navigates to /recommendation which fetches a random meal matching both criteria, then redirects to /recommendation/[id]?category=X&area=Y
- Source: src/app/page1/page.tsx:43-47, src/app/page2/page.tsx:45-48, src/app/recommendation/page.tsx:25-29
  5.2 URL-Sharing & State Resolution
- /recommendation/[id] resolves search criteria from 3 sources in priority order:

1. URL search params (?category=X&area=Y)
2. Store history entry (previous visit)
3. Meal data itself (strCategory, strArea)

- Source: src/app/recommendation/[id]/page.tsx:30-45
  5.3 State Management
- Zustand with persist middleware stores to localStorage under key "global-store"
- Two slices: FormSlice (category, area) and HistorySlice (calls[], like/dislike, timestamps)
- Safe localStorage wrapper with try-catch for SSR/privacy mode: src/store/index.ts:9-31
- Uses useShallow from zustand/shallow to prevent unnecessary re-renders
- Source: src/store/index.ts:33-44
  5.4 Data Fetching Pattern (Custom Hooks)
- Generic useApi<T>(fetcher, deps) hook provides: { data, isLoading, error, refetch }
- Uses useRef to avoid stale closures in refetch
- Cancellation flag to prevent state updates after unmount
- All specific hooks are thin wrappers calling the service layer
- Source: src/hooks/use-api.ts:13-74
  5.5 API Layer
- Server-side proxy via Next.js Route Handler at src/app/api/meals/[...path]/route.ts to avoid CORS and keep API key server-side
- Service layer (src/service/meal-db-service.ts) wraps all TheMealDB endpoints as typed async functions
- Composable predicates pattern: byArea(), extractMeals(), pickRandom(), fetchFullMeal() compose via .then() chains
- Example: getRandomMealByFilter(category, area) at line 74-84 chains: filterByCategory -> extractMeals -> filter by area -> pickRandom -> fetchFullMeal
- Mock mode: Set NEXT_PUBLIC_MOCK_API=1 to use meal-db-mock.ts (offline data, 250ms simulated delay)
- Source: src/service/meal-db-service.ts:13-27 (request wrapper), src/service/meal-db-mock.ts (mock data)
  5.6 Atomic Design
- Atoms: Button, CheckboxFilter, RecipeImage, ShareButton, SortBy
- Molecules: FormSelect, RecipeCtas, RecipePrint, LikeDislikeCtas
- Organisms: Header, Footer, Sidebar, RecommendationView
- Each component in its own subfolder with .tsx and a style file (.module.css or .css)
- Source: src/components/atoms/, src/components/molecules/, src/components/organisms/
  5.7 Theme System
- All colors via CSS custom properties in src/app/globals.css (lines 5-23)
- Dark mode via @media (prefers-color-scheme: dark) (lines 25-44)
- Triad color scheme: lilac base (#6a5f8a), accent gold (#c9ad81), salvia background
- Typography: Plus Jakarta Sans (headings, weight 800), Inter (body, weight 400)
- Grid layout with sidebar: body:has(aside) uses 1fr 3fr columns
- Source: docs/graphics_guide.md, src/app/globals.css
  5.8 Accessibility (WCAG AA target)
- Skip-to-content link, semantic HTML landmarks, ARIA attributes
- aria-label on icon buttons, aria-pressed on toggles, aria-invalid on forms
- role="alert" on errors, role="status" + aria-live="polite" on loading
- Focus-visible ring with --color-accent-yellow
- Full WCAG audit in docs/wcag-report.md (20 issues: 5 critical, 7 major, 8 minor)
  5.9 Code Quality Rules (AGENTS.md)
- Strict TypeScript (no any), type not interface for props
- Prettier-enforced import order: node: -> third-party -> @/ -> relative
- ESLint with eslint-plugin-unicorn (enforces kebab-case + PascalCase filenames)
- Try-catch on all async operations, reject on failure
- Run npx prettier --write . and npm run lint before every commit
- git flow branching: main + develop, feature branches merge into develop
  5.10 Testing Strategy
- Unit tests: Jest + @testing-library/react, separate test/ directory mirroring src/
- E2E: Playwright, test/e2e/happy-path.spec.ts covers 4 scenarios
- Mock fetch: test/utils/mock-fetch.ts overrides global.fetch for service tests
- Fixtures: test/fixtures/ provides typed mock API responses (meals, categories, areas)
- Playwright runs with NEXT_PUBLIC_MOCK_API=1 for deterministic E2E
- Source: jest.config.ts, playwright.config.ts, test/ directory
  5.11 Error Handling Pattern
- src/service/meal-db-service.ts:17-22: try-catch pattern for async operations
- API route handler (line 30-38): catches errors, returns JSON with status 500
- UI: errors displayed with role="alert" for screen readers

6. Docs/ and Agents/ Folder Contents
   docs/ (4 files)
   File Content
   docs/technical_specs.md 113 lines — Full architectural decisions: why Next.js, TypeScript, Zustand, react-hook-form, pure CSS, TheMealDB, mock offline, testing strategy, and AI assistance explanation
   docs/code_guide.md 311 lines — Comprehensive project map, page routes table, API layer docs, custom hooks table, state management, component architecture, type system, testing structure, code style, config/build, accessibility summary, error handling, UI icons
   docs/graphics_guide.md 241 lines — Color system (triad palette), CSS variables, typography (Plus Jakarta Sans + Inter), layout grid, spacing scale, component styles (header, footer, sidebar, cards, buttons, forms), micro-interactions, print styles, accessibility, variable naming convention, theme development
   docs/wcag-report.md 228 lines — Full WCAG 2.2 AA audit: 20 issues (5 critical, 7 major, 8 minor) with code locations and fixes
   agents/ (5 files — AI agent reference, kept in sync with code)
   File Content
   agents/components.md 29 lines — Registry of all 14 components (5 atoms, 4 molecules, 4 organisms) with file paths, prop types, descriptions
   agents/services.md 21 lines — Registry of 2 services + 7 hooks with descriptions
   agents/types.md 7 lines — Registry of 3 type modules with exports
   agents/pages.md 18 lines — 7 page routes + 1 API route with file paths and descriptions
   agents/store.md 7 lines — 3 store files (index + 2 slices) with descriptions
   AGENTS.md (root)
   83 lines — AI agent instructions covering: commit conventions (conventional commits, git flow), component creation rules (atomic design, unit tests), security (env vars), code quality (strict TypeScript, pure CSS, try-catch, import sorting), color rules (CSS vars only, dark mode priority), testing requirements.
