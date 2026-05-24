---
title: 完整使用说明
---

本文基于当前 Doric 主仓库整理，按 DoricDocs 的文档站结构说明如何创建项目、编写页面、调试构建，以及在 Android、iOS、Web 中接入 Doric。

## Doric 项目组成

Doric 是一套使用 TypeScript/TSX 编写 UI 的跨平台开发框架。业务代码运行在 JS 侧，通过 Doric Runtime 渲染到 Android、iOS、Qt 或 Web 的原生组件/节点上。

主仓库主要目录如下：

```text
Doric/
├── doric-js/        # JS Framework，导出 Panel、View、Widget、Native API、工具类
├── doric-cli/       # 命令行工具，提供 create/dev/build/run/clean/createLib 等命令
├── doric-demo/      # 示例面板与资源
├── doric-web/       # Web Runtime，提供 <doric-div>、<doric-navigation>
├── doric-android/   # Android SDK、DevKit、示例 App、JSE 模块
├── doric-iOS/       # iOS SDK 与 Example
└── doric-Qt/        # Qt Runtime
```

常用包与命令：

| 包 | 作用 | 常用命令 |
| --- | --- | --- |
| `doric-js` | Doric TypeScript 框架核心 | `npm run build`, `npm run dev` |
| `doric-cli` | 脚手架、调试、构建工具 | `npm run build` |
| `doric-demo` | 示例页面集合 | `npm run build`, `npm run dev` |
| `doric-web` | Web 端渲染 Runtime | `npm run build` |
| `doric-android` | Android 原生运行时 | `./gradlew assemble` |

## 环境准备

基础环境：

- Node.js 与 npm。
- TypeScript 相关依赖由各 package 的 `package.json` 安装。
- Android Studio、Android SDK、`ANDROID_HOME` 或 `ANDROID_SDK_ROOT`，用于 Android 构建和运行。
- Xcode、CocoaPods、可选 `ios-deploy`，用于 iOS 构建和真机安装。

从主仓库开发时，可以执行：

```bash
./setup.sh
```

也可以按包分别安装与构建：

```bash
cd doric-js
npm install
npm run build

cd ../doric-cli
npm install
npm run build

cd ../doric-demo
npm install
npm run build

cd ../doric-web
npm install
npm run build
```

## 创建 Doric 应用

安装或构建 CLI 后，可以使用 `doric create` 创建应用：

```bash
doric create MyApp
```

等价命令：

```bash
doric new MyApp
```

脚手架会生成：

```text
MyApp/
├── assets/             # JS 侧可访问资源
├── src/MyApp.ts        # 默认入口 Panel
├── index.ts            # 导出入口列表
├── package.json
├── tsconfig.json
├── rollup.config.js
├── android/            # Android 示例工程
└── iOS/                # iOS 示例工程
```

模板默认脚本：

```json
{
  "scripts": {
    "build": "doric build",
    "dev": "doric dev",
    "clean": "doric clean",
    "android": "doric run android",
    "ios": "doric run iOS"
  }
}
```

如果需要创建插件库：

```bash
doric createLib MyLibrary
```

插件库模板包含 JS 入口、Android Library、iOS Pod 和 `example/` 示例工程。

## 编写 Panel

Doric 页面以继承 `Panel` 的类为入口，并使用 `@Entry` 标记。必须实现 `build(rootView: Group)`。

```ts
import {
    Panel,
    Group,
    vlayout,
    text,
    image,
    layoutConfig,
    Gravity,
    Color,
    AssetsResource,
    navbar,
} from "doric";

@Entry
class HelloDoric extends Panel {
    onShow() {
        navbar(this.context).setTitle("HelloDoric");
    }

    build(rootView: Group): void {
        let count = 0;
        const number = text({
            text: "0",
            textSize: 40,
        });

        vlayout([
            image({
                image: new AssetsResource("logo_doric.png"),
            }),
            number,
            text({
                text: "Click to count",
                textSize: 20,
                textColor: Color.WHITE,
                backgroundColor: Color.parse("#70a1ff"),
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
        }).in(rootView);
    }
}
```

`Panel` 常用生命周期：

| 方法 | 触发时机 |
| --- | --- |
| `onCreate()` | Panel 创建后 |
| `build(rootView)` | 根据宿主视图尺寸构建或重建 UI |
| `onShow()` | 页面显示或宿主生命周期恢复 |
| `onHidden()` | 页面隐藏或宿主生命周期暂停 |
| `onDestroy()` | 页面销毁 |
| `onEnvChanged()` | 环境变化，默认清空根视图并重新执行 `build` |

初始化数据通过宿主端传入 JSON 字符串，JS 侧调用：

