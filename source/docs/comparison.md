---
title: Doric vs. Mainstream Cross-platform Frameworks
---

This document compares Doric with React Native, Flutter, Ionic/Capacitor, and Tauri/Electron from a frontend architecture and technology selection perspective. The goal is not to claim that one framework replaces another, but to clarify where Doric fits best.

## Generation Notice

This document was assisted by Codex, a programming assistant based on GPT-5. It is based on:

- The current Doric source tree and DoricDocs documentation, including `doric-js`, `doric-cli`, `doric-web`, `doric-android`, `doric-iOS`, and `doric-demo`.
- Official documentation from React Native, Flutter, Capacitor, Tauri, and Electron.
- Common frontend architecture evaluation dimensions, including rendering model, dynamic delivery, native integration, ecosystem maturity, team cost, and suitable scenarios.

This is an architectural analysis and selection guide. It is not an official roadmap, benchmark report, or statement on behalf of any external framework.

## Short Summary

Doric is best understood as a lightweight TypeScript cross-platform page runtime. Pages are written in TS/TSX, compiled into JavaScript bundles, and rendered by host runtimes into native views or Web nodes. It is well suited for dynamic pages, embedded business panels, cards, and gradual adoption inside existing apps.

React Native is a React-based native app framework. It maps React components to platform native components and has a mature ecosystem.

Flutter is a complete UI toolkit with its own rendering engine. It uses Dart and paints UI through Flutter Engine, which provides strong cross-platform consistency.

Ionic/Capacitor packages Web applications into native containers. UI is rendered by WebView, while native capabilities are accessed through plugins.

Tauri and Electron are mainly desktop app containers. They are not direct competitors to Doric in mobile page-runtime scenarios.

## Comparison Matrix

| Dimension | Doric | React Native | Flutter | Ionic/Capacitor | Tauri/Electron |
| --- | --- | --- | --- | --- | --- |
| Main language | TypeScript/TSX | JavaScript/TypeScript + React | Dart | HTML/CSS/JS | HTML/CSS/JS + Rust/Node |
| Rendering | View model mapped to native/Web nodes | React components mapped to native components | Flutter Engine rendering | WebView | WebView/Chromium |
| Native feel | High | High | Medium-high, but not system-native widgets | Medium-low | Desktop Web style |
| UI consistency | Medium-high | Medium-high | High | High | High |
| Dynamic delivery | Strong | Possible, but policy-sensitive | Weaker due to AOT and review constraints | Strong | Depends on desktop update model |
| Progressive adoption | Strong | Medium | Medium-low | Medium | Container-level |
| Ecosystem | Small | Large | Large | Large Web ecosystem | Mature desktop ecosystem |

## Doric Characteristics

Doric pages are written as `Panel` classes:

```typescript
import { Panel, Group, text } from "doric";

@Entry
class Home extends Panel {
    build(root: Group) {
        text({ text: "Hello Doric" }).in(root);
    }
}
```

Important Doric concepts:

- `Panel` is the page controller.
- `View` property changes are collected as dirty props.
- Layout is built with `layoutConfig`, `stack`, `vlayout`, `hlayout`, and `flexlayout`.
- Native capabilities are called through `context.callNative(plugin, method, args)`.
- Android, iOS, and Web integration can happen at page level or embedded view level.
- Extensions are registered through `DoricLibrary`, Native Plugin, and ViewNode.

## Doric vs. React Native

React Native uses React as its programming model. UI updates are driven by React reconciliation and synchronized to native components. Its advantages include a large ecosystem, many community components, strong tooling, and a broad talent pool.

Doric is smaller and more direct. It does not include React hooks, React state management, or React reconciler. State changes are usually expressed by directly changing Doric view properties.

Choose React Native when:

- The team already uses React heavily.
- You are building a full mobile application.
- You need mature community packages and long-term ecosystem support.
- Complex state management and large frontend architecture are required.

Choose Doric when:

- You already have native Android/iOS apps.
- You only need to reuse selected pages or embedded areas.
- Dynamic JavaScript bundle delivery is important.
- The host app should keep strong control over native containers and plugins.

## Doric vs. Flutter

Flutter uses Dart and renders UI with Flutter Engine. Because it owns the rendering pipeline, it provides strong visual consistency and excellent custom drawing and animation capabilities.

Doric maps view models to platform runtimes. This gives Doric better native-host integration and lighter page-level embedding, but less uniform rendering than Flutter.

Choose Flutter when:

- You need highly consistent UI and animation across platforms.
- The team accepts Dart and Flutter's engineering model.
- The application needs complex custom drawing or a unified design system.

Choose Doric when:

- You need gradual adoption inside an existing app.
- You want to keep native navigation and native page containers.
- Page complexity is moderate and does not require extensive custom rendering.

## Doric vs. Ionic/Capacitor

Ionic/Capacitor is closest to Web application packaging. UI is rendered by WebView and native capabilities are accessed through Capacitor plugins. This is very friendly to Web teams and existing Web projects.

Doric does not directly reuse DOM or CSS. It uses TypeScript to describe Doric views and lets each runtime render native or platform-specific nodes.

Choose Ionic/Capacitor when:

- You already have a Web app.
- You want to reuse HTML/CSS/browser ecosystem directly.
- Native look and feel is not the highest priority.

Choose Doric when:

- You do not want the main UI to run inside WebView.
- Native rendering and host integration are important.
- Native teams can provide plugins and ViewNode implementations.

## Doric vs. Tauri/Electron

Tauri and Electron are mainly desktop application containers. Electron uses Chromium and Node.js, while Tauri uses system WebView plus Rust. They are suitable for desktop tools and enterprise desktop clients.

Doric focuses on cross-platform page rendering inside Android, iOS, Web, and Qt runtimes. It is closer to a page runtime than a desktop application shell.

## Doric Strengths

- Low-cost progressive adoption.
- Lightweight runtime boundary.
- TypeScript-friendly development.
- Good native host integration.
- Natural JavaScript bundle dynamic delivery.

## Doric Limitations

- Smaller ecosystem than React Native and Flutter.
- Existing Web pages cannot be reused directly as DOM/CSS.
- Cross-platform consistency depends on each runtime implementation.
- Large-scale app architecture requires team-defined conventions.
- Complex custom rendering may be better served by Flutter or native code.

## Scenario Recommendations

| Scenario | Recommended choice |
| --- | --- |
| Dynamic business pages in an existing app | Doric |
| Embedded cross-platform cards or panels | Doric |
| Full app with React team and ecosystem needs | React Native |
| Highly consistent custom UI and animations | Flutter |
| Existing Web app packaged for mobile | Ionic/Capacitor |
| Desktop tool or enterprise desktop app | Tauri/Electron |

## References

- [React Native - Core Components and Native Components](https://reactnative.dev/docs/0.79/intro-react-native-components)
- [React Native - Architecture Overview](https://reactnative.dev/architecture/overview)
- [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)
- [Capacitor documentation](https://capacitorjs.com/docs/next)
- [Tauri Architecture](https://v2.tauri.app/concept/architecture/)
- [Electron Introduction](https://www.electronjs.org/docs/latest)

