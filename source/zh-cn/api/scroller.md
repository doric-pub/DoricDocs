---
title: Scroller - 滑动控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
content|View|可滑动的内容视图
contentOffset|{ x: number, y: number }|内容视图偏移量
onScroll|(offset: { x: number, y: number }) => void|滑动过程中的回调
onScrollEnd|(offset: { x: number, y: number }) => void|滑动停止的回调
scrollable|boolean|是否可以滑动
bounces|boolean|边界回弹效果（iOS专属）

### 用法示例
#### 基础用法
```typescript
            scroller(
                vlayout(new Array(100).fill(1).map(e => label('Scroll Content')))
            ).apply({
                layoutConfig: layoutConfig().just(),
                width: 300,
                height: 500,
                backgroundColor: Color.RED,
            }),
```
#### tsx写法
```tsx
      <Scroller
          width={300}
          height={500}
          layoutConfig={layoutConfig().just()}
          parent={root}
      >
          <VLayout
              layoutConfig={layoutConfig().most().fitHeight()}
          >
              { new Array(100).fill(1).map(e => label('Scroll Content')) }
          </VLayout>
      </Scroller>
```
