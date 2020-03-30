---
title: Doric渐进式开发
---
> Doric满足渐进式框架特点，您可以用Doric从头开始开发一个新的APP，也可以用它完成APP中某些页面，或者只是完成一个页面中部分区域内容。
> Doric提供了不同层级的容器，可按需使用。

# Doric APP
您可以通过`doric create`命令创建Doric项目，项目中自动生成Android和iOS项目工程。您可以基于自动生成的项目工程，通过多个`Panel`构建Doric APP。

# Doric 页面
Doric在Android或iOS都提供了页面级容器供装载Doric程序。
Android中的[DoricActivity](../api/android.html#DoricActivity)或iOS中的[DoricViewController](../api/ios.html#DoricViewController)都提供页面级容器供Doric装载运行。

# Doric Panel
在原生页面中可以灵活嵌入使用Doric开发，此时Doric可作为普通的View视图无缝嵌入原生页面。
可直接使用Android中的[DoricPanel](../api/android.html#DoricPanel)或iOS中的[DoricPanel](../api/ios.html#DoricPanel)进行装载。
