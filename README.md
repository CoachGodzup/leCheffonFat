```


 _             _____ _           __  __              ______    _
| |           / ____| |         / _|/ _|            |  ____|  | |
| |     ___  | |    | |__   ___| |_| |_ ___  _ __   | |__ __ _| |_
| |    / _ \ | |    | '_ \ / _ \  _|  _/ _ \| '_ \  |  __/ _` | __|
| |___|  __/ | |____| | | |  __/ | | || (_) | | | | | | | (_| | |_
|______\___|  \_____|_| |_|\___|_| |_| \___/|_| |_| |_|  \__,_|\__|


The goto stop when you don't know what to cook
```

[![CI](https://github.com/CoachGodzup/leCheffonFat/actions/workflows/test.yml/badge.svg)](https://github.com/CoachGodzup/leCheffonFat/actions/workflows/test.yml)
[![Stars](https://img.shields.io/github/stars/CoachGodzup/leCheffonFat?style=social)](https://github.com/CoachGodzup/leCheffonFat)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000?logo=next.js)](https://nextjs.org/)

Two-step recipe recommender app, built with [Next.js](https://nextjs.org/) that uses [TheMealDB API](https://www.themealdb.com/).

[You can see it in action](https://lecheffonfat.netlify.app/)


## Getting Started

Pull the repository from Github.

Install all dependencies

```bash
npm install
```

Set in a `.env.local` file. See `.env_example` as reference.
This project use [The Meal API](https://www.themealdb.com/). You just go for the public API key (`1`).

Fire the project

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and... _bon apetit_ 🧑‍🍳.

## Offline mock

If you want to have offline data, set in the `.env.local` the variable `NEXT_PUBLIC_MOCK_API=1`

## Technical choices

All technical decisions are documented in [docs/technical_specs.md](./docs/technical_specs.md).
There's also a file for [code specific decisions](./docs/code_guide.md), one for [graphics guide](./docs/graphics_guide.md) and a little accessibility report [here](./docs/wcag-report.md).

Warning: this can cause fatness in [le chat](https://www.explainx.ai/blog/le-chaton-fat-mistral-ai-viral-hoax-meme-2026).

![LeCheffonFat](./public/splash.png)
