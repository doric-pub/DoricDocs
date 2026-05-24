---
title: 注册Doric拓展
---
> 当您需要在Doric中使用已有的原生组件或接口能力时，您可以选择针对Doric SDK进行拓展。
> 本文讲解在Doric中如何进行注册原生组件或接口。

Doric 扩展主要分为两类：

| 类型 | 用途 | 文档 |
| --- | --- | --- |
| Native Plugin | 扩展原生能力，例如定位、扫码、加密、业务 SDK 调用 | [能力组件](./plugin.html) |
| ViewNode | 扩展原生视图，例如自定义播放器、地图、复杂图表 | [视图组件](./view.html) |

如果需要创建同时包含 JS、Android、iOS 模板的扩展库，可以使用 CLI：

```bash
doric createLib MyLibrary
```

生成的扩展库通常包含：

- JS API 与类型定义。
- Android Library 模板。
- iOS Pod 模板。
- `example/` 示例工程。

# Doric Library
`DoricLibrary` 用于集中注册扩展能力。建议一个业务或三方能力包对应一个 Library，便于统一安装、注册和维护。

1. 您可以实现您自己的`DoricLibrary`，并在其中管理您的拓展组件或接口插件。
在Android中:
```java
@DoricComponent
public class MyLibrary extends DoricLibrary {
    @Override
    public void load(DoricRegistry registry) {
        ///注册一个原生插件
        registry.registerNativePlugin(DemoPlugin.class);
        ///注册一个原生视图
        registry.registerViewNode(DemoViewNode.class);
    }
}

```
在iOS中:
```objectivec
@interface MyLibrary : DoricLibrary
@end
@implementation MyLibrary
- (void)load:(DoricRegistry *)registry {
    ///注册一个原生插件
    [registry registerNativePlugin:[DoricDemoPlugin class] withName:@"demo"];
    ///注册一个原生视图
    [registry registerViewNode:[DoricDemoViewNode class] withName:@"DemoView"];
}
@end
```
1. 在Doric初始化之前的时机，注册您创建的Library
Android:
```java
    Doric.registerLibrary(new DemoLibrary());
```
iOS:
```objectivec
    [Doric registerLibrary:[DemoLibrary new]];
```

注册时机通常放在应用初始化阶段，且需要早于 Doric 页面加载。

**关于如何定义原生插件，请查看[文档](./plugin.html)**

**关于如何定义原生视图，请查看[文档](./view.html)**

# JS API 导出

扩展库除了注册原生实现，还需要提供 JS 侧 API，供业务页面以类型安全的方式调用。

```typescript
import { BridgeContext } from "doric";

export function demo(context: BridgeContext) {
    return {
        add: (a: number, b: number) => {
            return context.callNative("demo", "add", { a, b }) as Promise<number>;
        },
    };
}
```

对于视图组件，需要在 JS 侧声明对应 View 类，并确保 Native 注册名与 JS `viewType` 一致。

# 调试建议

扩展开发时建议使用 `createLib` 生成的 `example/` 工程验证：

```bash
cd MyLibrary/example
npm install
npm run dev
```

常见检查项：

- JS 侧插件名与 Native 注册名是否一致。
- JS 方法名与 Native 方法名是否一致。
- Android 方法是否加了 `@DoricMethod`。
- iOS 方法签名是否符合 Doric Promise 约定。
- ViewNode 名称是否与 JS 侧 View 类型一致。
- 扩展库是否在 Doric 初始化前完成注册。
