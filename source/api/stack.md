---
title: Stack - 层叠布局容器控件
---

子控件都是相对于其左上角顶点摆放

### 用法示例
#### 基础用法
```typescript
                    stack([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IHLayout),
```