---
title: AeroEffect - 透明模糊控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
effectiveRect|{ x: number, y: number, width: number, height: number }|产生效果的区域范围，默认全区域
style|`"light" \| "dark" \| "extraLight"`|模糊样式，默认值"light"

### 用法示例
#### 基础用法
```typescript
        aeroEffect(
            image({
                width: 300,
                height: 300,
                layoutConfig: layoutConfig().just(),
                image: new AssetsResource("The_Parthenon_in_Athens.jpeg"),
            }),
            {
                style: "extraLight",
                effectiveRect: {
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 300
                }
            }
        ),
```

#### tsx写法
```tsx
        <AeroEffect
            style={"extraLight"}
            effectiveRect={{
                x: 0,
                y: 0,
                width: 300,
                height: 300
            }}
        >
            <Image
                width={300}
                height={300}
                layoutConfig={layoutConfig().just()}
                image={new AssetsResource("The_Parthenon_in_Athens.jpeg")}
            />
        </AeroEffect>
```
