---
title: 文档
---
欢迎使用Doric，本文档将帮助您快速上手。如果您在使用过程中遇到任何问题，请在[GitHub](https://github.com/doric-pub/Doric/issues)上提问。

## 什么是 Doric?

Doric 是一个极简高效的跨端开发框架，使用[TypeScript](https://www.typescriptlang.org/index.html)编写布局，编译成js代码后可以在多种平台上直接运行，实现一份代码多目标执行。
目前已经支持Android、iOS、Web及Qt，后续还可按需接入更多场景平台。

## 安装

若您在安装过程中遇到无法解决的问题，请[提交问题](https://github.com/doric-pub/Doric/issues)，我们会及时跟进解决。

## 安装前提

安装 Doric 前，需要准备好下列开发环境:

- [Node.js](http://nodejs.org/) (Node.js 版本需不低于 8.0，建议使用 Node.js 10.0 及以上版本)
- [npm](https://www.npmjs.com/) (一般已随Node.js安装包安装好)

Doric使用TypeScript作为开发语言，推荐使用编辑器

- [Visual Studio Code](https://code.visualstudio.com/)

如果需要进行Android应用的运行或插件开发，请准备好：
- [Android SDK](https://developer.android.com/index.html)

如果需要进行iOS应用的运行或插件开发，请准备好：
- [iOS SDK](https://developer.apple.com/xcode/)
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

## 安装Doric

当必需的开发环境准备就绪后，即可使用npm安装Doric.

``` bash
$ npm install -g doric-cli
```

安装以后，即可创建Doric项目：
```bash
npx doric create HelloDoric
cd HelloDoric/js && doric dev
```
