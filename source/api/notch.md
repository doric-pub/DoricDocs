---
title: notch-刘海屏安全区域
---

获取刘海屏安全区域相关API

### inset

获取刘海屏安全区域

* 参数类型：
```typescript
void
```
* 返回值:
```typescript
Promise<{
    top: number,
    left: number,
    bottom: number,
    right: number,
}>
```

* 使用示例：
```typescript
notch(context).inset()
              .then((inset) => {
                    let result = "top: " + inset.top + "\n" + "left: " + inset.left + "\n" + "bottom: " + inset.bottom + "\n" + "right: " + inset.right
                    modal(context).toast(result, Gravity.Bottom)
                })
```

