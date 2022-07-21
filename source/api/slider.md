---
title: Slider - 翻页滑动(幻灯片)控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
itemCount|number|幻灯片页数
renderPage|(index: number) => SlideItem|每页的渲染回调
onPageSlided|(index: number) => void|幻灯片滑动回调
batchCount|number|批量渲染Item的数量
scrollable|boolean|是否可以滑动
loop|boolean|是否可以循环
bounces|boolean|边界回弹效果（iOS专属）

### 用法示例
#### 基础用法
```typescript
            slider({
                itemCount: 100,
                renderPage: (idx) => {
                    return slideItem(image({
                        imageUrl: imageUrls[idx % imageUrls.length],
                        scaleType: ScaleType.ScaleAspectFit,
                        layoutConfig: layoutConfig().most(),
                    }))
                },
                layoutConfig: layoutConfig().most(),
                onPageSlided: (index) => {
                    loge(index.toString())
                }
            }),
```

#### tsx写法
```tsx
      <Slider
          itemCount={100}
          layoutConfig={layoutConfig().most()}
          onPageSlided={(index) => {
              loge(index.toString())
          }}
          renderPage={(idx) => {
              return (
                  <SlideItem>
                      <Image
                          imageUrl={imageUrls[idx % imageUrls.length]}
                          scaleType={ScaleType.ScaleAspectFit}
                          layoutConfig={layoutConfig().most()}
                      />
                  </SlideItem>
              ) as SlideItem
          }}
      />
```
