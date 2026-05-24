---
title: Hello, Doric
---

This tutorial creates a simple Doric counter page.

## Create Project

```bash
doric create HelloDoric
cd HelloDoric
```

## Example Panel

```typescript
import { Panel, Group, vlayout, text, layoutConfig, Gravity, Color } from "doric";

@Entry
class HelloDoric extends Panel {
  build(root: Group) {
    let count = 0;
    const number = text({ text: "0", textSize: 40 });
    vlayout([number, text({
      text: "Click",
      width: 120,
      height: 44,
      layoutConfig: layoutConfig().just(),
      backgroundColor: Color.parse("#70a1ff"),
      textColor: Color.WHITE,
      onClick: () => { number.text = `${++count}`; },
    })], {
      layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
      gravity: Gravity.Center,
      space: 16,
    }).in(root);
  }
}
```

## Build and Run

```bash
npm run build
npm run dev
npm run android
npm run ios
```
