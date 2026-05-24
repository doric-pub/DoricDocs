---
title: FlowLayout - 流式网格布局控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
itemCount|number|内容总条数
renderItem|(index: number) => FlowLayoutItem|每条内容的渲染回调
columnCount|number|每行列数
columnSpace|number|列间距
rowSpace|number|行间距
loadMore|boolean|设置是否显示加载更多
loadMoreView|FlowLayoutItem|显示在底部表示加载更多的视图
onLoadMore|() => void|加载更多的回调
onScroll|(offset: { x: number, y: number }) => void|滑动过程中的回调
onScrollEnd|(offset: { x: number, y: number }) => void|滑动停止的回调
scrollable|boolean|列表是否可以滑动
bounces|boolean|边界回弹效果（iOS专属）

### 写法示例
#### 基础用法
```typescript
        flowlayout({
            layoutConfig: layoutConfig().most(),
            itemCount: 100,
            columnCount: 3,
            columnSpace: 10,
            rowSpace: 10,
            renderItem: (idx) => {
                return flowItem(text({
                    text: `${idx}`,
                    textColor: Color.WHITE,
                    textSize: 20,
                    layoutConfig: layoutConfig().fit().configAlignmnet(Gravity.Center)
                })).apply({
                    backgroundColor: colors[idx % colors.length],
                    height: 50 + (idx % 3) * 20,
                    layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                })
            },
        })
```

#### tsx写法
```tsx
      <FlowLayout
          layoutConfig={layoutConfig().most()}
          itemCount={100}
          columnCount={3}
          columnSpace={10}
          rowSpace={10}
          renderItem={
              (idx) => {
                  return (
                      <FlowLayoutItem
                          layoutConfig={layoutConfig().configWidth(LayoutSpec.MOST)}
                          height={50 + (idx % 3) * 20}
                          backgroundColor={colors[idx % colors.length]}
                      >
                          <Text
                              layoutConfig={layoutConfig().fit()}
                              textColor={Color.WHITE}
                              textSize={20}
                              textAlignment={Gravity.Center}
                          >
                              {`${idx}`}
                          </Text>
                      </FlowLayoutItem>
                  ) as FlowLayoutItem
              }
          }
      />
```