```ts
const initData = this.getInitData();
```

## TSX 写法

Doric 支持 TSX。使用 TSX 时需要从 `doric` 引入 `jsx`。

```tsx
import {
    jsx,
    Panel,
    Group,
    VLayout,
    Text,
    layoutConfig,
    Gravity,
    Color,
    createRef,
} from "doric";

@Entry
class CounterPanel extends Panel {
    build(root: Group) {
        const numberRef = createRef<Text>();
        let count = 0;

        <VLayout
            space={12}
            gravity={Gravity.Center}
            layoutConfig={layoutConfig().fit().configAlignment(Gravity.Center)}
            parent={root}
        >
            <Text ref={numberRef} textSize={40} textColor={Color.BLACK}>
                0
            </Text>
            <Text
                textSize={18}
                textColor={Color.WHITE}
                backgroundColor={Color.parse("#70a1ff")}
                width={160}
                height={48}
                layoutConfig={layoutConfig().just()}
                onClick={() => {
                    numberRef.current.text = `${++count}`;
                }}
            >
                Click
            </Text>
        </VLayout>;
    }
}
```

更多示例可参考主仓库 `doric-demo/src/TSXDemo.tsx`。

## 布局系统

常用容器：

| 容器 | 说明 |
| --- | --- |
| `Stack` | 子 View 可层叠，适合绝对定位、遮罩、组合控件 |
| `VLayout` | 纵向线性布局，支持 `space`、`gravity` |
| `HLayout` | 横向线性布局，支持 `space`、`gravity` |
| `FlexLayout` | Flex 布局，子 View 可配置 `flexConfig` |
| `Root` | 根容器，由 Runtime 创建，一般不手动 new |

通过 `layoutConfig()` 创建布局配置：

```ts
layoutConfig().fit();       // 宽高由内容决定
layoutConfig().most();      // 尽可能占满父容器
layoutConfig().just();      // 使用 View 的 width/height
layoutConfig().fitWidth();
layoutConfig().fitHeight();
layoutConfig().mostWidth();
layoutConfig().mostHeight();
layoutConfig().justWidth();
layoutConfig().justHeight();
```

常用链式配置：

```ts
layoutConfig()
    .fit()
    .configMargin({ left: 12, top: 8, right: 12, bottom: 8 })
    .configAlignment(Gravity.Center)
    .configWeight(1)
    .configMinWidth(100)
    .configMaxHeight(300);
```

`LayoutSpec` 含义：

| 值 | 说明 |
| --- | --- |
| `JUST` | 使用明确设置的 `width` 或 `height` |
| `FIT` | 根据内容决定大小 |
| `MOST` | 在父容器允许范围内尽可能占满 |

## 常用 View 与 Widget

所有 `View` 都支持一组通用属性：

| 属性 | 说明 |
| --- | --- |
| `width`, `height` | 指定尺寸，通常配合 `layoutConfig().just()` |
| `x`, `y` | 位置 |
| `backgroundColor` | 背景色，支持 `Color` 或渐变色 |
| `corners` | 圆角，可传数字或四角对象 |
| `border` | 边框 `{ width, color }` |
| `shadow` | 阴影 `{ color, opacity, radius, offsetX, offsetY }` |
| `alpha` | 透明度，范围通常为 `0..1` |
| `hidden` | 是否隐藏 |
| `layoutConfig` | 布局规则 |
| `onClick` | 点击回调 |
| `tag` | 业务标记，可通过 `findViewByTag` 查找 |

当前 `doric-js` 导出的常用 Widget 包括：

- `text`
- `image`
- `list`
- `slider`
- `scroller`
- `refreshable`
- `flowlayout`
- `input`
- `nestedSlider`
- `draggable`
- `switch`
- `gesture`
- `effect`
- `horizontalList`

文本示例：

```ts
text({
    text: "Hello",
    textSize: 16,
    textColor: Color.parse("#333333"),
    maxLines: 1,
    fontStyle: "bold",
    textAlignment: Gravity.Center,
});
```

图片示例：

```ts
image({
    imageUrl: "https://example.com/a.png",
    scaleType: ScaleType.ScaleAspectFill,
    placeHolderColor: Color.GRAY,
    errorColor: Color.RED,
});
```

图片来源支持：

- `image`: Doric `Resource`，如 `AssetsResource`
- `imageUrl`: 网络图片
- `imageFilePath`: 本地文件系统路径
- `imagePath`: 原生本地路径
- `imageRes`: 原生资源名
- `imageBase64`: Base64 图片
- `imagePixels`: 直接传像素数据

## Native API

当前 `doric-js` 导出的 Native API 包括：

