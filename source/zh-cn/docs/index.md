---
title: 文档
---
欢迎使用Doric，本文档将帮助您快速上手。如果您在使用过程中遇到任何问题，请在[GitHub](https://github.com/doric-pub/Doric/issues)上提问。

## 什么是 Doric?

![Doric](http://www.kedo.gov.cn/upload/resources/image/2017/07/24/160817.png)

**Doric** 是一个极简高效的跨端开发框架，使用[**TypeScript**](https://www.typescriptlang.org/index.html)作为开发语言。
上层遵循[**MVVM**](./mvvm.html)设计，可以在多终端平台上执行，实现一份代码多处执行。
目前已经支持**Android**、**iOS**、**Web**及**Qt**，后续可按需接入更多场景平台。

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

1. 安装`doric`命令行工具
``` bash
$ npm install -g doric-cli
```

1. 使用`doric`命令创建项目
安装以后，即可创建Doric项目：
```bash
doric create HelloDoric
```
此时，`doric`命令会在当前路径创建一个`HelloDoric`的文件夹。目录结构如下：
```bash
index.ts
package.json
tsconfig.json
rollup.config.js
src/
android/
iOS/
build/
bundle/
```

1. 运行`doric dev`命令，输出本地IP二维码
您可直接运行Doric命令开启热重载
```bash
$ cd HelloDoric
$ doric dev
```
此时，屏幕上会出现您网络IP及对应的二维码。

1. 您可按如下步骤，安装壳工程APP到手机后，通过扫码进入调试模式。

    * Android
您可直接使用Android Studio打开`android`目录，运行项目。
    * iOS
        * 首先安装Podfile
```bash
$ cd iOS && pod install
```
        * 使用XCode打开`iOS`下项目,并运行

1. 开发调试
    * 按上面Android或iOS项目APP安装到手机后，手机上会出现首页如下：
    ![android](../image/hello_android.png)  ![iOS](../image/hello_iOS.png)
    * 手机点击标题栏`Devkit`按钮，进入相机扫描页面，对准上述第一步出现的二维码扫描，连接成功后出现如下页面。如果您使用iOS或Android模拟器，则无需相机扫描，直接连接到本机地址。
    ![android](../image/debug_android.png)  ![iOS](../image/debug_iOS.png)
    点击返回回到首页。
    * 修改`src/HelloDoric.ts`文件，您可以在手机上实时看到修改后的效果。
    ![debugging](../image/debugging.gif)
    * 您也可以随时重新运行APP项目，重新安装将最新修改内容同步到手机。