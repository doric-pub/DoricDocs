---
title: coordinator-视图联动机制
---

提供复杂场景下的View联动机制API

### verticalScrolling

将可垂直方向滑动的View与另一个View的属性绑定，使其属性值可在滑动区域内渐变。

* 参数类型：
```typescript
{
    ///需要监听滑动的View，目前支持List,Scroller,FlowLayout三种视图类型
    scrollable: List | Scroller | FlowLayout;
    ///滑动区域，从start到end区域渐变
    scrollRange: {
        start: number;
        end: number;
    };
    ///设置目标View或导航栏
    target: View | "NavBar";
    ///映射的属性及值渐变范围，在设置target为"NavBar"时仅支持"backgroundColor"
    changing: {
        name: "width" | "height" | "x" | "y" | "backgroundColor";
        start: number | Color;
        end: number | Color;
    };
}
```
* 返回值:
```typescript
Promise<any>
```

* 使用示例：
```typescript
scroller(
          vlayout([
            ...
          ],
            {
              layoutConfig: layoutConfig().most().configHeight(LayoutSpec.FIT),
              gravity: gravity().center(),
              space: 10,
            }
          ),
          {
            layoutConfig: layoutConfig().most(),
          }
        ).also((it) => {
            coordinator(context).verticalScrolling({
              scrollable: it,
              scrollRange: {
                start: 0,
                end: 100,
              },
              target: "NavBar",
              changing: {
                name: "backgroundColor",
                start: Color.WHITE,
                end: Color.RED,
              },
            });
            coordinator(context).verticalScrolling({
              scrollable: it,
              scrollRange: {
                start: 0,
                end: 100,
              },
              target: imageView,
              changing: {
                name: "width",
                start: 10,
                end: 200,
              },
            });
          })
```