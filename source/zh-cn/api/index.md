---
title: API
---
本文提供更详尽的API接口信息供您查阅，使您更深入地了解Doric组件用法或拓展使用。

## Panel
Doric中的视图控制器。其内部有完整的生命周期回调。

方法 | 描述
--- | ---
`onCreate`|Panel被创建时的回调
`onDestroy`|Panel被销毁时的回调
`onShow`|Panel显示在前台的回调
`onHidden`|Panel从前台切换到后台时的回调
`build(root:Group)`|构建视图时的回调
`getRootView():Group`|获取根视图
`getInitData():object\|undefined`|获取初始化参数


## Entry
用于`Panel`子类的注解，表示Doric程序运行的入口。
被其标记的Panel类将被自动创建实例并挂载。
用法如下:
```typescript
@Entry 
MyPanel extends Panel {
    ...
}
```

## View

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


### Text

`Text`控件用于展示文本
属性如下：

属性 |类型 | 描述
--- | --- | ---
text|string|文本内容
textColor|Color|文本颜色
textSize|number|文本尺寸
maxLines|number|最大文本行数
textAlignmnet|Gravity|文本对齐方式

### Input

`Input`控件用于文本输入或编辑
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

### Image
`Image`控件用于展示图片
属性如下：

属性 |类型 | 描述
--- | --- | ---
imageUrl|string|图片在线地址
imageBase64|string|Base64编码的图片内容
scaleType|ScaleType|图片缩放方式
isBlur|boolean|是否高斯模糊
loadCallback|(image: { width: number; height: number } \| undefined) => void|图片加载回调

### VLayout
`VLayout`是线性垂直布局容器控件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|水平方向上子控件的对齐方式

### HLayout
`HLayout`是线性垂直布局容器控件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|垂直方向上子控件的对齐方式

### Stack
`Stack`是层叠布局容器控件
子控件都是相对于其左上角顶点摆放

### List
`List`是列表控件

### Scroller
`Scroller`是滑动控件

### Slider
`Slider`是幻灯片控件
