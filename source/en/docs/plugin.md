---
title: Custom Native Plugin
---

A Native Plugin exposes platform capabilities to Doric JavaScript code.

## Steps

- Define a TypeScript API around `context.callNative`.
- Implement Android and iOS plugins.
- Register plugins in `DoricLibrary`.
- Return values through Promise mechanisms.

## Checks

- Plugin names must match on all platforms.
- Method names and argument shapes should stay consistent.
