# URL sharing & persistent "New Idea"

## Problem

The recommendation page URL (`/recommendation`) was not shareable — it contained neither the meal ID nor the search criteria. The `ShareButton` copied a URL that would show a *different* random recipe when opened by someone else. Moreover, the `/recommendation/[id]` page (used from History and Search) had no "New Idea" functionality, since it had no access to the search criteria that produced that recipe.

## Solution

The recommendation flow now enriches the URL with both the meal ID and the search criteria as query parameters, and the `/recommendation/[id]` page resolves criteria from multiple sources so that "New Idea" works regardless of how the user arrived.

### Flow

1. User completes the form → navigates to `/recommendation`
2. `useRandomMeal(category, area)` loads a recipe from the API
3. Once data arrives, `router.replace()` redirects to `/recommendation/[mealId]?category=X&area=Y`
4. The `ShareButton` copies the full URL, which now contains everything needed

### Criteria resolution (priority order)

On `/recommendation/[id]/page.tsx`, the category and area for "New Idea" are resolved from three sources:

| Priority | Source | Use case |
|----------|--------|----------|
| 1 | URL search params (`?category=...&area=...`) | Shared URL |
| 2 | Store history (`calls[].inputs`) | Coming from History |
| 3 | Meal data (`strCategory`/`strArea`) | Coming from Search |

When criteria are available, clicking "New Idea" calls `getRandomMealByFilter(category, area)` directly and navigates to the new result via `router.push()`. When they are not (edge case), it falls back to the previous behavior (refetching the same meal by ID).

### Back navigation

The "Back" button now uses `router.back()` instead of a hardcoded `<Link href={...}>`. This naturally returns the user to wherever they came from (form, history, search, or shared link origin) without needing to detect the source.

## Impact

- **`src/app/recommendation/page.tsx`** — redirect to `/recommendation/[id]?category=X&area=Y` after fetch
- **`src/app/recommendation/[id]/page.tsx`** — resolve criteria from URL params, store history, or meal data; expose custom "New Idea" handler
- **`src/components/RecommendationView/RecommendationView.tsx`** — removed `backHref` prop, use `router.back()`
- **`src/components/recipeCtas/RecipeCtas.tsx`** — removed `backHref` prop, accept `onBack` callback
- **`test/pages/recommendation.test.tsx`** — updated for redirect behavior
- **`test/pages/recommendation-id.test.tsx`** — tests for all three criteria sources + New Idea navigation
- **`test/app/components/RecommendationView.test.tsx`** — updated for router mock + back button
