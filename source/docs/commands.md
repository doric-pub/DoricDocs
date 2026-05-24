---
title: 命令行工具
---

`doric-cli` 的二进制命令名是 `doric`，主要用于创建项目、开发调试、构建 bundle、运行 Android/iOS 示例工程，以及创建扩展库。

## 安装

```bash
$ npm install -g doric-cli
```

如果正在主仓库中开发 CLI，可先构建本地 CLI：

```bash
$ cd doric-cli
$ npm install
$ npm run build
```

## create

```bash
$ doric create [ProjectName]
```

新建一个 Doric 应用项目，项目名为 `ProjectName`。

等价命令：

```bash
$ doric new [ProjectName]
```

项目结构通常如下：

```text
ProjectName/
├── assets/
├── src/ProjectName.ts
├── index.ts
├── package.json
├── tsconfig.json
├── rollup.config.js
├── android/
└── iOS/
```

创建完成后，CLI 会在项目目录中执行 `npm install`。

## createLib

```bash
$ doric createLib [LibraryName]
```

创建 Doric 扩展库模板。模板包含：

- JS library 入口。
- Android library。
- iOS Pod。
- `example/` 示例工程。

该命令适合开发自定义 ViewNode 或 Native Plugin。

## dev

```bash
$ doric dev
```

开始开发 Doric 页面。CLI 会启动：

- WebSocket 调试/热重载服务，默认端口 `7777`。
- 资源服务，默认端口 `7778`。
- `tsc -w -p .`。
- `rollup -c -w`。

当 `bundle/` 下 JS 文件变化后，dev server 会向已连接客户端发送 `RELOAD` 消息。终端会输出本机 IP 和二维码，可通过 `Doric Playground APP` [Android](https://www.pgyer.com/YvN1) [iOS](https://testflight.apple.com/join/ADOzNQKd) 扫码查看页面效果。

开发过程中可按：

- `Ctrl + R`：重新输出本机 IP 和二维码。
- `Ctrl + C`：停止 watch 进程并退出。

### dev --proxy

```bash
$ doric dev --proxy
```

启动开发服务后链接代理服务，适合需要通过 proxy 转发调试连接的场景。

## build

```bash
$ doric build
```

进行代码打包，输出 JS bundle 文件至 `bundle` 目录。

执行流程：

1. 执行 `node_modules/.bin/tsc -p .`。
2. 执行 `node_modules/.bin/rollup -c`。
3. 遍历 `bundle/**/*.js` 并合并 SourceMap。
4. 如果存在 `assets/`，复制到 `bundle/assets/`。

常见输出：

```text
bundle/
├── src/*.js
├── src/*.js.map
└── assets/
```

## run

在 Android 或 iOS 中运行 Doric 应用。运行前请确认当前目录是 `doric create` 创建的应用根目录。

### Android

```bash
$ doric run android
```

要求：

- 当前目录存在 `android/`。
- 已设置 `ANDROID_HOME` 或 `ANDROID_SDK_ROOT`。
- 已连接 Android 设备或启动模拟器。

执行流程：

1. 在 `android/` 下执行 `sh gradlew assembleDebug`。
2. 查找 `**/outputs/apk/debug/*.apk`。
3. 使用 `adb install -t -r` 安装。
4. 使用 `apkanalyzer manifest print` 查找主 Activity。
5. 使用 `adb shell am start` 启动应用。

### iOS

```bash
$ doric run ios
```

也可以使用：

```bash
$ doric run iOS
```

要求：

- 当前目录存在 `iOS/`。
- 已安装 Xcode 与 CocoaPods。
- 真机运行需要 `ios-deploy`。

执行流程：

1. 使用 `xcrun xctrace list devices` 列出设备和模拟器。
2. 通过命令行交互选择目标设备。
3. 在 `iOS/` 下执行 `pod install`。
4. 使用 `xcodebuild` 构建。
5. 模拟器使用 `xcrun simctl install/launch`。
6. 真机使用 `ios-deploy` 安装并启动。

## clean

```bash
$ doric clean
```

清理编译缓存文件。当前实现会删除：

```text
build/
bundle/
```

## ssr build

```bash
$ doric ssr build
```

先执行普通 `doric build`，然后设置 `SSR_BUILD=1` 并逐个执行 `bundle/**/*.js`，用于生成 SSR 数据。

## proxy

```bash
$ doric proxy
```

启动代理控制服务，默认端口 `7780`。连接后会为每个用户分配从 `3000` 开始的可用 transfer 端口。
