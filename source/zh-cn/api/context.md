---
title: context - Doric中的上下文
---
context在原生层区分JS沙盒环境时,起到代表上下文的作用

## 使用注意

### 单Panel
在一个Bundle只存在一个Panel时, 您可直接使用`context`当作全局变量使用。

### 多Panel
如果您将多个Panel打包到一个Bundle中,推荐您使用`panel`中的`context`值.
此时全局的`context`变量仅为主Panel中的`context`值


## 类型定义
context的类型为`BridgeContext`
* `id: string;` 
  标识该context的唯一标识,一般不需要直接使用
* `entity: any;`
  一般情况下,都是指的当前`context`对应的`panel`实例
* `callNative(namespace: string, method: string, args?: any): Promise<any>;`
  调用原生Plugin插件, 如果您自定义注册了平台插件,可以调用此方法调用平台插件接口
* `function2Id(func: Function): string;`
  在与原生通信时,如果数据类型为`Function`,请先调用该方法转为`string`,再进行数据传输
* `removeFuncById(funcId: string): void;`
  在与原生通信结束后,调用该方法及时释放掉转换的`Function`,防止内存引用不释放

## 调用原生桥
当调用原生桥API时，您需要传入context作为参数。

```typescript
    modal(context).toast('This is a toast.')
```

