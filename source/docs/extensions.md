---
title: 注册Doric拓展
---
> 当您需要在Doric中使用已有的原生组件或接口能力时，您可以选择针对Doric SDK进行拓展。
> 本文讲解在Doric中如何进行注册原生组件或接口。

# Doric Library
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

**关于如何定义原生插件，请查看[文档](./plugin.html)**

**关于如何定义原生视图，请查看[文档](./view.html)**

