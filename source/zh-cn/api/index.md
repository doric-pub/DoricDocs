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
corners |`number \| { leftTop?: number; rightTop?: number; leftBottom?: number; rightBottom?: number } `| 圆角半径，可分别定义上下左右四个圆角半径
border|`{ width: number; color: Color; }`|边框，可设置宽度及颜色
shadow|`{ color: Color; opacity: number; radius: number; offsetX: number; offsetY: number}`|阴影，可设置阴影颜色，透明度，阴影半径及偏移位置

## Text

## Input

## Image

## VLayout

## HLayout

## Stack

## List

## Scroller

## Slider

## Panel

## Entry
