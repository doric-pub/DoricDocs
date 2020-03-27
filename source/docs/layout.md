---
title: Doric布局系统
---
本文讲述在Doric中如何进行控件布局。

# 基础属性
本节内容列举在`View`中定义的基础的属性及其含义
## LayoutConfig
在`View`的属性中，关于布局的属性最关键的就是`layoutConfig`这个属性。
它的定义如下：
```typescript
export interface LayoutConfig {
        /// 宽度的描述
        widthSpec?: LayoutSpec;
        /// 高度的描述
        heightSpec?: LayoutSpec;
        /// 外边距
        margin?: {
                left?: number;
                right?: number;
                top?: number;
                bottom?: number;
        };
        /// 对齐方式
        alignment?: Gravity;
        /// 权重，仅在VLayout与HLayout中生效
        weight?: number;
}
```
大家可以注意到这个属性默认是`undefined`的。如果不设置，其内容相当于 `layoutConfig().just()`。
但是在一般使用声明式布局，如`text`,`vlayout`,`hlayout`等方式进行布局时，默认已经设置了layoutConfig为`layoutConfig().fit()`
## layoutConfig()
这是一个辅助方法，用于链式调用最终生成您想要的`LayoutConfig`属性。
```typescript
 layoutConfig: layoutConfig().just(),
```
当然您也可以不使用这个方法，直接声明`LayoutConfig`对象。
```typescript
 layoutConfig: {
     widthSpec:LayoutSpec.FIT,
     heightSpec:LayoutSpec.FIT,
 },
```
定义如下：
```typescript
// 宽与高都设置为FIT
fit(): this;
// 宽与高都设置为MOST
most(): this;
// 宽与高都设置为JUST
just(): this;
// 只设置宽的描述
configWidth(w: LayoutSpec): this;
// 只设置高的描述
configHeight(h: LayoutSpec): this;
// 设置外边距
configMargin(m: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
}): this;
// 设置与父视图的对齐方式
configAlignment(a: Gravity): this;
// 设置权重
configWeight(w: number): this;
```
### LayoutSpec
用于描述宽或高两个维度的确定方式。
* `LayoutSpec.JUST`
`JUST`表示值为固定值，即由View的`width`或`height`属性来定义宽或高的值。
* `LayoutSpec.FIT`
`FIT`表示其当前维度的值由其内容撑开。
在`Text`控件，由其文本内容决定
在`Image`控件，由其图像尺寸决定。
在`VLayout`，`HLayout`,`Stack`中，由其子视图内容大小决定。
* `LayoutSpec.MOST`
`MOST`表示其当前维度的值会最大限度撑开，直到其占满父容器的剩余空间。

`widthSpec`与`heightSpec`可分别设置，从而达到您想要的效果。

### Margin
定义控件相对对于其同级视图或父视图的边距。
```typescript
{
        left?: number | undefined;
        right?: number | undefined;
        top?: number | undefined;
        bottom?: number | undefined;
}
```
### Alignment
定义了控件相对于父视图的对齐方式。
**请注意**
**在`VLayout`中仅能定义水平方向的对齐方式，在`HLayout`中仅能定义垂直方向的对齐方式**

### Weight
布局权重，仅在`VLayout`和`HLayout`中生效。
其作用方式为，当所有子视图布局完成后，如果父视图还有剩余空间，则按子视图所定义的`weight`比例分配。不定义默认为`0`。

## Width & Height
直接设置一个控件的宽或者高。
```typescript
view.width = 100
view.height = 100
```
**请注意**
**`width`属性生效条件为`layoutConfig`属性为`undeifned`或其`widthSpec`值为`LayoutSpec.JUST`**
**`height`属性生效条件为`layoutConfig`属性为`undeifned`或其`heightSpec`值为`LayoutSpec.JUST`**

## Padding
内边距。即控件内子视图或其内容相对于控件的间距。
其格式定义为
```typescript
{
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
}
```

# Layout容器
在Doric中，定义了三种父视图来进行布局
# Stack
`Stack`是最基本的父视图，子视图按添加顺序覆盖其上。
此时子视图的`x`,`y`坐标发挥作用，坐标系原点正是父视图的左上角。
## 锚点坐标
对于`Stack`的子视图来说，仅仅通过`x`,`y`进行布局略显不便。
如果其子视图宽或高为`JUST`时，可以通过锚点进行快捷的坐标设置。
* `left`
* `right`
* `top`
* `bottom`
* `centerX`
* `centerY`

# VLayout
`VLayout`是垂直线性布局,子视图从上向下进行布局。
## Gravity
其`gravity`属性可控制子视图个体在水平方向上的对齐方式和整体在垂直方向上的对齐方式
子视图个体可通过设置其`Aligment`覆盖改变其水平方向上的对齐方式。
## Space
定义子视图之间的间距
# HLayout
`HLayout`是水平线性布局,子视图从左向右进行布局。
## Gravity
其`gravity`属性可控制子视图个体在垂直方向上的对齐方式和整体在水平方向上的对齐方式
子视图个体可通过设置其`Aligment`覆盖改变其垂直方向上的对齐方式。
## Space
定义子视图之间的间距
