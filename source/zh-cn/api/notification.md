---
title: notification-广播/通知
---

提供广播订阅机制API

### publish
发出广播通知
* 参数类型:
```typescript
{
    /// 业务唯一ID前缀
    biz?: string | undefined;
    /// 广播名称
    name: string;
    /// 广播携带的数据
    data?: object | undefined;
    /// Android上是否通过系统广播发送，默认通过LocalBroadcast发送
    androidSystem?: boolean | undefined;
}
```
* 返回值: 
```typescript
Promise<any>
```

* 使用示例:
```typescript
notification(this.context).publish({
              biz: "Test",
              name: "Demo",
              data: {
                a: "1",
                b: "2",
              },
            });
```

### subscribe
订阅广播
* 参数类型:
```typescript
{
    /// 业务唯一ID前缀
    biz?: string | undefined;
    /// 广播名称
    name: string;
    /// 收到广播时的回调，广播携带的数据通过参数传入
    callback: (data?: any) => void;
    /// Android上是否监听系统广播，默认监听LocalBroadcast
    androidSystem?: boolean | undefined;
}
```
* 返回值: 
```typescript
Promise<string> /// 返回SubscribeID
```

* 使用示例:
```typescript
notification(context)
    .subscribe({
        biz: "Test",
        name: "Demo",
        callback: (data) => {
            modal(context).alert(`Received notification,data is ${JSON.stringify(data)}`);},
        })
    .then((e) => {
        this.subscribeId = e;
    });
```

### unsubscribe
取消订阅广播
* 参数类型:
```typescript
string /// subscribe方法的返回值
```
* 返回值: 
```typescript
Promise<any>
```
* 使用示例:
```typescript
notification(context)
    .unsubscribe(this.subscribeId)
    .then((e) => {
        this.subscribeId = undefined;
    });
```
