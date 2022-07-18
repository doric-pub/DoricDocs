---
title: View - 视图基类
---
View是Doric中所有视图组件的基类

## API

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

## 自定义视图组件
### 原生视图组件
您可以通过这篇[文档](../docs/view.html)方便地将原生的视图组件转为Doric控件。
### JS封装组件
您可参考[文档](../docs/viewComponent.html)定义视图组件
