---
title: Hello, Doric
---

本文通过创建一个计数器页面，帮助您熟悉 Doric 项目的基本结构、Panel 写法、布局方式、事件回调和运行调试流程。

运行本文示例前，请先完成[开发环境与工具](./index.html)中的环境准备。也可以直接在 [Doric Playground](https://p.doric.pub/play/#example/HelloDoric.ts) 中体验 Doric 的代码风格。

## 创建项目

```bash
$ doric create HelloDoric
$ cd HelloDoric
```

脚手架会生成一个包含 TypeScript、Android、iOS 工程的完整项目：

```text
HelloDoric/
├── assets/
├── src/HelloDoric.ts
├── index.ts
├── package.json
├── tsconfig.json
├── rollup.config.js
├── android/
└── iOS/
```

其中 `src/HelloDoric.ts` 是默认页面入口，`index.ts` 用于声明需要参与打包的 Panel 文件。

## 编写页面

打开 `src/HelloDoric.ts`，写入如下代码：

```typescript
import {
    Panel,
    Group,
    vlayout,
    layoutConfig,
    Gravity,
    text,
    Text,
    Color,
    navbar,
} from "doric";

@Entry
class HelloDoric extends Panel {
    onShow() {
        navbar(this.context).setTitle("HelloDoric");
    }

    build(rootView: Group) {
        let number: Text;
        let count = 0;

        vlayout([
            number = text({
                text: "0",
                textSize: 40,
            }),
            text({
                text: "Click to count",
                textSize: 20,
                backgroundColor: Color.parse("#70a1ff"),
                textColor: Color.WHITE,
                width: 200,
                height: 50,
                layoutConfig: layoutConfig().just(),
                onClick: () => {
                    number.text = `${++count}`;
                },
            }),
        ], {
            width: 200,
            height: 200,
            space: 20,
            gravity: Gravity.Center,
            layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
            border: {
                color: Color.BLUE,
                width: 1,
            },
        }).in(rootView);
    }
}
```

## 代码导读

### Panel

`Panel` 是 Doric 中的页面控制单元。每个 Doric 页面通常继承 `Panel`，并在 `build` 方法中构建视图树。

### Entry

`@Entry` 用于标记当前 JS bundle 的执行入口。同一个 TypeScript 文件中可以声明多个类，但只有被 `@Entry` 修饰的 `Panel` 会作为页面入口暴露给 Runtime。

### onShow

`onShow` 是页面生命周期回调，会在页面显示或宿主生命周期恢复时调用。示例中通过 `navbar(this.context).setTitle` 设置导航栏标题。

### build(rootView)

`build` 是视图构建回调。`rootView` 是当前 Panel 的根视图，所有页面内容都需要加入根视图或其子容器。

### text

`text` 用于创建文本控件。它支持 `text`、`textSize`、`textColor`、`fontStyle`、`maxLines`、`onClick` 等属性。

### vlayout

`vlayout` 是垂直线性布局容器，子视图按从上到下的顺序排列。相应地，`hlayout` 会按水平方向排列子视图，`stack` 则适合层叠布局。

### layoutConfig

`layoutConfig().just()` 表示控件尺寸使用明确设置的 `width` 和 `height`；`layoutConfig().fit()` 表示由内容撑开；`layoutConfig().most()` 表示尽量占满父容器。

### onClick

`onClick` 是点击事件回调。Doric 会将回调注册到 Native Runtime，点击发生后再回调到 JS 侧执行。

## 构建

```bash
$ npm run build
```

底层会执行 `doric build`，将 TypeScript 编译并打包到 `bundle/` 目录：

```text
bundle/
├── src/HelloDoric.js
├── src/HelloDoric.js.map
└── assets/
```

## 开发调试

```bash
$ npm run dev
```

`doric dev` 会启动 TypeScript 与 Rollup watch，并启动热重载服务。终端会输出本机 IP 与二维码，可使用集成 Devkit 的 App 或 Doric Playground 扫码连接。

更多调试能力请查看 [Doric 调试工具](./devkit.html)。

## 运行到 Android 或 iOS

脚手架项目默认包含 Android 与 iOS 工程：

```bash
$ npm run android
$ npm run ios
```

运行前请确认已安装对应平台环境，并连接设备或启动模拟器。更完整的接入方式请查看：

- [Android 应用中使用 Doric](./android.html)
- [iOS 应用中使用 Doric](./ios.html)

