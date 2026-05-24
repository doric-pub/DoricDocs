---
title: CLI
---

`doric-cli` provides the `doric` command for project creation, development, builds, platform runs, and extension libraries.

## Install

```bash
npm install -g doric-cli
```

## create

```bash
doric create ProjectName
doric new ProjectName
```
Creates a Doric app with TypeScript, Android, and iOS project templates.

## createLib

```bash
doric createLib LibraryName
```
Creates a Doric extension library template.

## dev

```bash
doric dev
```
Starts TypeScript watch, Rollup watch, WebSocket hot reload on `7777`, and resource server on `7778`.

## build

```bash
doric build
```
Compiles TypeScript, runs Rollup, merges source maps, and copies assets into `bundle/`.

## run

```bash
doric run android
doric run ios
```

## clean

```bash
doric clean
```

## ssr and proxy

```bash
doric ssr build
doric proxy
```