- `modal`
- `navbar`
- `navigator`
- `network`
- `storage`
- `popover`
- `animate`
- `notification`
- `statusbar`
- `coordinator`
- `notch`
- `keyboard`
- `resourceLoader`
- `imageDecoder`

示例：

```ts
import { navbar, statusbar } from "doric";

navbar(this.context).setTitle("Home");
navbar(this.context).setHidden(false);
statusbar(this.context).setHidden(true);
```

也可以直接调用自定义原生插件：

```ts
this.context.callNative("cp_introduce_view", "showRule");
```

插件名和方法名需要由 Android/iOS/Web Runtime 注册对应实现。

## Ref 与状态更新

```ts
const titleRef = createRef<Text>();

text({
    ref: titleRef,
    text: "Old",
}).in(rootView);

titleRef.current.text = "New";
titleRef.apply({
    textColor: Color.RED,
});
```

Doric 的 `View` 使用 `@Property` 标记可同步属性。当属性变化时会被记录到 dirty props 中，Native 调用结束后由 `Panel` 汇总并渲染脏数据。开发时直接修改 View 属性即可：

```ts
number.text = `${count}`;
button.hidden = true;
container.backgroundColor = Color.WHITE;
```

如需在首次布局完成后读取原生尺寸：

```ts
this.addOnRenderFinishedCallback(async () => {
    const width = await rootView.getWidth(this.context);
    console.log(width);
});
```

## 构建与开发调试

在 Doric 应用目录执行：

```bash
npm run build
```

底层命令是：

```bash
doric build
```

执行流程：

1. `node_modules/.bin/tsc -p .`
2. `node_modules/.bin/rollup -c`
3. 合并 `bundle/**/*.js.map` 与 `.dxx/` 下的 SourceMap。
4. 如果存在 `assets/`，复制到 `bundle/assets/`。

输出目录通常为：

```text
bundle/
├── src/*.js
├── src/*.js.map
└── assets/
```

开发模式：

```bash
npm run dev
```

底层命令：

```bash
doric dev
```

默认端口：

- WebSocket 调试/热重载服务：`7777`
- 资源服务：`7778`

开发模式会监听 `bundle/` 下 JS 文件变化，同时启动 `tsc -w -p .` 和 `rollup -c -w`。Bundle 变化后，服务端会向连接的客户端发送 `RELOAD`。按 `Ctrl + R` 可重新打印本机 IP 与二维码。

清理构建产物：

```bash
doric clean
```

会删除：

```text
build/
bundle/
```

SSR 构建：

```bash
doric ssr build
```

## Android 运行与接入

运行脚手架 Android 工程：

```bash
npm run android
```

底层命令：

```bash
doric run android
```

要求：

- 当前目录存在 `android/`。
- 设置 `ANDROID_HOME` 或 `ANDROID_SDK_ROOT`。
- 已连接 Android 设备或启动模拟器。

接入现有 Android 应用时，在 `Application` 中初始化：

```java
import pub.doric.Doric;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Doric.init(this);
    }
}
```

使用 `DoricActivity`：

```java
Intent intent = new Intent(this, DoricActivity.class);
intent.putExtra("source", "assets://src/HelloDoric.js");
intent.putExtra("alias", "HelloDoric");
intent.putExtra("extra", "{\"userId\":\"10001\"}");
startActivity(intent);
```

嵌入 `DoricPanel`：

```java
DoricPanel panel = new DoricPanel(this);
panel.config(scriptContent, "HelloDoric", "{\"from\":\"android\"}");
container.addView(panel, new FrameLayout.LayoutParams(
        FrameLayout.LayoutParams.MATCH_PARENT,
        FrameLayout.LayoutParams.MATCH_PARENT
));
```

注册 JS Loader：

```java
Doric.addJSLoader(customLoader);
```

注册插件库：

```java
Doric.registerLibrary(new DoricLibrary() {
    @Override
    public void load(DoricRegistry registry) {
        // registry.registerNativePlugin(...)
        // registry.registerViewNode(...)
    }
});
```

更完整的 Android 接入说明请查看 [Android 应用中使用 Doric](./android.html)。

## iOS 运行与接入

运行脚手架 iOS 工程：

```bash
npm run ios
```

底层命令：

```bash
doric run iOS
```

要求：

- 当前目录存在 `iOS/`。
- 安装 Xcode 与 CocoaPods。
- 真机运行需要 `ios-deploy`。

使用 `DoricViewController`：

```objectivec
#import <Doric/Doric.h>

DoricViewController *vc = [[DoricViewController alloc]
    initWithSource:@"assets://src/HelloDoric.js"
    alias:@"HelloDoric"
    extra:@"{\"from\":\"ios\"}"];
[self.navigationController pushViewController:vc animated:YES];
```

