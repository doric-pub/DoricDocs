---
title: Using Doric in iOS Apps
---

Doric iOS runtime lets iOS apps load and render Doric bundles.

## Setup

- Add `DoricCore` through CocoaPods.
- Register custom libraries before loading Doric pages.

## Containers

- Use `DoricViewController` for full-page rendering.
- Use `DoricPanel` for embedded rendering.

## Bundle Loading

- Use `assets://` or HTTP bundle sources.
- Register custom loaders with `[Doric addJSLoader:]`.

## Run Scaffolded Project

```bash
npm run ios
```
