# Recipe for a Reaction

This is a simple guide on how I developed the project.

## Navigation

Project will have those pages:

1. Homepage
2. Form step 1
3. Form step 2
4. Results + feedback
5. History

## API

I'll use [The Meal DB API](https://www.themealdb.com/). Super simple and useful.
I'll also cache calls via the store (see below) in order to decrement API calls, since recipes won't change indefinitively. If the recipes will change, I'll switch to a cached store with a reasonable time to expire.


## Technical choices

Since I have to create a simple frontend, with strict time constraint, I've to choose the most efficient way to create it. The most efficient way is to use an opinionated and well documented standard, such as [Next JS](https://nextjs.org/). In this way, I've already out of the box some efficient structures, like navigation and server side rendering, out of the box, in pure React syntax.

This will be made using [Typescript](https://www.typescriptlang.org/) to give Javascript some superset of types and keep code more robust and clean with stuff like typization. 

The style of the page is created in [pure CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). It's more simple to handle with respect to some frameworks that often charges with tooling and overhead without important benefits, expecially in simple tasks like this one.

Unit test framework's choice will be straightforward: [Jest](https://jestjs.io/), the de facto standard for testing React

End to End tests: I'll go with [Playwright](https://playwright.dev/). I'll choose some happy path to test, and then I'll cause me problems, in order to see how application behave in non-ideal scenarios.

This project need a store to handle states between pages. It should be something simple to use, and well integrated with LocalStorage, in order to persist information. I'll go for [Zustand](https://zustand.site/en/). His middleware [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) can handle the local storage efficiently

## With a little help from my friends - AI section.

Since it's 2026, help from AI is quite expected. In this project, I use [Opencode](https://opencode.ai/it), that let me have some agentic programming, for some thrivial tasks. With this tool, I've several US-hosted open model, like [Deepseek V4 Flash](https://benchlm.ai/models/deepseek-v4-flash) that:
- helps me decide *architectural choices* that can be impactful, speeding up research online
- helps me *debugging* code
- helps me *creating and handling tests* I need
- keeps me *reviewing code*, keeping me on track with some specification like [WCAG](https://wcag.it/)

I've used also a local model to help me with autocomplete. In my case, I've used [Qwen 2.5 Coder-7B](https://www.ollama.com/library/qwen2.5-coder:7b) that runs on [Ollama](https://www.ollama.com/).

I'd rather go for this self hosted model, because *I like to have control over the model I choose*. Even if they're not the frontier ones, I can handle which model to use, for what purpouse (based on benchmarks and maybe without overshoot a too-powerful model for simple tasks like code completion) and I'm free to change it anytime, instead of binding me to a powerful provider that can change policies anytime ([Fable 5, for instance](https://www.anthropic.com/news/fable-mythos-access)).