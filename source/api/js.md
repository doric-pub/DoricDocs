---
title: Doric JS Framework
---
Doric使用TypeScript作为开发语言，提供了一套TypeScript框架层接口。
在开发Doric程序时，需依赖该框架层实现功能。

# 安装
Doric JS程序发布在NPM官网，您可直接通过`npm`命令安装

```bash
$ npm install doric@latest
```

# 基础类及相关接口

## Panel - 页面单元面板基类

具备完整的页面生命周期回调，以及区域内视图的构建逻辑。

回调 | 描述
--- | ---
`onCreate`|Panel被创建时的回调
`onDestroy`|Panel被销毁时的回调
`onShow`|Panel显示在前台的回调
`onHidden`|Panel从前台切换到后台时的回调
`build(root:Group)`|构建视图时的回调

其它API | 描述
--- | ---
`getRootView():Group`|获取根视图
`getInitData():object\|undefined`|获取初始化参数


## Entry - 入口标示
用于`Panel`子类的注解，表示Doric程序运行的入口。
被其标记的Panel类将被自动创建实例并挂载。
用法如下:
```typescript
@Entry 
MyPanel extends Panel {
    ...
}
```

## context - JS沙箱环境的上下文
在Doric程序中，您可将context当作全局变量使用。    

context中存储了当前运行所处沙盒信息。
当调用原生桥API时，您需要传入context作为参数。

```typescript
    modal(context).toast('This is a toast.')
```
    

当您自定义原生桥时，您也可直接调用context进行使用。

```typescript
    //如果您定义的插件名为'myPlugin',方法名为'myMethod'
    const resultPromise = context.myPlugin.myMethod(parameters)
```
    
## Environment - 平台环境参数
Environment提供了当前Doric应用所处平台及系统的环境参数，作为全局变量使用。
定义字段如下:

属性 |类型 | 描述
--- | --- | ---
platform|string|标示所处平台，可取值为`"Android" \| "iOS" \| "Qt" \| "h5"`
platformVersion|string|平台系统版本号
appName|string|应用名称
appVersion|string|应用版本号
screenWidth|number|屏幕宽度
screenHeight|number|屏幕高度

用法如下：

```typescript
if (Environment.platform === 'Android') {
    ///Do something
}else {

}

```
## View - 所有视图控件的基类

Doric中所有视图控件的基类。
属性如下：

属性 |类型 | 描述
--- | --- | ---
width | number |控件宽度
height |number |控件高度
backgroundColor|Color|控件背景色
corners |```number \| { leftTop?: number; rightTop?: number; leftBottom?: number; rightBottom?: number } ```| 圆角半径，可分别定义上下左右四个圆角半径
border|`{ width: number; color: Color; }`|边框，可设置宽度及颜色
shadow|`{ color: Color; opacity: number; radius: number; offsetX: number; offsetY: number}`|阴影，可设置阴影颜色，透明度，阴影半径及偏移位置
alpha|number|控件透明度，取值范围为[0-1]
hidden|boolean|控件是否为隐藏
padding|`{left?: number,right?: number,top?: number,bottom?: number,}`|控件内边距
layoutConfig|`LayoutConfig` | 控件的布局属性
onClick|`()=>void`|控件的点击回调


### Text - 文本控件

属性如下：

属性 |类型 | 描述
--- | --- | ---
text|string|文本内容
textColor|Color|文本颜色
textSize|number|文本尺寸
maxLines|number|最大文本行数
textAlignmnet|Gravity|文本对齐方式

用法如下:
```typescript
            text({
                text: "Text Demo",
                layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                textSize: 30,
                textColor: Color.WHITE,
                backgroundColor: colors[1],
                textAlignment: gravity().center(),
                height: 50,
            }),
```
### Input - 文本输入或编辑

属性如下：

属性 |类型 | 描述
--- | --- | ---
text|string|已输入文本
textColor|Color|已输入文本颜色
textSize|number|已输入文本尺寸
textAlignmnet|Gravity|文本对齐方式
hintText|string|提示文案
hintTextColor|Color|提示文案颜色
multiline|boolean|是否多行文本
onTextChange|(text: string) => void|文本变化回调
onFocusChange|(focused: boolean) => void|输入焦点变化回调

方法 |类型 | 描述
--- | --- | ---
getText|(context: BridgeContext)=>Promise<string>|获取当前已输入文本
setSelection|(context: BridgeContext, start: number, end: number = start)=>Promise<any>|设置选中项
requestFocus|(context: BridgeContext)=>Promise<any>|请求获取焦点
releaseFocus|(context: BridgeContext)=>Promise<any>|请求释放焦点

