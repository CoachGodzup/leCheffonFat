# Recipe for a Reaction — Technical specifications

This is a simple guide on how I developed the project.

## Technical choices

I had to create a simple frontend with a strict time constraint, so I chose the most efficient approach: an opinionated, well-documented framework like [Next.js](https://nextjs.org/). This gave me efficient structures out of the box, like navigation and server-side rendering, in pure React syntax.
I used the **[App Router](https://nextjs.org/docs/app)**, server-first and lighter for the client.

The project was built with [TypeScript](https://www.typescriptlang.org/) to give JavaScript a type system and keep the code more robust and clean.

The page styles were created in [pure CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). It was simpler to handle than frameworks that add tooling and overhead without significant benefits, especially for a simple project like this one.

The unit test framework choice was straightforward: [Jest](https://jestjs.io/), the de facto standard for testing React.

For end-to-end tests I chose [Playwright](https://playwright.dev/). I picked a few happy paths to test, then deliberately caused problems to see how the application behaved in non-ideal scenarios.

The project needed a store to manage state across pages — something simple and well integrated with LocalStorage for persistence. I went with [Zustand](https://zustand.site/en/). Its [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) middleware handled localStorage efficiently. I choose it for simplicity, otherwise I've opted in for Redux Toolkit, rock solid and efficient with low boilerplate and the possibility to navigate history back and forth, but I though it would be overshooting for this project.

As a package manager I stuck with [npm](https://www.npmjs.com/). I knew about alternatives like bun, yarn, and pnpm, but I wanted to keep things simple and focused.

## Code choices

They're summarized [in the specific document](code_choices.md).

## Navigation

The project had these pages:

1. Homepage, with links to "Get inspired", "Search" and "History"
2. Form step 1
3. Form step 2
4. Results + feedback
5. Search page → dynamic search by name
6. History — also in the side panel

## API

I used [The Meal DB API](https://www.themealdb.com/) — simple and useful. I cached calls through the store to reduce requests, since recipes don't change often.

I chose the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), native and dependency-free. [Axios](https://axios.rest/pages/advanced/api-reference) would have been a good alternative, but I found no real reason to use it.

The APIs were wrapped inside the application to avoid CORS issues, in the [route.ts](./../src/app/api/meals/[...path]/route.ts) file.

Backend calls for list and search were wrapped in _custom hooks_ to avoid async issues with React hooks (which need synchronous functions). Decoupling also made the code cleaner. The main hook is [use-api](./../src/hooks/use-api.ts), which wraps the calls and allows refetching.

## Forms and form validation

For form handling and validation I chose [react-hook-form](https://react-hook-form.com/): it doesn't add much overhead and handles validation quite well.

I used `Categories` for the first form and `Area` for the second. Area comes bundled with Categories, so I could filter previous results to narrow down the area scope.

## Printable area

The recipe can also _be printed_. Some data is shown only in the print version to avoid clutter and discourage printing from an external source. Only a photo, the ingredients with measures, and a recipe summary are displayed. This is simply driven by pure css.

### User Experience (UX) Design

I designed three flows in this project:

- choosing a recipe by category and area
- searching a recipe by name (dynamic search)
- managing history with likes and dislikes

In the first case, the two searches are tied together: categories carry area information (step 2), so the second form auto-adapts based on the choice made in step 1.

Search is a dynamic search by name. Search field is done immediately, without a button. Minimal char lenght to begin a search is 3 and I've debounced to 300ms in order to limit backend calls (useless to do that char by char, flooding the servers with throw-away requests).

History components are both in a fixed sidebar and in a separate page, differently rendered. In the sidebar, I've no photo (keeping rows as short as possible in order to put more in this thight space) and I've the possibility to erase chronology ("I've never searched fettuccine Alfredo! NEVER! I swear!") one by one or in bulk. Also, list are sorted by date, with newer on top, but it can also be reversed with older on top. List can be filtered with liked, disliked or unassigned recipes.

## UI Design choices

I used a custom dark mode style, lilac-based.
I used pure CSS — for a small project it didn't cause integration overhead.
I started with emojis as icons, then switched to [lucide](https://lucide.dev/), which is already integrated with React. Emojis are inconsistent across devices and usually too colorful.

## Mock Offline — Bonus point

Using real calls to The Meal DB for unit tests didn't make sense, so I overrode the fetch API with a `jest.fn()` that returns data. To do the same during development, I used _fixtures_ — carbon copies of the calls — overriding `global.fetch`.

## Testing

### Unit tests

I decided to create tests for every page and component. I created a separate `'/tests'` folder, split into pages, components, and layout. At first I stuck to the happy path only (making sure everything rendered correctly).

### E2E tests

I made also a little test suite for end to end tests, checking happy path. This can be further improved, raising the covering also for throttling, empty and wrong cases and so on. I used [Playwright](https://playwright.dev/), putting tests into `e2e` folder.

### Accessibility

With the help of an AI (see later), I've added also the requested [WCAG] accessibility directives for this project, at least at A level. [You can see a report here](wcag-report.md).

## With a little help from my friends — AI section

In 2026, and AI assistance is pretty much expected.

In this project I used [Opencode](https://opencode.ai/it), which let me do agentic programming for some trivial tasks. With this tool I had several US-hosted open models, like [Deepseek V4 Flash](https://benchlm.ai/models/deepseek-v4-flash), which helped me:

- speed up _creating boilerplates_ and _types_
- speed up _quick refactoring_ like switching from emojis to icons
- decide _architectural choices_ that were impactful, speeding up online research
- _debug_ code
- _create and handle the tests_ I needed
- _review code_, keeping me on track with specifications like [WCAG](https://wcag.it/)
  _ quick \_refactoring_ if I change my mind on some specification.

I preferred this self-hosted model because _I liked having control over which model to choose_. Even if they weren't the frontier ones, I could manage which model to use for what purpose (based on benchmarks, without overshooting with a too-powerful model for simple tasks like code completion) and I was free to change it anytime, instead of binding myself to a powerful provider that could change policies at any time (Fable 5, for instance). I've not used local AI for this project, but I'm planning to use something with Gemma 4 in the near future. AI policies are in [AGENTS.MD](./../AGENTS.md) (the equivalent of Claude.MD for every AI).
