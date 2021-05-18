---
title: Doric中的视图组件
---
Doric SDK中提供了一系列基础的视图单元,也提供了插件机制用于拓展,可以方便地将平台原生视图加入到Doric体系中来.
在Doric version >= `v0.8.0`版本中提供了自定义视图组件机制,可以在TS层将基础视图单元组合成复杂的视图组件.

# 用法
**您需要继承Doric中已实现的视图单元类来实现子类,并在该子类上添加`ViewComponent`注解.**

```typescript
@ViewComponent
export class RichTitleView extends HLayout {
    title: Text
    subTitle: Text
    icon: Image
    constructor() {
        super()
        this.title = text({
            textSize: 30,
            textColor: Color.WHITE,
            textAlignment: Gravity.Center,
        })
        this.subTitle = text({
            textColor: Color.WHITE,
            textSize: 12,
        })
        this.icon = image({
            layoutConfig: layoutConfig().just(),
            width: 80,
            height: 80,
        })
        this.addChild(this.icon)
        this.addChild(
            vlayout(
                [
                    this.title,
                    this.subTitle,
                ],
                {
                    gravity: Gravity.Center,
                    space: 10,
                }))
        this.gravity = Gravity.Center
        this.space = 10
        this.layoutConfig = {
            widthSpec: LayoutSpec.MOST,
            heightSpec: LayoutSpec.FIT,
        }
        this.padding = {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        }
        this.backgroundColor = colors[1]
    }

    applyChild(config: {
        title?: Partial<Text>,
        subTitle?: Partial<Text>,
        icon?: Partial<Image>,
    }) {
        this.title.hidden = !!!config.title?.text
        this.subTitle.hidden = !!!config.subTitle?.text
        this.icon.hidden = !!!config.icon
        if (config.title) {
            this.title.apply(config.title)
        }
        if (config.subTitle) {
            this.subTitle.apply(config.subTitle)
        }
        if (config.icon) {
            this.icon.apply(config.icon)
        }
        return this
    }
}
```
# Demo
您可以查看这个[Demo](https://github.com/doric-pub/Doric/blob/master/doric-demo/src/ComponetDemo.ts),这里有具体的用法.