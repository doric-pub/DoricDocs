---
title: statusbar-状态栏
---

提供状态栏设置API

### setHidden
设置隐藏或显示导航栏
* 参数类型:
```typescript
boolean
```
* 返回值: 
```typescript
Promise<any>
```

### setMode
设置导航栏模式为深色或浅色
* 参数类型:
```typescript
enum StatusBarMode {
        LIGHT = 0,
        DARK = 1
}
```
* 返回值: 
```typescript
Promise<any>
```
**使用示例：**
```typescript
statusbar(context).setHidden(false)
statusbar(context).setColor(Color.DKGRAY)
statusbar(context).setMode(StatusBarMode.DARK)
```
