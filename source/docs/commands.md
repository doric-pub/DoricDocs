---
title: 命令
---

## create

```bash
$ doric create [ProjectName]
```

新建一个 Doric 项目，项目名为`ProjectName`。

## dev

```bash
$ doric dev
```

开始开发 Doric 页面，此时终端会输出二维码。可通过``[Android](https://www.pgyer.com/YvN1
)[iOS](https://testflight.apple.com/join/ADOzNQKd)扫码查看页面效果

## build

```bash
$ doric build
```

进行代码打包，此时输出 JS bundle 文件至 `bundle` 目录下。

## run
在Android或iOS中运行Doric
### Android
```bash
$ doric run android
```
### iOS
```bash
$ doric run ios
```
编译Android&iOS项目,并安装APP到手机或模拟器中(请先连接好手机)

## clean

```bash
$ doric clean
```

清理编译缓存文件。此时会删除`.dxx`(旧版本为`build`)和`bundle`文件夹中内容