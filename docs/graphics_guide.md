# Graphics Guide

## Color System

### Triad color scheme

The design uses a triad color scheme based on the lilac palette:

- **Base Color (Lilac)**: `#6a5f8a` (`--color-lilac`)
- **Lighter Shade**: `#a99bc8` (`--color-lilac-dark`)
- **Darker Shade**: `#7b6fb8` (used for emphasis/contrast)
- **Accent Gold**: `#c9ad81` (`--color-accent-gold`)

### Supporting colors

All additional colors derive from these base triad colors:

- **Background Salvia**: `#f5f3f0` (light) / `#18161f` (dark)
- **White/Cream**: `#faf8f6` (light) / `#231f2e` (dark)
- **Text Main**: `#2e2a36` (light) / `#f0eef2` (dark)
- **Text Muted**: `#9b96ac` (dark theme only)

## CSS Variables (Theme Tokens)

All themes variables are defined in `src/app/globals.css`. Never hardcode hex values.

### Light theme defaults

```css
:root {
  --color-lilac: #6a5f8a;
  --color-accent-yellow: #c4a97d;
  --color-bg-salvia: #f5f3f0;
  --color-text-main: #2e2a36;
  --color-white: #faf8f6;

  --color-bg-dark: #18161f;
  --color-bg-card-dark: #231f2e;
  --color-lilac-dark: #a99bc8;
  --color-accent-gold: #c9ad81;
  --color-text-primary: #f0eef2;
  --color-text-muted: #6a6578;

  --spacing: 1em;
}
```

### Dark theme overrides

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-salvia: var(--color-bg-dark);
    --color-text-main: var(--color-text-primary);
    --color-white: var(--color-bg-card-dark);
    --color-lilac: var(--color-lilac-dark);
    --color-accent-yellow: var(--color-accent-gold);
    --color-text-muted: #9b96ac;
  }

  .btn-cta {
    color: var(--color-bg-dark);
  }

  .recipe-card,
  .card {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
}
```

## Color usage rules

| Element                | Variable                                           |
| ---------------------- | -------------------------------------------------- |
| Headers / Footer       | `var(--color-lilac)` background                    |
| Primary CTAs / Buttons | `var(--color-accent-yellow)`                       |
| Secondary buttons      | Outline with `var(--color-lilac)`                  |
| Liked state            | `var(--color-accent-yellow)`                       |
| Neutral state          | `var(--color-lilac)`                               |
| Primary text           | `var(--color-text-main)`                           |
| Secondary text         | `var(--color-text-muted)`                          |
| Cards / backgrounds    | `var(--color-white)` / `var(--color-bg-card-dark)` |

If a needed color doesn't exist, find the closest one in `globals.css`; if none is close enough, add a new `--color-*` variable (both light and dark variants).

## Typography

### Font stacks

```css
/* Headings */
h1,
h2,
h3 {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 800;
}

/* Body */
* {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}
```

### Font sizes

| Element | Size                                      |
| ------- | ----------------------------------------- |
| h1      | `clamp(1.5rem, 4vw, 2.5rem)` (responsive) |
| h2      | `1.5em`                                   |
| h3      | `1.125em`                                 |
| Body    | `0.9375em`                                |
| Small   | `0.875em`                                 |
| Caption | `0.8125em`                                |

## Layout & spacing

### Grid system

```css
body:has(aside) {
  grid-template-columns: 1fr 3fr; /* Sidebar + Content */
}
body:not(:has(aside)) {
  grid-template-columns: 1fr; /* Full width */
}
```

### Spacing scale

| Token          | Value                |
| -------------- | -------------------- |
| Base unit      | `1em` (`--spacing`)  |
| Small          | `0.25em`             |
| Medium         | `0.5em`              |
| Large          | `1em`                |
| X-Large        | `2em`                |
| Card padding   | `2rem`               |
| Button padding | `0.625em` × `1.25em` |

### Layout containers

- **Cards**: `max-width: 600px; margin: 2em auto`
- **Recipe grid**: 1fr on mobile, `300px 1fr` on desktop
- **Content max-width**: `65ch` for text readability

## Component-specific styles

### Header / Footer

- Height: `56px` (fixed)
- Background: `var(--color-lilac)`
- Border: `1px solid rgb(255 255 255 / 0.2)`
- Typography: `font-weight: 600`, light letter-spacing

### Sidebar

- Padding: `0.5em 0.75em`
- Border-radius: `8px`
- Background: `var(--color-surface)` (#ffffff)
- Hover: `transform: translateX(2px)`, slightly darker background
- List scroll: `overflow-y: auto`

### Cards

- Border-radius: `12px`
- Padding: `2rem`
- Shadow: `0 4px 6px rgba(0, 0, 0, 0.05)` (light), `0 4px 20px rgba(0, 0, 0, 0.4)` (dark)

### Buttons / CTAs

- Border-radius: `10px`
- Primary: `var(--color-accent-yellow)` with dark text
- Secondary: Outline with `var(--color-lilac)`
- Hover: `transform: scale(1.05)` + background color transition

### Forms

- Input padding: `0.75em 1em`
- Border-radius: `8px`
- Border: `1px solid #d4d0e0`
- Focus ring: `2px solid var(--color-lilac)`

## Micro-interactions & animations

- **All interactive elements**: `transition: all 0.2s ease`
- **Buttons**: Hover `scale(1.05)`
- **Cards**: Hover `translateY(-2px)` + enhanced `box-shadow`
- **Sidebar items**: Hover `translateX(3px)` + background change

## Print styles

- `.print-only` class is `display: none` on screen and `display: block` on print
- `@media print` hides sidebar, footer, CTAs, and links
- Stacks recipe layout vertically

```css
@media print {
  aside,
  footer,
  .cta-container,
  a {
    display: none !important;
  }
  .recipeContainer .recipe {
    display: flex;
    flex-flow: column;
  }
  .print-only {
    display: block;
  }
}
```

## Accessibility (visual)

- Focus-visible ring: `2px solid var(--color-accent-yellow)` with `1px offset`
- Skip-to-content link: positioned absolutely, hidden until focused
- Text on background: ensure > 4.5:1 contrast ratio
- Interactive elements: use color + underline + focus states
- Status colors: Like (gold), Error (red), Success (green)
- Like/dislike uses `aria-pressed` state + color coding
- Form errors use red + `role="alert"`
- Loading states use `role="status"` + `aria-live="polite"`

## Variable naming convention

```
--color-{base-name}               # Base colors (--color-lilac)
--color-{base-name}-{variant}     # Variants (--color-lilac-dark)
--color-{category}-{tone}         # Semantic colors (--color-text-muted)
```

## Theme development

1. **Dark mode takes priority** — polish dark theme first, then ensure light mode degrades well
2. All components tested in dark mode before light mode
3. No component uses hardcoded colors — always reference `var(--color-*)`
4. CSS custom properties — override values in dark mode `@media (prefers-color-scheme: dark)` block
