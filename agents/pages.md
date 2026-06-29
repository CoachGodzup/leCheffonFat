# Pages & Routing

| Route                  | File                                   | Description                                                                                          |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/`                    | `src/app/page.tsx`                     | Home page — welcome hero with nav links to `/page1`, `/search`, `/history`                           |
| `/layout`              | `src/app/layout.tsx`                   | Root layout — renders `<Header>`, `<main>`, `<Sidebar>`, `<Footer>`                                  |
| `/page1`               | `src/app/page1/page.tsx`               | Wizard step 1 — category `<FormStep>` via `react-hook-form`, stores to zustand                       |
| `/page2`               | `src/app/page2/page.tsx`               | Wizard step 2 — area `<FormStep>` filtered by chosen category, then navigates to `/recommendation`   |
| `/recommendation`      | `src/app/recommendation/page.tsx`      | Reads category/area from store, fetches random meal, redirects to `/recommendation/{id}`             |
| `/recommendation/[id]` | `src/app/recommendation/[id]/page.tsx` | Fetches meal by ID, renders `<RecommendationView>`, supports "new idea" refetch                      |
| `/search`              | `src/app/search/page.tsx`              | Text input with `useSearch` (debounced), renders matching meals with `<RecipeImage>`                 |
| `/history`             | `src/app/history/page.tsx`             | History page — `<CheckboxFilter>` by like/dislike, `<SortBy>`, scrollable recipe list                |

## API Routes

| Route                  | File                                   | Description                                                |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `/api/meals/[...path]` | `src/app/api/meals/[...path]/route.ts` | Proxies TheMealDB server-side, injects API key from `.env` |
