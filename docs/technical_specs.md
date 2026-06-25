# Recipe for a Reaction - Technical specifications

This will be a simple guide on how I will develop the project.

## Technical choices

Since I will have to create a simple frontend, with strict time constraint, I will have to choose the most efficient way to create it. The most efficient way will be to use an opinionated and well documented standard, such as [Next JS](https://nextjs.org/). In this way, I will already have out of the box some efficient structures, like navigation and server side rendering, out of the box, in pure React syntax.
I will use [App Router](), server-first and more lightweight for the client.

This will be made using [Typescript](https://www.typescriptlang.org/) to give Javascript some superset of types and keep code more robust and clean with stuff like typization.

The style of the page will be created in [pure CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). It will be more simple to handle with respect to some frameworks that will often charge with tooling and overhead without important benefits, expecially in simple tasks like this one.

Unit test framework's choice will be straightforward: [Jest](https://jestjs.io/), the de facto standard for testing React

End to End tests: I'll go with [Playwright](https://playwright.dev/). I'll choose some happy path to test, and then I'll cause me problems, in order to see how application will behave in non-ideal scenarios.

This project will need a store to handle states between pages. It will be something simple to use, and well integrated with LocalStorage, in order to persist information. I'll go for [Zustand](https://zustand.site/en/). His middleware [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) will handle the local storage efficiently

As a package manager, I'll stick to [npm](https://www.npmjs.com/). I will know alternatives like bun or yarn or npnm, just to keep it simple and focused.

## Navigation

Project will have those pages:

1. Homepage, with links for "get inspired" , "search" and "history"
2. Form step 1
3. Form step 2
4. Results + feedback
5. Search page > dynamic search by name
6. History - this is also in the side panel

## API

I'll use [The Meal DB API](https://www.themealdb.com/). Super simple and useful.
I'll also cache calls via the store (see below) in order to decrement API calls, since recipes won't change indefinitively. If the recipes will change, I'll switch to a cached store with a reasonable time to expire.

I'll go for the super-simple [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), native, with no dependency. [Axios](https://axios.rest/pages/advanced/api-reference) can be a good alternative, but I don't find any real use case to use that instead.

Api also are wrapped inside the application to avoid CORS problems in [route.ts](./../src/app/api/meals/[...path]/route.ts) file.

Backend calls for list and search are wrapped into _custom hooks_, in order to avoid problems with asyncrounicity and hooks, that need syncronous functions. Also, decoupling that let the code to be cleaner.
The main hook for calls is [use-api](./../src/hooks/use-api.ts), that wraps the calls and let also the call to be refetched 

## Forms and form validation

Form handling and validation: I'll go with [react-hook-form](https://react-hook-form.com/), it doesn't give a lot of overhead and handles validation quite good.

I've used Categories for first form, Area for the second. Area comes freely with categories, so I can act a filter on previous results to reduce the scope of the area.

## Printable area

Recipe can also be printed. Some data are shown only in printed version, to avoid clutter, and to avoid the user to print the recipe from external source. In this case, only a photo, the ingredients with measures and a summary of the recipe are show in a printable way

### User Experience (UX) Design

I've decided to have three fluxes in this project:

- choosing a recipe by category and area
- searching a recipe by name (dynamic search)
- handling history with like and dislike

In the first case, the two searches are binded: categories has inside an information about the area (step 2), so the second form auto-adapts on the choice you made on step1.

Search is a dynamic search part, that need

## Design choices

Used a custom style, dark mode, lilac based.
Used pure css solution, for a small project will not cause integration overhead
Used at first emojis as icons, then switched to [lucide](https://lucide.dev/), that are already integrated in React. Emojis are not consistent between devices and normally too colorful.

### Image Placeholder - `RecipeImage` component

To handle broken or missing recipe images gracefully, a reusable `RecipeImage` wrapper component replaces direct usage of `next/image` in three components: `RecommendationView`, `HistoryList`, and `SearchResults`.

**How it works:**

- If `src` is empty or falsy, the component renders a placeholder div immediately.
- If the image fails to load (`onError`), a `hasError` state flag triggers the same placeholder.
- The placeholder is a `div` with a CSS gradient background (`linear-gradient(135deg, var(--color-lilac), var(--color-accent-yellow))`), using existing theme colors.
- The wrapper has `position: relative` and `overflow: hidden` to support `next/image`'s `fill` layout.
- When explicit `width` and `height` props are provided (non-fill mode), the wrapper receives them as inline styles so the placeholder occupies the same area as the intended image.
- Sizing for `fill` mode is delegated to the parent element (e.g., the `.imageWrapper` divs with `aspect-ratio: 16/9` in `HistoryList` and `SearchResults`).

**Files:**

- `src/app/components/atoms/RecipeImage.tsx` — component implementation
- `src/app/components/atoms/RecipeImage.module.css` — styles
- `test/app/components/atoms/RecipeImage.test.tsx` — unit tests

## Mock Offline - Bonus point

It's silly to use real calls to The Meal DB for unit tests. So we'll go to override fetch API with a jest.fn that returns data.

In order to do so also for develop, we can use _fixtures_, carbon-copies of calls, and overriding global.fetch for that.

## Testing

### Unit tests

I will decide to create tests for every page and components. I will create a separate folder `'/tests'`, will split into pages, components and layout. In the beginning, I will just stick to the happy path (will render correctly everything).

## With a little help from my friends - AI section.

Since it's 2026, help from AI is quite expected. In this project, I will use [Opencode](https://opencode.ai/it), that will let me have some agentic programming, for some trivial tasks. With this tool, I will have several US-hosted open model, like [Deepseek V4 Flash](https://benchlm.ai/models/deepseek-v4-flash) that:

- speeding up _creating boilerplates_ and _types_
- speeding up _quick refactoring_ like from emojis to icons.
- will help me decide _architectural choices_ that will be impactful, speeding up research online
- will help me _debug_ code
- will help me _create and handle_ tests I will need
- will keep me _reviewing code_, will keep me on track with some specification like [WCAG](https://wcag.it/)

I will prefer to go for this self hosted model, because _I will like to have control over the model I will choose_. Even if they will not be the frontier ones, I will be able to handle which model to use, for what purpouse (based on benchmarks and maybe without overshoot a too-powerful model for simple tasks like code completion) and I will be free to change it anytime, instead of binding me to a powerful provider that will change policies anytime ([Fable 5, for instance](https://www.anthropic.com/news/fable-mythos-access)).
