---
title: Doric Runtime
---
This article aims to explain the operation principle and mechanism of Doric. Native refers to terminal platforms such as Android and iOS


## 整体流程
如前文所说，Doric主要是用TypeScript语言开发，通过tsc及rollup编译打包后生成JS Bundle文件。目标终端SDK装载JS Bundle文件并运行，在JS中调用原生渲染引擎解析为原生的视图控件。

## 编译及打包
在写完一个Doric文件后，需通过`doric build`生成bundle文件。其内部先通过`tsc`将ts源码转成js源码，然后通过rollup打包成一个bundle文件。
注意：在打包过程中`doric`包不会打进bundle文件，因为这个JS库已经打进各平台SDK中。

## Native SDK 初始化
JS bundle需要通过Native SDK装载才能实际运行在Native中。Native SDK在装载JS bundle前，需要创建JS引擎，并初始化。
因为创建JS引擎有时间及内存的开销，所以我们实现了JS bundle的沙箱环境，使多bundle运行在同一个JS引擎。这样在整个APP中只需要一个JS引擎就可以了。
JS引擎会先准备好JS的运行时环境，并向JS中注入Native 方法及环境变量供JS侧调用。

## Native Context
Native会为每个JS Bundle分配原生的上下文实例(`DoricContext`)，在运行JS Bundle的时候，会在JS侧生成与Native对应的上下文实例。
在接下来的运行中，Native中的DoricContext实例会与JS中的context实例一一绑定。
Native Context实例负责向JS发起生命周期等方法调用，接收从JS向原生的调用。

## Native 运行时
Native会为每个JS Bundle分配原生的上下文实例(`DoricContext`)，在接下来的运行中，Native中的DoricContext实例会与JS中的context一一绑定。
Native的DoricContext实例负责向JS发起生命周期等方法调用，接收从JS向原生的调用。

## 视图渲染
在每次JS中视图有更新时，JS中会向Native发起渲染调用，传入待渲染的视图数据。Native会调用渲染引擎根据JS提供的视图数据进行视图渲染或刷新视图。