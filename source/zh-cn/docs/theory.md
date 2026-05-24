---
title: Doric 运行机制
---

本文说明 Doric 从 TypeScript 源码到 Native/Web 渲染的整体链路。文中 Native 泛指 Android、iOS、Qt 等宿主平台。

## 整体流程

Doric 页面由 TypeScript 或 TSX 编写，经 `tsc` 与 `rollup` 编译打包为 JS Bundle。宿主端 SDK 加载 JS Bundle 后，在 JS 引擎中创建 Doric 上下文，执行 Panel 生命周期，并通过 `shader` 等 Native Plugin 将视图模型渲染为原生控件。

```text
TypeScript/TSX
   │
   ├─ tsc
   │
   ├─ rollup
   │
   ▼
JS Bundle
   │
   ├─ DoricContext
   ├─ Panel lifecycle
   ├─ View dirty props
   │
   ▼
Native/Web Runtime
   │
   ├─ ShaderPlugin
   ├─ ViewNode
   └─ Native View / DOM Node
```

## 编译与打包

执行：

```bash
doric build
```

CLI 会先通过 `tsc -p .` 编译 TypeScript，再通过 `rollup -c` 打包入口文件，最后合并 SourceMap 并复制 `assets/` 到 `bundle/assets/`。

打包过程中，`doric` 框架库本身不会被完整打进业务 bundle，因为各端 Runtime 已内置 Doric 的基础运行环境。

## JS 引擎与沙箱

Native SDK 在加载 JS Bundle 前会准备 JS 引擎和 Doric 运行时环境。为了降低多页面场景下的引擎创建成本，Doric 使用沙箱机制，使多个 JS Bundle 可以运行在同一个 JS 引擎中。

Runtime 会向 JS 环境注入：

- Native 调用桥。
- 环境变量。
- 模块加载能力。
- 定时器等基础能力。

## DoricContext

每个 JS Bundle 会对应一个原生侧 `DoricContext`，JS 侧也会有对应的 `context`。二者负责绑定当前页面运行状态。

`DoricContext` 的职责包括：

- 保存当前页面 ID、source、alias、extra 等信息。
- 触发 `Panel` 生命周期。
- 接收 JS 侧对 Native Plugin 的调用。
- 管理根视图节点与 HeadView。
- 页面销毁时释放资源。

## Panel 生命周期

宿主端创建上下文后，会按时机调用 JS Panel 的生命周期：

| 生命周期 | 说明 |
| --- | --- |
| `onCreate()` | Panel 创建后 |
| `build(rootView)` | 根据宿主视图尺寸构建视图树 |
| `onShow()` | 页面展示或宿主恢复 |
| `onHidden()` | 页面隐藏或宿主暂停 |
| `onDestroy()` | 页面销毁 |
| `onEnvChanged()` | 环境变化后重新构建 |

## 视图渲染

Doric 的 `View` 属性由 `@Property` 标记。当 JS 侧修改这些属性时，属性变化会被记录到 dirty props 中。

```typescript
title.text = "New Title";
button.hidden = true;
container.backgroundColor = Color.WHITE;
```

在 Native 调用结束后的 hook 阶段，`Panel` 会收集根视图和 HeadView 的 dirty 数据，生成视图模型，并调用：

```typescript
this.context.callNative("shader", "render", model)
```

Native Runtime 接收到模型后，由 `ShaderPlugin` 分发给对应 `ViewNode`，最终创建或更新原生控件。

## 事件回调

当 JS 将函数属性设置到 View 上时，Doric 会把函数保存为 callback id，并将 id 同步到 Native。

```typescript
text({
    text: "Click",
    onClick: () => {
        log("clicked");
    },
});
```

Native 触发事件后，会带着 viewId 链路与 callback id 回调 JS。JS 侧通过 `Panel.__response__` 找到对应 View，再执行原先保存的函数。

## Native Plugin 调用

JS 侧通过 `context.callNative(pluginName, methodName, args)` 调用原生能力：

```typescript
this.context.callNative("examplePlugin", "nativeAdd", {
    first: 1,
    second: 2,
});
```

Android、iOS、Web 分别注册同名 Plugin 后即可响应调用。返回值通常以 `Promise` 形式回到 JS。

## 调试与热重载

执行：

```bash
doric dev
```

CLI 会启动 TypeScript/Rollup watch 和 WebSocket dev server。Bundle 变化后，server 向客户端发送 `RELOAD` 消息；客户端收到后重新加载当前页面 JS。

Devkit 还会把客户端日志、异常和调试请求转发到终端，便于配合 Chrome Inspector 或 VS Code 调试。

