---
title: API
---
本文提供更详尽的API接口信息供您查阅，使您更深入地了解Doric组件用法或拓展使用。

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

### Image

### VLayout

### HLayout

### Stack

### List

### Scroller

### Slider

## Panel

## Entry
