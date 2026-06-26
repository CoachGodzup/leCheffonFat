# WCAG Report — leCheffonFat

**WCAG** (Web Content Accessibility Guidelines) is the W3C standard for making
the web accessible to people with disabilities. This project targets **WCAG 2.2
level AA**. Below is a breakdown of what's implemented in the code.

## Semantic HTML & Landmarks

- `<html lang="en">` declares the page language
- `<a class="skip-link" href="#main-content">` skips repetitive navigation
  (WCAG 2.4.1)
- `<header>`, `<main id="main-content">`, `<aside>` (with `aria-labelledby`),
  `<footer>` define the main landmarks
- `<nav aria-label="Main navigation">`, `<section>`, `<article>`, `<form>`,
  `<fieldset><legend>` structure the content

## ARIA Attributes

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

## Keyboard Navigation

- `:focus-visible` with `outline: 2px solid var(--color-accent-yellow)` on all
  interactive elements (WCAG 2.4.7)
- All buttons, links, selects, and checkboxes are natively keyboard-focusable

## Images

- `alt` text always provided (dish name), enforced by
  `ComponentProps<typeof Image>` type
- Placeholder uses `role="img"` and `aria-label` when the image is unavailable

## Colors & Theming

- All colors use `var(--color-*)` from `globals.css` — no hardcoded hex values
- Two themes (light/dark) via `@media (prefers-color-scheme)`, contrast
  guaranteed by the variable palette
- Dark mode is the priority theme

## Print

- `@media print` in `globals.css` hides navigation, sidebar, and CTAs; shows
  only ingredients and instructions in a single-column layout

## Identified Gaps

- `prefers-reduced-motion` not handled (WCAG 2.3.3, AAA)
- No automated axe-core tests in the test suite (though present in
  dependencies)
- No manual theme toggle (OS preference only)
