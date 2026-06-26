# WCAG Report — leCheffonFat

**WCAG** (Web Content Accessibility Guidelines) is the W3C standard for making
the web accessible to people with disabilities. This project targets **WCAG 2.2
level AA**. Below is a breakdown of what's implemented in the code and what gaps
remain.

---

## What's Done Well

### Semantic HTML & Landmarks

- `<html lang="en">` declares the page language
- `<a class="skip-link" href="#main-content">` skips repetitive navigation
  (WCAG 2.4.1)
- `<header>`, `<main id="main-content">`, `<aside>` (with `aria-labelledby`),
  `<footer>` define the main landmarks
- `<nav aria-label="Main navigation">`, `<section>`, `<article>`, `<form>`,
  `<fieldset><legend>` structure the content

### ARIA Attributes

- `aria-label` on every icon button (`Like`, `Dislike`, `Share link`,
  `Back to previous page`, `Remove ${title}`, etc.)
- `aria-pressed` on like/dislike buttons and filters
- `aria-invalid` on form selects when validation fails
- `aria-hidden="true"` on all decorative icons (ChefHat, Utensils,
  ThumbsUp/Down, X, Chevron, RefreshCw)
- `role="alert"` on all error messages
- `role="status"` / `aria-live="polite"` on loading states and dynamic results
  (e.g. search)
- `role="img"` with `aria-label` on image placeholders

### Keyboard Navigation

- `:focus-visible` with `outline: 2px solid var(--color-accent-yellow)` on all
  interactive elements (WCAG 2.4.7)
- All buttons, links, selects, and checkboxes are natively keyboard-focusable

### Images

- `alt` text always provided (dish name), enforced by
  `ComponentProps<typeof Image>` type
- Placeholder uses `role="img"` and `aria-label` when the image is unavailable

### Colors & Theming

- All colors use `var(--color-*)` from `globals.css` — no hardcoded hex values
- Two themes (light/dark) via `@media (prefers-color-scheme)`, contrast
  guaranteed by the variable palette
- Dark mode is the priority theme

### Print

- `@media print` in `globals.css` hides navigation, sidebar, and CTAs; shows
  only ingredients and instructions in a single-column layout

### Page Titles

- Every page sets a unique `<title>` via `useEffect`

---

## Critical Issues (must fix)

### 1. Incorrect `role="contentinfo"` on `<nav>`

`src/app/search/page.tsx:63` — Each search result wraps its text in
`<nav role="contentinfo">`. `contentinfo` is a top-level landmark reserved for
footer content. Having multiple instances breaks screen reader landmark
navigation (WCAG 1.3.6, 4.1.2).

**Fix**: Replace with `<div>` or plain `<p>` elements.

### 2. Duplicate `main` landmark

`src/components/molecules/RecipePrint/RecipePrint.tsx:20` —
`<article role="main">` creates a second `main` landmark. The layout already
provides `<main id="main-content">`. Only one `main` per document is allowed
(WCAG 1.3.6).

**Fix**: Remove `role="main"` from the `<article>`.

### 3. Color contrast failure on search result metadata

`src/app/search/search.module.css:81-85` — `.result [role="contentinfo"] p`
uses `color: var(--color-text-muted)` with `opacity: 0.8`,
`font-weight: 100`, and `font-size: 0.85em`. Effective contrast is below 4.5:1
in both light mode (~4.2:1) and dark mode (~3.5:1). The thin weight (100)
further reduces readability (WCAG 1.4.3).

**Fix**: Remove `opacity: 0.8`, use `font-weight: 400` minimum, and ensure
contrast ≥ 4.5:1.

### 4. Heading levels skipped

`src/app/search/page.tsx:22,64` — The search page has `<h1>Search page</h1>`
then `<h4>{meal.strMeal}</h4>`, skipping `<h2>` and `<h3>`. This breaks the
heading hierarchy (WCAG 1.3.1).

**Fix**: Use `<h2>` for result titles.

### 5. Two `<h1>` on the same page

`src/components/organisms/RecommendationView/RecommendationView.tsx:47,69` —
The error state renders `<h1>Recommendation</h1>` and the success state renders
`<article>` with `<h1>{meal.strMeal}</h1>`. Although HTML5 allows multiple
`<h1>` inside sectioning elements, it's a best-practice failure that disorients
assistive technology users.

