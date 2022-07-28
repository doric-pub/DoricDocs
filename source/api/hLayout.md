---
title: HLayout - 水平线性布局容器控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|垂直方向上子控件的对齐方式

### 用法示例
#### 基础用法
```typescript
                    hlayout([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IHLayout),
```