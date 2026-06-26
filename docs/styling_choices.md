# Styling Choices

## Color Triad System

### Primary Triad Colors

The design uses a triad color scheme based on the lilac palette:

- **Base Color (Lilac)**: `#6a5f8a` (defined as `--color-lilac`)
- **Lighter Shade**: `#a99bc8` (defined as `--color-lilac-dark`)
- **Darker Shade**: `#7b6fb8` (used for emphasis/contrast)
- **Accent Gold**: `#c9ad81` (defined as `--color-accent-gold`)

### Supporting Colors

All additional colors derive from these base triad colors:

- **Background Salvia**: `#f5f3f0` (light theme) / `#18161f` (dark theme)
- **White/Cream**: `#faf8f6` (light) / `#231f2e` (dark)
- **Text Main**: `#2e2a36` (light) / `#f0eef2` (dark)
- **Text Muted**: `#9b96ac` (dark theme only)

## Root CSS Variables (Theme Tokens)

### Light Theme Defaults

```css
:root {
  /* Primary colors */
  --color-lilac: #6a5f8a; /* Main purple/lilac */
  --color-accent-yellow: #c4a97d; /* Golden accent */
  --color-bg-salvia: #f5f3f0; /* Light cream background */
  --color-text-main: #2e2a36; /* Main text color */
  --color-white: #faf8f6; /* White/Cream */

  /* Supporting colors */
  --color-bg-dark: #18161f; /* Dark background for contrast */
  --color-bg-card-dark: #231f2e; /* Dark card background */
  --color-lilac-dark: #a99bc8; /* Lighter lilac for dark mode */
  --color-accent-gold: #c9ad81; /* Gold accent for CTAs */
  --color-text-primary: #f0eef2; /* Primary text for dark mode */
  --color-text-muted: #6a6578; /* Muted text */

  --spacing: 1em; /* Base spacing unit */
}
```

### Dark Theme Overrides

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

## Color Usage Rules

### Component Color Application

All components MUST use CSS variables:

- **Headers/Footer**: Use `var(--color-lilac)` for background
- **CTAs/Buttons**: Use `var(--color-accent-yellow)` for primary, `var(--color-lilac)` for secondary
- **Like/Dislike**: `var(--color-accent-yellow)` for liked, `var(--color-lilac)` for neutral
- **Text**: `var(--color-text-main)` for primary, `var(--color-text-muted)` for secondary
- **Cards/Backgrounds**: `var(--color-white)` (light) / `var(--color-bg-card-dark)` (dark)

### Hex Values Strict Prohibition

❌ Prohibited: Hardcoded hex values like `#6a5f8a`, `#6a5f8a`, `#ffffff`
✅ Required: CSS variables like `var(--color-lilac)`

## Typography System

### Font Stacks

```css
/* Headings */
h1,
h2,
h3 {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 800;
}

/* Body text */
* {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}
```

### Font Sizes (computed from theme)

- **h1**: `clamp(1.5rem, 4vw, 2.5rem)` (responsive, 1.5rem to 2.5rem)
- **h2**: `1.5em`
- **h3**: `1.125em`
- **Body**: `0.9375em`
- **Small**: `0.875em`
- **Caption**: `0.8125em`

## Layout & Spacing System

### Grid System

```css
body:has(aside) {
  grid-template-columns: 1fr 3fr; /* Sidebar + Content */
}

body:not(:has(aside)) {
  grid-template-columns: 1fr; /* Full width content */
}
```

### Spacing Scale

- **Base Unit**: `1em` (--spacing)
- **Small**: `0.25em`
- **Medium**: `0.5em`
- **Large**: `1em`
- **X-Large**: `2em`
- **Component Padding**: `2rem` (cards)
- **Button Padding**: `0.625em` (vertical) × `1.25em` (horizontal)

### Layout Containers

