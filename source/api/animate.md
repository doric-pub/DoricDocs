---
title: animate-动画相关
---

提供动画相关API

* 参数类型:
```typescript
{
    ///在该回调里设置的View相关的变更将在duration时段内渐变过渡
    animations: () => void;
    ///动画时长
    duration: number;
}
```
* 返回值: 
```typescript
Promise<any>
```

* 使用示例:
```typescript
 animate(context)({
    animations: () => {
        view.y = view.y || 0
        view.y += 100
        view2.y += 50
    },
    duration: 1000,
})
```