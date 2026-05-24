---
title: Using Doric in Android Apps
---

Doric Android runtime lets native Android apps load and render Doric bundles.

## Setup

- Add Doric dependencies from Maven Central.
- Call `Doric.init(application)` during app startup.

## Containers

- Use `DoricActivity` for full-page rendering.
- Use `DoricFragment` for fragment-level rendering.
- Use `DoricPanel` for embedded view rendering.

## Bundle Loading

- Use built-in `assets://` and HTTP loaders.
- Register custom loaders with `Doric.addJSLoader(...)`.

## Run Scaffolded Project

```bash
npm run android
```
