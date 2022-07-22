---
title: navbar-导航栏
---

提供导航栏相关API

### isHidden
当前导航栏是否隐藏
* 参数类型:
```typescript
hidden: boolean 
```
* 返回值: 
```typescript
Promise<boolean>
```

### setHidden
设置导航栏显示或隐藏，
**请注意：当设置导航栏为隐藏后，Doric视图原点为屏幕左上角，即状态栏会覆盖在DoricPanel之上**
* 参数类型:
```typescript
hidden:boolean
```
* 返回值: 
```typescript
Promise<any>
```

### setTitle
设置导航栏标题
* 参数类型:
```typescript
title:string
```
* 返回值: 
```typescript
Promise<any>
```

### setBgColor
设置导航栏背景颜色
* 参数类型:
```typescript
color:Color
```
* 返回值: 
```typescript
Promise<any>
```

### setLeft
设置导航栏左侧Icon或文字按钮
* 参数类型:
```typescript
view: View
```
* 返回值: 
```typescript
Promise<any>
```
### setRight
设置导航栏右侧Icon或文字按钮
* 参数类型:
```typescript
view: View
```
* 返回值: 
```typescript
Promise<any>
```

### 使用示例
```typescript
const isHidden = await navbar(context).isHidden()
navbar(context).setBgColor(Color.CYAN)
navbar(context).setHidden(true)
navbar(context).setTitle('首页')
```