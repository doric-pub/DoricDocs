---
title: Hello, Doric
---
本文档将创建一个基本的Doric页面，帮助您熟悉Doric的用法。
请在运行本文档前准备好开发环境，可参考 [概述](./)
您可以通过[Doric Playground](https://p.doric.pub/play/#example/HelloDoric.ts) 快速查看并运行本文源码
## 创建Doric项目
```bash
$ doric create HelloDoric
```

## 查看Doric文件
```bash
$ cd HelloDoric && code ./js
```

```TypeScript
import { Panel, Group, vlayout, layoutConfig, Gravity, IVLayout, text, Text, Color, navbar } from "doric";

@Entry
class HelloDoric extends Panel {
    onShow() {
        navbar(context).setTitle("HelloDoric")
    }
    build(rootView: Group): void {
        let number: Text
        let count = 0
        vlayout([
            number = text({
                textSize: 40,
                text: '0',
            }),
            text({
                text: "Click to count",
                textSize: 20,
                backgroundColor: Color.parse('#70a1ff'),
                textColor: Color.WHITE,
                onClick: () => {
                    number.text = `${++count}`
                },
                layoutConfig: layoutConfig().just(),
                width: 200,
                height: 50,
            }),
        ])
            .apply({
                layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                width: 200,
                height: 200,
                space: 20,
                border: {
                    color: Color.BLUE,
                    width: 1,
                },
                gravity: Gravity.Center,
            } as IVLayout)
            .in(rootView)
    }

}
```
## 代码导读

### Panel
`Panel`是Doric中视图控制单元的抽象类。我们继承 `Panel`实现子类来实现页面逻辑。一般通过实现`build`方法来编写布局，具备`onShow`,`onHidden`等页面生命周期回调方法。

### Entry
Entry注解修饰需要显示的Panel类。其作用是在对应生成的JS bundle中暴露对应`Panel`的执行入口。比如在同一个TS文件中可能存在多个Panel类，但在装载JS bundle时只会装载经Entry修饰的Panel类。

### onShow

页面生命周期回调，在页面显示时调用。相应的还有`onHidden`回调

### build(rootView:Group)
页面构建回调。其入参`rootView`为该视图控制单元的根视图。在该回调方法中，可创建视图加进根视图中。

### text
文本控件，用于显示文字。可自定义多种属性，如文字内容，文字大小，字体颜色，等等。

### vlayout
布局控件，用于编排控件布局。其子控件按垂直方向排列。相应的还有`hlayout`，其子控件按水平方向排列。

### onClick
点击回调，设置到控件上供控件点击调用。



