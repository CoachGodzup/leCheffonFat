# Services

| File                                   | Description                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `src/service/meal-db-service.ts`       | TheMealDB API (via local proxy) — search meals by name, get by ID, random, categories, filter by category/area/ingredient, list areas |
| `src/app/api/meals/[...path]/route.ts` | Next.js Route Handler — proxies TheMealDB requests server-side, injects API key from `.secret`                                        |
| `src/hooks/use-api.ts`                 | Generic primitive — async fetcher with loading/error/data/refetch state                                                               |
| `src/hooks/use-categories.ts`          | Wraps `getCategories()` — returns `UseApiReturn<Category[]>`                                                                          |
| `src/hooks/use-areas.ts`               | Wraps `listAreas()` — returns `UseApiReturn<Area[]>`                                                                                  |
| `src/hooks/use-random-meal.ts`         | Wraps `getRandomMealByFilter(category, area)` — returns `UseApiReturn<Meal>`, refetches when category/area change                     |
