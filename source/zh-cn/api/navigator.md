---
title: navigator-导航控制器
---

提供导航控制器相关API

### push
跳转到新的Doric页面
* 参数类型:
```typescript
source:string,/// 新的Doric页面对应的Source地址
config?: {
            alias?: string | undefined; /// 别名，用于调试信息
            animated?: boolean | undefined; ///是否启用跳转动画
            extra?: object | undefined; /// 新的Doric页面携带的参数
        } | undefined)
```

* 返回值: 
```typescript
Promise<any>
```

* 使用示例: 
```typescript
// 方式1
import { ComponentDetail } from "./ComponentDetail";

navigator(context).push(ComponentDetail, {
    extra: {},
    animated: true,
});

// 方式2
navigator(context).push("https://raw.githubusercontent.com/doric-pub/DoricCookbook/v0.1.5/bundle/src/DoricExamples.js");
   
// 方式3
navigator(context).push(`assets://src/TestDemo.js`, { extra: model})

```

### pop
跳出当前页面
* 参数类型:
```typescript
animated?: boolean ///是否启用跳转动画
```

* 返回值: 
```typescript
Promise<any>
```

* 使用示例: 
```typescript
// 方式1
navigator(context).pop()

// 方式2
navigator(context).pop(false)
```

### popSelf
将当前控制器从导航里移除
* 参数类型:
```typescript
animated?: boolean ///是否启用跳转动画
```

* 返回值: 
```typescript
Promise<any>
```

* 使用示例: 
```typescript
navigator(context).popSelf()
```

### popToRoot
pop到根视图控制器
* 参数类型:
```typescript
animated?: boolean ///是否启用跳转动画
```

* 返回值: 
```typescript
Promise<any>
```

* 使用示例: 
```typescript
navigator(context).popToRoot()
```


### openUrl
通过系统浏览器打开链接
* 参数类型:
```typescript
url: string  /// 链接url
```

* 返回值: 
```typescript
Promise<any>
```

* 使用示例: 
```typescript
navigator(context).openUrl('https://doric.pub/')
```
