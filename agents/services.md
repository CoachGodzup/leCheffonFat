# Services

| File                                   | Description                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `src/service/meal-db-service.ts`       | TheMealDB API (via local proxy) — search meals by name, get by ID, random, categories, filter by category/area/ingredient, list areas |
| `src/app/api/meals/[...path]/route.ts` | Next.js Route Handler — proxies TheMealDB requests server-side, injects API key from `.secret`                                        |