用法如下:
```typescript
            input({
                layoutConfig:layoutConfig().just().configHeight(LayoutSpec.FIT),
                width:300,
                hintText : "HintText",
                textAlignment: Gravity.Left,
                onTextChange:(s) => {
                    log(`onTextChange:${s}`)
                },
                onFocusChange: (f) => {
                    log(`onFocusChange:${f}`)
                }
            }),
```
### Image - 图片控件

属性如下：

属性 |类型 | 描述
--- | --- | ---
imageUrl|string|图片在线地址
imageBase64|string|Base64编码的图片内容
scaleType|ScaleType|图片缩放方式
isBlur|boolean|是否高斯模糊
loadCallback|(image: { width: number; height: number } \| undefined) => void|图片加载回调

用法如下:
```typescript
            image({
                imageUrl,
                width: 300,
                height: 300,
                scaleType: ScaleType.ScaleAspectFit,
                layoutConfig: layoutConfig().just(),
            }),
```
### VLayout - 垂直线性布局组件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|水平方向上子控件的对齐方式

用法如下：
```typescript
                    vlayout([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IVLayout),
```

### HLayout - 水平线性布局容器控件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|垂直方向上子控件的对齐方式

用法如下：
```typescript
                    hlayout([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IHLayout),
```

### Stack - 层叠布局容器控件

子控件都是相对于其左上角顶点摆放

用法如下：
```typescript
                    stack([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IHLayout),
```

### List - 列表控件

属性 |类型 | 描述
--- | --- | ---
itemCount|number|列表条数
renderItem|(index: number) => ListItem|列表每项渲染回调
loadMore|boolean|设置是否显示加载更多
loadMoreView|ListItem|显示在底部表示加载更多的视图
onLoadMore|() => void|加载更多的回调

用法如下：
```typescript
                list({
                    itemCount: 0,
                    renderItem: (idx) => listItem(text({
                                            layoutConfig: {
                                                widthSpec: LayoutSpec.MOST,
                                                heightSpec: LayoutSpec.JUST,
                                                alignment: gravity().center(),
                                            },
                                            text: `Cell At Line ${idx}`,
                                            textAlignment: gravity().center(),
                                            textColor: Color.BLACK,
                                            textSize: 20,
                                            height: 50,
                                        })),
                    layoutConfig: layoutConfig().most(),
                }),
```

### Scroller - 滑动控件

属性 |类型 | 描述
--- | --- | ---
content|View|可滑动的内容视图

用法如下：
```typescript
                scroller(
                    vlayout(new Array(100).fill(1).map(e => label('Scroll Content')))
                ).apply({
                    layoutConfig: layoutConfig().just(),
                    width: 300,
                    height: 500,
                    backgroundColor: Color.RED,
                }),
```

### Slider - 翻页滑动(幻灯片)控件

属性 |类型 | 描述
--- | --- | ---
itemCount|number|幻灯片页数
renderPage|(index: number) => SlideItem|每页的渲染回调
onPageSlided|(index: number) => void|幻灯片滑动回调

```typescript
            slider({
                itemCount: 100,
                renderPage: (idx) => {
                    return slideItem(image({
                        imageUrl: imageUrls[idx % imageUrls.length],
                        scaleType: ScaleType.ScaleAspectFit,
                        layoutConfig: layoutConfig().most(),
                    }))
                },
                layoutConfig: layoutConfig().most(),
            }),
```

### FlowLayout - 流式网格布局控件

属性 |类型 | 描述
--- | --- | ---
itemCount|number|内容总条数
renderItem|(index: number) => FlowLayoutItem|每条内容的渲染回调
columnCount|number|每行列数
columnSpace|number|列间距
rowSpace|number|行间距
loadMore|boolean|设置是否显示加载更多
loadMoreView|FlowLayoutItem|显示在底部表示加载更多的视图
onLoadMore|() => void|加载更多的回调

用法如下：
```typescript
        flowlayout({
            layoutConfig: layoutConfig().most(),
            itemCount: 100,
            columnCount: 3,
            columnSpace: 10,
            rowSpace: 10,
            renderItem: (idx) => {
                return flowItem(text({
                    text: `${idx}`,
                    textColor: Color.WHITE,
                    textSize: 20,
                    layoutConfig: layoutConfig().fit().configAlignmnet(Gravity.Center)
                })).apply({
                    backgroundColor: colors[idx % colors.length],
                    height: 50 + (idx % 3) * 20,
                    layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                })
            },
        })
```