- **Cards**: `max-width: 600px; margin: 2em auto`
- **Recipe Grid**: 1fr on mobile, 300px 1fr on desktop
- **Content Max-width**: 65ch for text readability

## Component Styling Rules

### Header/Footer

- **Height**: 56px (fixed)
- **Background**: `var(--color-lilac)`
- **Border**: 1px solid `rgb(255 255 255 / 0.2)`
- **Typography**: `font-weight: 600`, light letter-spacing

### Sidebar

- **Padding**: 0.5em 0.75em
- **Border-radius**: 8px
- **Background**: `var(--color-surface)` (#ffffff)
- **Hover**: `transform: translateX(2px)`, slightly darker background
- **List Scroll**: `overflow-y: auto` only

### Cards

- **Border-radius**: 12px
- **Padding**: 2rem
- **Shadow**: `0 4px 6px rgba(0, 0, 0, 0.05)`
- **Dark mode**: `0 4px 20px rgba(0, 0, 0, 0.4)`

### Buttons/CTAs

- **Border-radius**: 10px (reduced from 20px for modern look)
- **Primary**: `var(--color-accent-yellow)` with dark text
- **Secondary**: Outline with `var(--color-lilac)`
- **Hover**: `transform: scale(1.05)` + background color transition

### Forms

- **Input padding**: 0.75em 1em
- **Border-radius**: 8px
- **Border**: 1px solid `#d4d0e0`
- **Focus ring**: `2px solid var(--color-lilac)`

## Visual Hierarchy & Micro-interactions

### Animation Preferences

- **All interactive elements**: `transition: all 0.2s ease`
- **Buttons**: Hover `scale(1.05)`
- **Cards**: Hover `translateY(-2px)` + `box-shadow`
- **Sidebar items**: Hover `translateX(3px)` + background change

### Icon Systems

- **Lucide React Icons**: Used exclusively (replaces emojis)
- **Decorative**: All icons use `aria-hidden="true"`
- **Button labels**: Icon-only buttons use `aria-label`

### Focus States

- **Visible focus ring**: `2px solid var(--color-accent-yellow)` with `1px offset`
- **Skip-to-content**: Positioned absolutely, hidden until focused

## Print Styles

### Key Breakpoints

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

## Color Blindness Considerations

### Contrast Ratios

- **Text on background**: Ensure > 4.5:1 ratio
- **Interactive elements**: Use color + underline + focus states
- **Status colors**: Like (gold), Error (red), Success (green)

### Visual Indicators

- Like/dislike uses `aria-pressed` state + color coding
- Form errors use red + `role="alert"`
- Loading states use `role="status"` + `aria-live="polite"`

## Design System References

### CSS File Structure

```
src/
  app/
    components/          # Page-specific components
      atoms/            # Primitive atoms (CSS only)
      styles/           # Atom CSS files
    components/          # Shared reusable components
      header/           # Header module
      footer/           # Footer module
      ...
  components/              # Generic component patterns
  hooks/                    # Custom hooks
  service/                  # Services
  store/                    # Zustand store
  types/                    # TypeScript definitions
```

### Variable Naming Convention

```
--color-{base-name}         # Base colors (--color-lilac)
--color-{base-name}-{variant} # Variants (--color-lilac-dark)
--color-{category}-{tone}    # Semantic colors (--color-text-muted)
```

## Theme Development Notes

### Dark Mode Priority

1. **Polish dark theme first** - All components tested in dark mode first
2. **Light mode degrades gracefully** - Ensure sufficient contrast
3. **Color dependency** - No component uses hardcoded colors
4. **CSS Custom Properties** - Override values in dark mode media query

### Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: ≥ 600px
- **Desktop**: ≥ 1200px (optional)

### UI Velocity Requirements

- Component hover states responsive for mobile and desktop
- Font sizing scales with viewport using `clamp()`
- Images maintain aspect ratio with `object-fit: cover`

This document serves as the definitive reference for all styling choices in the codebase, ensuring consistency across development and maintaining design system integrity.
