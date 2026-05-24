---
title: popover-浮层弹窗
---

提供浮层弹窗API

### show
显示浮层
* 参数类型:
```typescript
view: View /// 需显示的浮层View
```
* 返回值: 
```typescript
Promise<any>
```

* 使用示例:
```typescript
popover(context).show(stack([
    text({
        width: 200,
        height: 50,
        textColor: Color.WHITE,
        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
        text: "This is PopOver Window",
        })
    ],{
        layoutConfig: layoutConfig().most().configMargin({left: 20, right:20, top:20, bottom:20}),
        backgroundColor: Color.RED.alpha(1),
}))
```

### dismiss
隐藏浮层
* 参数类型:
```typescript
view?: View | undefined/// 需消失的浮层View，如果传入undefined，则当前所有浮层都会消失
```
* 返回值: 
```typescript
Promise<any>
```

* 使用示例:
```typescript
popover(context).dismiss();
```