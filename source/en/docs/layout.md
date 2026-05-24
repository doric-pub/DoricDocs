---
title: Layout and Containers
---

Doric layout is controlled by `LayoutConfig`, size specs, and container views.

## LayoutSpec

- `JUST`: use explicit width or height.
- `FIT`: size from content.
- `MOST`: expand to available parent space.

## Containers

- `Stack`: overlay children.
- `VLayout`: vertical layout.
- `HLayout`: horizontal layout.
- `FlexLayout`: flexible layout.

## Common Rules

- Use `layoutConfig().just()` with explicit `width` and `height`.
- Use `weight` only inside `VLayout` or `HLayout`.
- Ensure parents have available space when using `MOST`.
