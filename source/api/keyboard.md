---
title: keyboard-监听键盘
---

监听键盘frame变化相关API

### subscribe

监听键盘frame变化

* 参数类型：
```typescript
callback: (data: { 
    oldBottomMargin: number, /// 键盘起始位置时离底部间距
    oldHeight: number,  /// 键盘起始位置时的高度
    bottomMargin: number,  /// 键盘最终位置时离底部间距
    height: number }  /// 键盘最终位置时的高度
```
* 返回值:
```typescript
Promise<string>  /// 返回一个订阅id
```

* 使用示例：
```typescript
keyboard(context).subscribe(data => {
                    bottomView.translationY = - (data.bottomMargin + data.height)
                }).then(e => {
                    this.subscribeId = e
                })
```

### unsubscribe

监听键盘frame变化

* 参数类型：
```typescript
subscribeId: string   /// 订阅id
```
* 返回值:
```typescript
Promise<any>
```

* 使用示例：
```typescript
keyboard(context).unsubscribe(this.subscribeId)
                 .then(e => {
                      this.subscribeId = undefined
                })
```