# Recipe for a Reaction

This will be a simple guide on how I will develop the project.

## Navigation

Project will have those pages:

1. Homepage, with two links for "get started" or "see history"
2. Form step 1
3. Form step 2
4. Results + feedback
5. History - this can also be in the side panel

## API

I'll use [The Meal DB API](https://www.themealdb.com/). Super simple and useful.
I'll also cache calls via the store (see below) in order to decrement API calls, since recipes won't change indefinitively. If the recipes will change, I'll switch to a cached store with a reasonable time to expire.

I'll go for the super-simple [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), native, with no dependency. [Axios](https://axios.rest/pages/advanced/api-reference) can be a good alternative, but I don't find any real use case to use that instead.

Form handling and validation: I'll go with [react-hook-form](https://react-hook-form.com/), it doesn't give a lot of overhead and handles validation quite good.

API has a great problem:

> In free version can use only one filter at a time, and surely not multiple ingredients!"

So... how can I call it with all filters? Luckily, searching for category gives also strArea and strCountry, so this part is quite easy: I'll filter client side the answer.

What about ingredients? [TODO]

## Technical choices

Since I will have to create a simple frontend, with strict time constraint, I will have to choose the most efficient way to create it. The most efficient way will be to use an opinionated and well documented standard, such as [Next JS](https://nextjs.org/). In this way, I will already have out of the box some efficient structures, like navigation and server side rendering, out of the box, in pure React syntax.
I will use [App Router](), server-first and more lightweight for the client.

This will be made using [Typescript](https://www.typescriptlang.org/) to give Javascript some superset of types and keep code more robust and clean with stuff like typization.

The style of the page will be created in [pure CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). It will be more simple to handle with respect to some frameworks that will often charge with tooling and overhead without important benefits, expecially in simple tasks like this one.

Unit test framework's choice will be straightforward: [Jest](https://jestjs.io/), the de facto standard for testing React

End to End tests: I'll go with [Playwright](https://playwright.dev/). I'll choose some happy path to test, and then I'll cause me problems, in order to see how application will behave in non-ideal scenarios.

This project will need a store to handle states between pages. It will be something simple to use, and well integrated with LocalStorage, in order to persist information. I'll go for [Zustand](https://zustand.site/en/). His middleware [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) will handle the local storage efficiently

As a package manager, I'll stick to npm. I will know alternatives like bun or npnm, just to keep it simple and focused.

## Testing

### Unit tests

I will decide to create tests for every page and components. I will create a separate folder `'/tests'`, will split into pages, components and layout. In the beginning, I will just stick to the happy path (will render correctly everything).

## With a little help from my friends - AI section.

Since it will be 2026, help from AI will be quite expected. In this project, I will use [Opencode](https://opencode.ai/it), that will let me have some agentic programming, for some thrivial tasks. With this tool, I will have several US-hosted open model, like [Deepseek V4 Flash](https://benchlm.ai/models/deepseek-v4-flash) that:

- speeding up _creating boilerplates_ and _types_
- will help me decide _architectural choices_ that will be impactful, will speed up research online
- will help me _debug_ code
- will help me _create and handle_ tests I will need
- will keep me _reviewing code_, will keep me on track with some specification like [WCAG](https://wcag.it/)

I will also use a local model to help me with autocomplete. In my case, I will use [Qwen 2.5 Coder-7B](https://www.ollama.com/library/qwen2.5-coder:7b) that will run on [Ollama](https://www.ollama.com/).

I will prefer to go for this self hosted model, because _I will like to have control over the model I will choose_. Even if they will not be the frontier ones, I will be able to handle which model to use, for what purpouse (based on benchmarks and maybe without overshoot a too-powerful model for simple tasks like code completion) and I will be free to change it anytime, instead of binding me to a powerful provider that will change policies anytime ([Fable 5, for instance](https://www.anthropic.com/news/fable-mythos-access)).
