---
title: BlurEffect - 高斯模糊控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
effectiveRect|{ x: number, y: number, width: number, height: number }|产生效果的区域范围，默认全区域
radius|number|高斯模糊值，默认值15

### 用法示例
#### 基础用法
```typescript
        blurEffect(
            image({
                width: 300,
                height: 300,
                layoutConfig: layoutConfig().just(),
                image: new AssetsResource("The_Parthenon_in_Athens.jpeg"),
            }),
            {
                radius: 20,
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
        <BlurEffect
            radius={20}
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
        </BlurEffect>
```
