---
title: 命令行工具
---
Doric提供了一个命令行工具`doric-cli`,该工具可以帮助创建脚手架工程、热重载代码、断点调试等功能

## 安装
通过npm安装工具
``` bash
$ npm install -g doric-cli
```
## 使用
安装完成后,即可通过脚手架工具运行以下命令.

### 创建脚手架工程
```bash
$ doric create HelloDoric
```
该命令会创建一个Doric工程目录，项目名为`HelloDoric`。
### 运行
您可以通过以下命令编译Android或iOS应用,并直接运行.
Android 请运行以下命令:
```bash
doric run android
```
iOS 请运行以下命令:
```bash
doric run ios
```
请注意,使用真机连接时Android需打开ADB并允许调试,iOS请输入密码.
### 常用命令
命令行工具在开发到发布打包等流程提供支持
#### 开发(dev)
您可以通过输入以下命令进入开发模式:
```bash
$ doric dev
```
此时,命令行工具将在终端打印一个二维码,如果二维码被覆盖,您可以通过输入`Ctr`+`R`使其再次打印.
您可以安装[Doric Playground](https://www.pgyer.com/0Pfu)后通过扫描二维码连接项目,热重载代码查看效果.
详细的开发调试工具使用,请参照文档[开发调试工具](./devkit.html)
#### 编译(build)
当开发完成后,您可以通过以下命令编译输出bundle文件.
```bash
$ doric build
```
进行代码打包，此时输出 JS bundle 文件至 `bundle` 目录下。
### 清理
清理编译缓存文件。此时会删除`build`和`bundle`文件夹中内容
```bash
$ doric clean
```
## Doric工程结构
通过命令行创建的目录结构如下：
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
