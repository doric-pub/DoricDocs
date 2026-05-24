---
title: Web 中使用 Doric
---

本文介绍如何在 Web 页面中使用 Doric Runtime 加载并渲染 Doric JS Bundle。

## 构建 Web Runtime

Web Runtime 位于主仓库 `doric-web` 目录。开发或验证时可执行：

```bash
$ cd doric-web
$ npm install
$ npm run build
```

构建产物默认输出到：

```text
doric-web/dist/index.js
```

该文件会注册两个自定义元素：

| 元素 | 说明 |
| --- | --- |
| `<doric-div>` | 加载并渲染单个 Doric Bundle |
| `<doric-navigation>` | 提供导航容器能力 |

## 渲染 Doric Bundle

在 HTML 中引入 Web Runtime，并使用 `<doric-div>` 指定 bundle 地址：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Doric Web</title>
</head>
<body>
    <doric-div
        src="../doric-demo/bundle/src/NavigatorDemo.js"
        alias="NavigatorDemo"
        data='{"from":"web"}'>
    </doric-div>

    <script src="./dist/index.js"></script>
</body>
</html>
```

`<doric-div>` 常用属性：

| 属性 | 说明 |
| --- | --- |
| `src` | JS Bundle 地址 |
| `alias` | 页面别名，主要用于错误提示 |
| `data` | 初始化数据，JS 侧可通过 `getInitData()` 获取 |

当元素被插入页面后，Runtime 会加载 `src` 对应的 JS 内容，创建 `DoricContext`，执行 `init`、`onCreate`、`build` 和 `onShow`。

## 使用 Navigation 容器

如果页面需要导航能力，可以使用 `<doric-navigation>` 包裹 `<doric-div>`：

```html
<doric-navigation id="app">
    <doric-div
        src="../doric-demo/bundle/src/NavigatorDemo.js"
        alias="NavigatorDemo">
    </doric-div>
</doric-navigation>

<script src="./dist/index.js"></script>
```

`<doric-navigation>` 会配合 Doric 的 `navigator` API 管理页面栈。

## 自定义 Bundle Loader

默认 loader 会通过 HTTP 请求加载 `src`。如果业务需要支持自定义协议，可以注册 `DoricJSLoader`：

```typescript
import { registerDoricJSLoader } from "doric-web";

registerDoricJSLoader({
    filter: (source) => source.startsWith("assets://"),
    request: async (source) => {
        const url = source.replace("assets://", "/bundle/");
        const response = await fetch(url);
        return response.text();
    },
});
```

多个 loader 同时匹配时，后注册的 loader 优先。

## 销毁页面

如果需要手动销毁 Doric 页面：

```typescript
const element = document.querySelector("doric-div") as any;
element.onDestroy();
```

销毁时会调用 `context.onDestroy()` 和 `context.teardown()`。

## 常见问题

### 页面空白

优先检查：

- `src` 地址是否能被浏览器直接访问。
- Bundle 是否已经通过 `doric build` 生成。
- 页面容器是否有明确宽高。
- 浏览器控制台是否存在加载失败或跨域错误。

### 初始化数据读取不到

确认 `data` 属性是合法 JSON 字符串，并在 JS 侧通过 `this.getInitData()` 获取。

### 自定义协议加载失败

确认已经在 `<doric-div>` 开始加载前调用 `registerDoricJSLoader`，且 `filter(source)` 能正确匹配 `src`。

