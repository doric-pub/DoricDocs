---
title: NestedSlider - 嵌套滑动控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
onPageSlided|(index: number) => void|页面滑动回调
scrollable|boolean|是否可以滑动
bounces|boolean|边界回弹效果（iOS专属）

### 用法示例
#### 基础用法
```typescript
@Entry
class StickDemo extends Panel {
    private tabs!: Text[]
    private indicator!: View
    private sliderView!: NestedSlider
    build(root: Group) {
        this.indicator = new Stack
        this.indicator.backgroundColor = colors[0]
        this.indicator.width = 20
        this.indicator.height = 2

        scroller(
            vlayout([
                stack([
                    image({
                        layoutConfig: layoutConfig().most(),
                        imageUrl: "https://p.upyun.com/demo/webp/webp/jpg-0.webp",
                        scaleType: ScaleType.ScaleAspectFill,
                    }),

                ]).apply({
                    layoutConfig: layoutConfig().most().configHeight(LayoutSpec.JUST),
                    height: 200,
                    backgroundColor: colors[0],
                }),
                stack([
                    hlayout([
                        ...this.tabs = [0, 1, 2].map(idx => {
                            return text({
                                text: `Tab  ${idx}`,
                                layoutConfig: layoutConfig().just().configWeight(1),
                                height: 41,
                                onClick: () => {
                                    this.sliderView.slidePage(context, idx, true)
                                },
                            })
                        })
                    ]).apply({
                        layoutConfig: layoutConfig().most(),
                        gravity: Gravity.Center,
                    }),
                    this.indicator,
                ]).apply({
                    layoutConfig: layoutConfig().most().configHeight(LayoutSpec.JUST),
                    height: 57,
                }),

                (new NestedSlider).also(v => {
                    v.scrollable = false
                    this.sliderView = v;
                    v.onPageSlided = (idx) => {
                        this.refreshTabs(idx)
                    }
                    [0, 1, 2].map(idx => {
                        return flowlayout({
                            layoutConfig: layoutConfig().just(),
                            width: root.width,
                            height: root.height - 57,
                            itemCount: 100,
                            columnCount: 2,
                            columnSpace: 10,
                            rowSpace: 10,
                            renderItem: (itemIdx) => {
                                return new FlowLayoutItem().apply({
                                    backgroundColor: colors[itemIdx % colors.length],
                                    height: 50,
                                    layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                                }).also(it => {
                                    it.addChild(text({
                                        text: `In Page ${idx},${itemIdx}`,
                                        textColor: Color.WHITE,
                                        textSize: 20,
                                        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center)
                                    }).also(v => {
                                        v.onClick = () => {
                                            v.text = "Clicked"
                                        }
                                    }))
                                })
                            },
                        })
                    }).forEach(e => {
                        v.addSlideItem(e)
                    })
                }).apply({
                    layoutConfig: layoutConfig().just(),
                    width: root.width,
                    height: root.height - 57,
                }),
            ])
                .also(it => {
                    it.layoutConfig = layoutConfig().most().configHeight(LayoutSpec.FIT)
                }))
            .apply({
                layoutConfig: layoutConfig().most()
            })
            .in(root)
        this.indicator.centerX = this.getRootView().width / this.tabs.length / 2
        this.refreshTabs(0)
    }

    refreshTabs(page: number) {
        this.tabs.forEach((e, idx) => {
            if (idx == page) {
                e.textColor = colors[0]
            } else {
                e.textColor = Color.BLACK
            }
        })
        this.indicator.layoutConfig = layoutConfig().just().configAlignment(Gravity.Bottom).configMargin({ bottom: 13 })
        animate(context)({
            animations: () => {
                this.indicator.centerX = this.getRootView().width / this.tabs.length * (page + 0.5)
            },
            duration: 300,
        })
    }
}
```
