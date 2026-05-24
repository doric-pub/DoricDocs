---
title: Runtime Architecture
---

Doric compiles TypeScript or TSX into JavaScript bundles and renders view models through platform runtimes.

## Flow

```text
TypeScript/TSX -> doric build -> JS Bundle -> DoricContext -> View Model -> Native/Web ViewNode
```

## Key Parts

- `DoricContext` binds JS and native runtime state.
- `Panel` receives lifecycle callbacks.
- Dirty props are collected and rendered through `shader.render`.
- Native APIs are called through `context.callNative`.
