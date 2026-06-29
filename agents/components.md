# Components

## Atoms

| Component      | File                                                     | Props                                                                                     | Description                                                                      |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Button         | `src/components/atoms/Button/Button.tsx`                 | `{ text: ReactNode; click: () => void; active: boolean }`                                 | Toggle button with active state (`aria-pressed`). Uses global CSS.               |
| CheckboxFilter | `src/components/atoms/CheckboxFilter/CheckboxFilter.tsx` | `{ legend: string; options: Option<T>[]; value: T[]; onChange: (selected: T[]) => void }` | Generic `<fieldset>` of checkboxes — toggles items in/out of the selected array. |
| RecipeImage    | `src/components/atoms/RecipeImage/RecipeImage.tsx`       | `ComponentProps<typeof Image>` (Next.js Image)                                            | Wraps `next/image` with error handling; shows placeholder on failure.            |
| ShareButton    | `src/components/atoms/ShareButton/ShareButton.tsx`       | None                                                                                      | Copies current URL to clipboard; shows "Copied!" feedback for 2s.                |
| SortBy         | `src/components/atoms/SortBy/SortBy.tsx`                 | `{ value: Sort; onChange: (sort: Sort) => void }` (`Sort = "asc" \| "desc"`)              | Toggle button cycling asc/desc with chevron icon.                                |

## Molecules

| Component       | File                                                      | Props                                                                                                    | Description                                                                                              |
| --------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| FormSelect      | `src/components/molecules/FormSelect/FormSelect.tsx`      | `{ label: string; name: Path<T>; options: Option[]; error?: string; register: UseFormRegister<T> }` | Controlled `<select>` integrated with `react-hook-form`; shows error with `role="alert"`.           |
| FormStep        | `src/components/molecules/FormStep/FormStep.tsx`          | `{ title, heading, subtitle?, fieldLabel, fieldName, options, submitLabel, isLoading, fetchError, storeValue, onSubmit, backHref?, backLabel? }` | Shared wizard step — renders heading, `<FormSelect>`, submit button, error, optional back link. Used by Page1 and Page2. |
| LikeDislikeCtas | `src/components/molecules/RecipeCtas/LikeDislikeCtas.tsx` | `{ likeFn: (like: boolean) => void; currentLike: boolean \| null }`                                 | Thumbs up/down buttons; highlights active choice via `aria-pressed`.                                |
| RecipeCtas      | `src/components/molecules/RecipeCtas/RecipeCtas.tsx`      | `{ retryFn: () => void; meal: Meal \| null; onBack?: () => void }`                                       | Action bar: back, external recipe link, new idea, print, share.                                          |
| RecipeCard      | `src/components/molecules/RecipeCard/RecipeCard.tsx`      | `{ id: string; title: string; imageUrl: string; category: string; area: string; tags?: string \| null }` | Search result card with image, title, category/area, and optional tags. Links to `/recommendation/[id]`. |
| RecipePrint     | `src/components/molecules/RecipePrint/RecipePrint.tsx`    | `{ meal: Meal }`                                                                                         | Print-only view with ingredient list and full instructions. Hidden on screen via `.print-only` CSS.      |

## Organisms

| Component          | File                                                                 | Props                                                                                    | Description                                                                                                                    |
| ------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Footer             | `src/components/organisms/Footer/Footer.tsx`                         | None                                                                                     | Site footer with attribution and GitHub link.                                                                                  |
| Header             | `src/components/organisms/Header/Header.tsx`                         | None                                                                                     | Site header with ChefHat icon and home link.                                                                                   |
| RecommendationView | `src/components/organisms/RecommendationView/RecommendationView.tsx` | `{ data: Meal \| null; isLoading: boolean; error: string \| null; refetch: () => void }` | Full recipe recommendation view: image, details, CTAs, like/dislike. Logs to store on meal load.                               |
| Sidebar            | `src/components/organisms/Sidebar/Sidebar.tsx`                       | None (reads from zustand store)                                                          | History list with CheckboxFilter (liked/disliked/unrated), SortBy toggle, scrollable entries with remove. Hidden on home page. |
