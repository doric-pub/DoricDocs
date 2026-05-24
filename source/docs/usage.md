---
title: Complete Usage Guide
---

This guide summarizes the Doric project structure, workflow, page authoring, runtime model, and platform integration.

## Project Structure

- `doric-js`: framework APIs.
- `doric-cli`: command line tooling.
- `doric-web`: Web runtime.
- `doric-android` and `doric-iOS`: native runtimes.
- `doric-demo`: examples.

## Workflow

- Create a project with `doric create`.
- Write pages as `Panel` classes marked with `@Entry`.
- Build bundles with `doric build`.
- Develop with `doric dev`.
- Integrate bundles through Android, iOS, or Web containers.

## Core Concepts

- Panel lifecycle.
- View dirty props.
- LayoutConfig.
- Native Plugin calls through `context.callNative`.
- Custom ViewNode and DoricLibrary extensions.