嵌入 `DoricPanel`：

```objectivec
DoricPanel *panel = [DoricPanel new];
[panel config:script alias:@"HelloDoric" extra:@"{\"from\":\"ios\"}"];
[self addChildViewController:panel];
[self.view addSubview:panel.view];
```

注册 JS Loader：

```objectivec
[Doric addJSLoader:loader];
```

注册插件库：

```objectivec
[Doric registerLibrary:library];
```

更完整的 iOS 接入说明请查看 [iOS 应用中使用 Doric](./ios.html)。

## Web 端使用

`doric-web` 构建后会注册两个自定义元素：

- `<doric-div>`：加载并渲染单个 Doric Bundle。
- `<doric-navigation>`：提供导航容器能力。

构建 Web Runtime：

```bash
cd doric-web
npm install
npm run build
```

在 HTML 中使用：

```html
<doric-div
    src="../doric-demo/bundle/src/NavigatorDemo.js"
    alias="NavigatorDemo"
    data='{"from":"web"}'>
</doric-div>

<script src="./dist/index.js"></script>
```

`<doric-div>` 属性：

| 属性 | 说明 |
| --- | --- |
| `src` | JS Bundle 地址 |
| `alias` | 页面别名，主要用于错误提示 |
| `data` | 初始化数据，JS 侧通过 `getInitData()` 获取 |

可以通过 `registerDoricJSLoader` 自定义 Bundle 加载逻辑：

```ts
import { registerDoricJSLoader } from "doric-web";

registerDoricJSLoader({
    filter: (source) => source.startsWith("assets://"),
    request: async (source) => {
        const url = source.replace("assets://", "/bundle/");
        const ret = await fetch(url);
        return ret.text();
    },
});
```

## 资源使用

脚手架项目默认包含 `assets/`。构建时 `doric build` 会复制：

```text
assets/ -> bundle/assets/
```

JS 侧可使用：

```ts
image({
    image: new AssetsResource("logo_doric.png"),
});
```

也可以使用原生资源：

```ts
image({
    imageRes: "icon_name",
});
```

Android 会尝试读取 drawable；iOS 会尝试读取 Image Assets。

## 示例工程

主仓库 `doric-demo/src` 下包含大量示例：

| 示例 | 说明 |
| --- | --- |
| `SimpleDemo.ts` | 基础布局、图片、点击事件 |
| `TSXDemo.tsx` | TSX、Ref、渲染完成回调 |
| `ListDemo.ts` | 列表 |
| `FlowLayoutDemo.ts` | 流式布局 |
| `SliderDemo.ts` | 轮播/分页 |
| `RefreshableDemo.ts` | 下拉刷新 |
| `ModalDemo.ts` | 弹窗 |
| `NavigatorDemo.ts` | 页面导航 |
| `NetworkDemo.ts` | 网络请求 |
| `StorageDemo.ts` | 本地存储 |
| `ImageProcessorDemo.tsx` | 图片处理 |
| `KeyboardDemo.ts` | 键盘能力 |
| `StatusBarDemo.ts` | 状态栏能力 |

构建 demo：

```bash
cd doric-demo
npm install
npm run build
```

开发模式：

```bash
npm run dev
```

## 常见问题

### `doric run android` 提示找不到 Android Project

确保当前目录是脚手架生成的应用根目录，并且包含 `android/`。

### `doric run android` 提示缺少 `ANDROID_HOME` 或 `ANDROID_SDK_ROOT`

配置 Android SDK 环境变量：

```bash
export ANDROID_HOME=/path/to/Android/sdk
export PATH="$ANDROID_HOME/platform-tools:$PATH"
```

### `doric run iOS` 找不到工程

确保当前目录包含 `iOS/`，并且 `pod install` 后能生成唯一的 `*.xcworkspace`。

### 修改资源后没有加载新文件

重新执行：

```bash
doric build
```

确认资源已复制到：

```text
bundle/assets/
```

### Web 加载 Bundle 失败

检查：

- `<doric-div src="...">` 地址是否能被浏览器访问。
- 是否存在跨域限制。
- 是否需要通过 `registerDoricJSLoader` 自定义加载逻辑。

### 布局尺寸异常

优先检查：

- `layoutConfig().just()` 是否同时设置了 `width` 和 `height`。
- `layoutConfig().fit()` 是否依赖内容尺寸。
- `layoutConfig().most()` 的父容器是否有明确尺寸。
- `VLayout/HLayout` 中是否需要设置 `weight`。

