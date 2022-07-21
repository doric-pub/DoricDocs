---
title: Refreshable - 刷新控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
content|View|内容视图
header|View|显示在内容视图顶部的刷新视图
onRefresh|() => void|刷新后的回调

### 用法示例
#### 基础用法
```typescript
                let refreshView: Refreshable
                refreshView = refreshable({
                    onRefresh: () => {
                        refreshView.setRefreshing(context, false).then(() => {
                            (refreshView.content as List).also(it => {
                                it.reset()
                                offset = Math.ceil(Math.random() * colors.length)
                                it.itemCount = 40
                                it.loadMore = true
                                it.onLoadMore = () => {
                                    setTimeout(() => {
                                        it.itemCount += 10
                                    }, 1000)
                                }
                                it.loadMoreView = listItem(text({
                                    text: "Loading",
                                    layoutConfig: layoutConfig().most().configHeight(LayoutSpec.JUST).configAlignment(Gravity.Center),
                                    height: 50,
                                }))
                                it.renderItem = (idx: number) => {
                                    let counter!: Text
                                    return listItem(
                                        hlayout([
                                            text({
                                                layoutConfig: {
                                                    widthSpec: LayoutSpec.FIT,
                                                    heightSpec: LayoutSpec.JUST,
                                                    alignment: gravity().center(),
                                                },
                                                text: `Cell At Line ${idx}`,
                                                textAlignment: gravity().center(),
                                                textColor: Color.parse("#ffffff"),
                                                textSize: 20,
                                                height: 50,
                                            })
                                        ]).also(it => {
                                            it.layoutConfig = {
                                                widthSpec: LayoutSpec.MOST,
                                                heightSpec: LayoutSpec.FIT,
                                                margin: {
                                                    bottom: 2,
                                                }
                                            }
                                            it.gravity = gravity().center()
                                            it.backgroundColor = colors[(idx + offset) % colors.length]
                                        })
                                    ).also(it => {
                                        it.layoutConfig = {
                                            widthSpec: LayoutSpec.MOST,
                                            heightSpec: LayoutSpec.FIT,
                                        }
                                    })
                                }
                            })
                        })
                    },
                    header: rotatedArrow(),
                    content: list({
                        itemCount: 0,
                        renderItem: () => new ListItem,
                        layoutConfig: {
                            widthSpec: LayoutSpec.MOST,
                            heightSpec: LayoutSpec.MOST,
                        },
                    }),
                    layoutConfig: {
                        widthSpec: LayoutSpec.MOST,
                        heightSpec: LayoutSpec.FIT,
                        weight: 1,
                    },
                }),
```
