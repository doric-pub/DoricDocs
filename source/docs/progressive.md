---
title: Doric渐进式开发
---

Doric 可以用于从零开发跨端应用，也可以逐步接入已有 Android/iOS/Web 应用中的某个页面或某个局部区域。选择哪种接入方式，取决于您希望 Doric 承担的页面范围。

## Doric App

如果要使用 Doric 开发一个完整应用，可以通过 CLI 创建工程：

```bash
doric create MyApp
```

脚手架会同时生成 TypeScript 工程、Android 工程和 iOS 工程。业务页面以多个 `Panel` 组织，通过 `navigator` 等能力完成页面跳转。

适用场景：

- 新应用从 Doric 起步。
- 业务页面希望最大化复用 TypeScript 代码。
- Android 与 iOS 需要保持高度一致的 UI 和交互。

## Doric 页面

如果已有原生应用，只希望用 Doric 承接部分页面，可以使用页面级容器。

Android 使用 `DoricActivity`：

```java
Intent intent = new Intent(context, DoricActivity.class);
intent.putExtra("source", "assets://src/Home.js");
intent.putExtra("alias", "Home");
intent.putExtra("extra", "{\"from\":\"android\"}");
context.startActivity(intent);
```

iOS 使用 `DoricViewController`：

```objectivec
DoricViewController *vc = [[DoricViewController alloc]
    initWithSource:@"assets://src/Home.js"
    alias:@"Home"
    extra:@"{\"from\":\"ios\"}"];
[self.navigationController pushViewController:vc animated:YES];
```

适用场景：

- 某些业务页面需要跨端复用。
- 原生应用已有完整导航体系。
- 希望按页面逐步迁移。

## Doric 局部视图

如果只希望在原生页面的一块区域中使用 Doric，可以嵌入 `DoricPanel`。

Android：

```java
DoricPanel panel = new DoricPanel(context);
panel.config(scriptContent, "Card", "{\"from\":\"android\"}");
container.addView(panel);
```

iOS：

```objectivec
DoricPanel *panel = [DoricPanel new];
[panel config:script alias:@"Card" extra:@"{\"from\":\"ios\"}"];
[self addChildViewController:panel];
[self.view addSubview:panel.view];
```

适用场景：

- 复杂原生页面中的运营位、卡片、弹层或动态区域。
- 需要快速更新局部 UI。
- 不希望改动原生页面整体结构。

## Web 页面

Web 端可以使用 `<doric-div>` 渲染 Doric Bundle：

```html
<doric-div
    src="/bundle/src/Home.js"
    alias="Home"
    data='{"from":"web"}'>
</doric-div>
```

适用场景：

- 同一套 Doric 页面需要在 Web 中预览或运行。
- 需要将 Doric 页面嵌入已有 Web 站点。
- 需要配合 Web Runtime 做快速验证。

## 接入建议

| 目标 | 推荐方式 |
| --- | --- |
| 新建跨端应用 | `doric create` 创建完整工程 |
| 原生应用新增跨端页面 | Android `DoricActivity` / iOS `DoricViewController` |
| 原生页面中嵌入局部动态 UI | `DoricPanel` |
| Web 中加载 Doric 页面 | `<doric-div>` |
| 扩展原生能力 | 自定义 Native Plugin |
| 扩展原生视图 | 自定义 ViewNode |

更多平台接入细节请查看：

- [Android 应用中使用 Doric](./android.html)
- [iOS 应用中使用 Doric](./ios.html)
- [Web 中使用 Doric](./web.html)

