---
title: Switch-开关控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
state|boolean|开关状态
onTintColor|Color|打开状态时轨迹颜色
offTintColor|Color|关闭状态时轨迹颜色
thumbTintColor|Color|开关按钮颜色
onSwitch|(state: boolean) => void|开关状态改变回调

### 用法示例
#### 基础用法
```typescript
            switchView({
                state: true,
                offTintColor: Color.RED,
                onTintColor: Color.GREEN,
                thumbTintColor: Color.WHITE,
                onSwitch: (state) => {
                    log(`Switch 当前状态:${state ? "ON" : "OFF"}`)
                },
            }),
```

#### tsx写法
```tsx
        <Switch
            state={true}
            offTintColor={Color.RED}
            onTintColor={Color.GREEN}
            thumbTintColor={Color.WHITE}
            onSwitch={(state) => {
                log(`Switch 当前状态:${state ? "ON" : "OFF"}`)
            }}
        />
```
