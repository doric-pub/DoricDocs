---
title: VLayout - 垂直线性布局组件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|水平方向上子控件的对齐方式

### 用法示例
#### 基础用法
```typescript
                    vlayout([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IVLayout),
```