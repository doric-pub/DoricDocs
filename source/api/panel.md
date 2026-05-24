---
title: Panel - 页面单元面板基类
---

## API

具备完整的页面生命周期回调，以及区域内视图的构建逻辑。

回调 | 描述
--- | ---
`onCreate`|Panel被创建时的回调
`onDestroy`|Panel被销毁时的回调
`onShow`|Panel显示在前台的回调
`onHidden`|Panel从前台切换到后台时的回调
`build(root:Group)`|在该方法中构建视图

其它API | 描述
--- | ---
`getRootView():Group`|获取根视图
`getInitData():object\|undefined`|获取初始化参数,可以从Native原生侧传入


## Entry - 入口标示注解
用于`Panel`子类的注解，表示Doric程序运行的入口。
被其标记的Panel类将被自动创建实例并挂载。
用法如下:
```typescript
//In MyPanel.ts
@Entry 
MyPanel extends Panel {
    ...
}
```
## 编译配置
在Doric工程中,我们会根据根目录中的`index.ts`中写的文件列表将对应的代码编译进`bundle`文件夹中
一般`Entry`标注的`Panel`代码文件会作为入口文件,请将该文件写入`index.ts`文件中.
```typescript
export default [
    "src/HelloDoric",
    ///添加入口文件MyPanel.ts
    "src/MyPanel",
    ];
```
## 多Panel打包
Doric支持将多个Panel打包成一个Bundle文件,多个Panel之间可以相互跳转.
在`index.ts`文件中可以如下配置:
```typescript
export default [
    ///这是入口的Panel
    "src/HomePanel",
    ]
```
跳转时,直接使用其他Panel的引用即可:

```typescript
navigator(context).push(OtherPanel)
```