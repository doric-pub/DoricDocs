---
title: Using Doric on Web
---

`doric-web` loads and renders Doric JavaScript bundles in browsers.

## Build Runtime

```bash
cd doric-web
npm install
npm run build
```

## Render Bundle

```html
<doric-div src="/bundle/src/Home.js" alias="Home" data='{"from":"web"}'></doric-div>
<script src="./dist/index.js"></script>
```

## Custom Loader

Register `DoricJSLoader` through `registerDoricJSLoader` when you need custom bundle protocols such as `assets://`.
