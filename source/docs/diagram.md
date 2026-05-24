---
title: Doric架构
---
## 整体架构
### 架构图
Doric整体架构如图所示:
<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:525px; height:800px;" src="https://www.processon.com/embed/61371140e0b34d35500a9dc4"></iframe>

### 详解
1. Doric页面由TypeScript/TSX开发完成,经过`tsc`与`rollup`编译,生成js bundle文件.
1. 平台下的定制化JS引擎(JavaScriptCore或V8)加载解析执行JS Bundle.
1. JS中的视图通过JS引擎注入函数传入`Native Render`解析为原生视图组件,也可直接传入`Native Plugin`直接调用其他原生功能模块.
