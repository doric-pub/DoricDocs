---
title: 新增Doric扩展接口插件
---
> 本文介绍如何在Android和iOS侧自定义Native插件，并供Doric调用。
> 本文以定义一个原生的加法器举例.
# 步骤
1. 在Doric TS侧定义好TS语言的API
1. 在Android和iOS端根据定义的API实现相应功能
1. 在`DoricLibrary`中注册原生插件
1. 在Doric TS代码中调用TS API

插件名、方法名、参数结构需要在 JS、Android、iOS 之间保持一致。建议先定义 JS API，再按 API 契约实现各端。

# JS API
首先需要定义JS部分的API，注意此处API定义的名称需要在接下来Android和iOS的开发中保持一致。
定义API如下,`context`参数代表JS环境上下文在调用时直接传入即可。
`nativeAdd`参数为`first`,`second`，都是`number`类型，返回值为`number`类型的`Promise`。

`context.callNative`方法参数1为插件名，参数2为插件内方法名，参数3为插件方法接收的参数。

请注意，对于有返回值的Plugin，其返回值都为`Promise`类型，即异步返回。

```typescript
export function examplePlugin(context: BridgeContext) {
    return {
        nativeAdd: (first: number, second: number) => {
            /// 参数1examplePlugin为插件名，参数2nativeAdd为插件内方法名，参数3{ first, second }为插件方法接收的参数。
            return context.callNative("examplePlugin", "nativeAdd", { first, second }) as Promise<number>
        },
    }
}
```
# Android
1. 新建Plugin类，如下:
```java
/**
 * 此处注解值name对应TS步骤中的插件名
 */
@DoricPlugin(name = "examplePlugin")
public class DoricExamplePlugin extends DoricJavaPlugin {
    public DoricExamplePlugin(DoricContext doricContext) {
        super(doricContext);
    }

    /**
     * 方法名nativeAdd对应TS步骤中的插件方法名，需要加上DoricMethod注解
     * @param argument  从TS侧传入的插件方法接收参数，即  { first, second }
     * @param promise DoricPromise封装类，用于JS Promise回调。
     */
    @DoricMethod
    public void nativeAdd(JSObject argument, DoricPromise promise) {
        try {
            // 取值
            double first = argument.getProperty("first").asNumber().toDouble();
            // 取值
            double second = argument.getProperty("second").asNumber().toDouble();
            // 返回值
            JavaValue returnValue = new JavaValue(first + second);
            // 传回返回值
            promise.resolve(returnValue);
        } catch (Exception e) {
            // 出错，回调
            promise.reject(new JavaValue(e.getLocalizedMessage()));
        }
    }
}
```
1.在对应的`DoricLibrary`类中进行注册。
```java
@DoricComponent
public class MyLibrary extends DoricLibrary {
    @Override
    public void load(DoricRegistry registry) {
        registry.registerNativePlugin(DoricExamplePlugin.class);
    }
}
```
1.结束Android部分的开发，重新编译代码并安装运行。

## Android 注意事项

- 插件类需要继承 `DoricJavaPlugin`。
- 插件类需要使用 `@DoricPlugin(name = "...")` 标记插件名。
- 可被 JS 调用的方法需要使用 `@DoricMethod` 标记。
- 有返回值或异步结果时，通过 `DoricPromise` 回调。
- 出错时应调用 `promise.reject(...)`，不要静默失败。

# iOS
1. 新建Plugin类，如下:

```objectivec
@interface DoricExamplePlugin : DoricNativePlugin

@end

@implementation DoricExamplePlugin
// 此处方法名nativeAdd对应TS步骤中的插件方法名, withPromise为固定的名称，如果不需要返回值，可不带。
- (void)nativeAdd:(NSDictionary *)arguments withPromise:(DoricPromise *)promise {
    // 取值
    CGFloat first = [arguments[@"first"] floatValue];
    // 取值
    CGFloat second = [arguments[@"second"] floatValue];
    // 返回值
    NSNumber *returnValue = @(first + second);
    // 此处的if判断仅为示例，实际不需要
    if (returnValue) {
        // 传回返回值
        [promise resolve:returnValue];
    } else {
        // 出错回调
        [promise reject:@"This is just for exampling,should not happen"];
    }
}
@end
```
1.在对应的`DoricLibrary`类中进行注册。
```objectivec
@implementation DemoLibrary
- (void)load:(DoricRegistry *)registry {
    ///此处withName参数对应TS步骤中的插件名
    [registry registerNativePlugin:[DoricExamplePlugin class] withName:@"examplePlugin"];
}
@end
```
1.结束iOS部分的开发，重新编译代码并安装运行。

## iOS 注意事项

- 插件类需要继承 `DoricNativePlugin`。
- 注册时通过 `withName` 指定插件名。
- 带 Promise 的方法签名通常为 `methodName:(NSDictionary *)arguments withPromise:(DoricPromise *)promise`。
- 无返回值方法可以不带 Promise，但需要根据业务确认 JS 侧是否等待结果。
- 出错时应调用 `[promise reject:...]`。

# TypeScript调用
使用时，调用JS API即可。
```typescript
examplePlugin(context).nativeAdd(1,2).then(result=>{
    log(`此处result应为从Native侧传入的参数,值为${result}。`)
})
```
或者使用`await`,`async`方式调用
```typescript
async function callNativeExamplePlugin() {
    const result = await examplePlugin(context).nativeAdd(1,2)
    log(`此处result应为从Native侧传入的参数,值为${result}。`)
}
```

# 常见问题

## JS 调用后没有进入 Native 方法

优先检查：

- `context.callNative` 的第一个参数是否与 Native 注册的插件名一致。
- 第二个参数是否与 Native 方法名一致。
- Android 方法是否添加 `@DoricMethod`。
- iOS 注册 `withName` 是否正确。
- Library 是否已经在 Doric 初始化前注册。

## Promise 一直不返回

检查 Native 方法中是否所有分支都会调用 `promise.resolve` 或 `promise.reject`。如果方法内部有异步逻辑，需要确保异步回调仍能持有并正确使用 `DoricPromise`。

## 参数类型不符合预期

建议 JS API 层固定参数结构，Native 侧只按该结构解析。避免直接在业务代码中到处写 `context.callNative`，否则不同调用处容易出现字段名不一致。