**Fix**: Use a single `<h1>` per page; demote headings inside `<article>` to
`<h2>`.

---

## Major Issues (should fix)

### 6. No `prefers-reduced-motion` support

Multiple files define CSS transitions and transforms with no
`@media (prefers-reduced-motion: reduce)` fallback (WCAG 2.3.3):

- `src/app/globals.css:171,186` — `.btn-cta:hover`, `button:hover` scale(1.05)
- `src/app/search/search.module.css:51-53` — search card transitions
- `src/components/organisms/Sidebar/sidebar.module.css:42-44` — sidebar entry
  transforms

### 7. Hidden submit button breaks keyboard flow

`src/app/search/page.tsx:41-43` — The search form has `<button type="submit"
style={{ display: "none" }}>Search</button>`. The hidden button is removed from
the accessibility tree and the `onKeyDown` handler calls `e.preventDefault()` on
Enter, so keyboard users cannot submit the form (WCAG 2.1.1, 4.1.2).

**Fix**: Remove the hidden button and use an explicit form submit. The
`<form>` should have an `onSubmit` handler.

### 8. Error message not linked to form control

`src/components/molecules/FormSelect/FormSelect.tsx:37,46` — The error
`<p role="alert">` is rendered visually near the `<select>` but not
programmatically linked via `aria-describedby`. Screen readers may not
announce the error when focusing the field (WCAG 3.3.1, 3.3.2).

### 9. No `aria-live` for dynamic sidebar updates

`src/components/organisms/Sidebar/Sidebar.tsx:70-125` — When the user applies
filters or sorts, the history list updates without an `aria-live` region.
Screen reader users won't know the content changed (WCAG 4.1.3).

### 10. "Copied!" status not announced

`src/components/atoms/ShareButton/ShareButton.tsx:20-28` — The button text
changes from "Share" to "Copied!" for 2 seconds, but no `aria-live` region
announces the change (WCAG 4.1.3).

### 11. `<form>` without `onSubmit`

`src/app/search/page.tsx:23` — The search `<form>` has no `onSubmit` handler,
making it a non-submittable form. It should be a `<div>` or `<search>` element
(WCAG 1.3.1).

### 12. `aria-invalid="false"` always present

`src/components/molecules/FormSelect/FormSelect.tsx:37` — The `<select>` always
carries `aria-invalid="false"` even with no error. The attribute should be
omitted when there is no error (WCAG 4.1.2).

---

## Minor Issues

### 13. Redundant `aria-live` with `role="status"`

`src/app/search/page.tsx:46` — The search results container has both
`role="status"` (implies `aria-live="polite"`) and explicit `aria-live="polite"`.
The explicit attribute is redundant.

### 14. Undefined CSS variable `--color-bg-card`

`src/app/globals.css:167` — `.btn-cta, a, button` uses
`background-color: var(--color-bg-card)` but `--color-bg-card` is never defined
in `:root` or dark mode, resulting in transparent backgrounds.

### 15. No `:focus` style fallback

`src/app/globals.css:298-301` — Only `:focus-visible` is styled. Some older
browsers don't support `:focus-visible`, leaving no visible focus indicator
(WCAG 2.4.7).

### 16. `onKeyDown` prevents default Enter behavior

`src/app/search/page.tsx:36-38` — `<input onKeyDown={(e) => { if (e.key ===
"Enter") e.preventDefault(); }}>` — interferes with expected keyboard behavior.

### 17. No visible `<label>` for search input

`src/app/search/page.tsx:30-32` — The search input relies solely on
`aria-label="Recipe name"`. A visible `<label>` would provide a larger click
target (WCAG 1.3.1).

### 18. `<Link>` inside `<form>`

`src/app/page2/page.tsx:73` — The "Back" `<Link>` is inside the `<form>`,
which can confuse screen reader users (WCAG 3.2.2).

### 19. Empty result text edge case

`src/app/page2/page.tsx:57` — `{areas?.length || "No"} results found for
{category}` renders awkwardly if `category` is an empty string.

### 20. Placeholder image fallback label

`src/components/atoms/RecipeImage/RecipeImage.tsx:35` — When `alt` is not a
string, falls back to `"Recipe image"`, which is generic. Low impact since
typing forces `string`.

---

## Summary

| Severity  | Count  |
| --------- | ------ |
| Critical  | 5      |
| Major     | 7      |
| Minor     | 8      |
| **Total** | **20** |
