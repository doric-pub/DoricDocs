---
title: List - 列表控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
itemCount|number|列表条数
renderItem|(index: number) => ListItem|列表每项渲染回调
batchCount|number|批量渲染Item的数量
onLoadMore|() => void|加载更多的回调
loadMore|boolean|设置是否显示加载更多
loadMoreView|ListItem|显示在底部表示加载更多的视图
onScroll|(offset: { x: number, y: number }) => void|滑动过程中的回调
onScrollEnd|(offset: { x: number, y: number }) => void|滑动停止的回调
scrolledPosition|number|滑动到指定位置
scrollable|boolean|列表是否可以滑动
bounces|boolean|边界回弹效果（iOS专属）
canDrag|boolean|是否可以拖拽Item
beforeDragging|(from: number) => void|准备拖拽Item时的回调
onDragging|(from: number, to: number) => void|拖拽Item过程中的的回调
onDragged|(from: number, to: number) => void|拖拽Item动作结束的回调

### 用法示例
#### 基础用法
```typescript
                list({
                    itemCount: 10,
                    renderItem: (idx) => listItem(text({
                        height: 50,
                        layoutConfig: {
                            widthSpec: LayoutSpec.MOST,
                            heightSpec: LayoutSpec.JUST,
                            alignment: gravity().center(),
                        },
                        text: `Cell At Line ${idx}`,
                        textAlignment: gravity().center(),
                        textColor: Color.BLACK,
                        textSize: 20,
                    })),
                    layoutConfig: layoutConfig().most(),
                }),
```

#### tsx写法
```tsx
      <List
          itemCount={10}
          renderItem={
              (idx) => {
                  return (
                      <ListItem>
                          <Text
                              height={50}
                              layoutConfig={layoutConfig().most().justHeight()}
                              textColor={Color.BLACK}
                              textAlignment={Gravity.Center}
                              textSize={20}
                          >
                              {`Cell At Line ${idx}`}
                          </Text>
                      </ListItem>
                  ) as ListItem
              }
          }
          layoutConfig={layoutConfig().most()}
      />
```

#### mvvm写法完整示例
```typescript
import { Color, gravity, Group, layoutConfig, LayoutSpec, List, list, listItem, log, loge, modal, stack, text, Text, ViewHolder, ViewModel, vlayout, VMPanel } from "doric";

interface ItemModel {
    text: string
}

interface ListModel {
    end: boolean
    offset: number
    data: ItemModel[]
}

async function loadData(offset: number): Promise<{
    isEnd: boolean,
    data: ItemModel[]
}> {
    return new Promise<{
        isEnd: boolean,
        data: ItemModel[]
    }>(resolve => {
        setTimeout(() => {
            resolve({
                isEnd: offset > 100,
                data: new Array(10).fill(offset).map((e, idx) => {
                    return { text: `Item: ${e + idx}` }
                })
            })
        }, 1000)
    })
}

class ListVH extends ViewHolder {
    list!: List
    build(root: Group) {
        vlayout(
            [
                text({
                    text: "ListDemo",
                    layoutConfig: {
                        widthSpec: LayoutSpec.MOST,
                        heightSpec: LayoutSpec.JUST,
                    },
                    textSize: 30,
                    textColor: Color.parse("#535c68"),
                    backgroundColor: Color.parse("#dff9fb"),
                    textAlignment: gravity().center(),
                    height: 50,
                }),
                this.list = list({
                    itemCount: 0,
                    layoutConfig: {
                        widthSpec: LayoutSpec.MOST,
                        heightSpec: LayoutSpec.JUST,
                        weight: 1
                    },
                })
            ],
            {
                layoutConfig: layoutConfig().most(),
                backgroundColor: Color.WHITE
            }).in(root)
    }
}

class ListVM extends ViewModel<ListModel, ListVH> {
    onAttached(state: ListModel, vh: ListVH) {
        vh.list.apply({
            canDrag: true,
            onDragging: (from, to) => {
                log(`onDragging, from: ${from}, to: ${to}`)
            },
            onDragged: (from, to) => {
                log(`onDragged, from: ${from}, to: ${to}`)
            },
            renderItem: (index) => {
                const data = state.data[index]
                return listItem(stack([
                    text({
                        text: data.text,
                        textSize: 20,
                        layoutConfig: {
                            widthSpec: LayoutSpec.FIT,
                            heightSpec: LayoutSpec.JUST,
                        },
                        height: 50,
                        onClick: function () {
                            (this as Text).height += 10
                        }
                    })
                ]), {
                    layoutConfig: {
                        widthSpec: LayoutSpec.MOST,
                        heightSpec: LayoutSpec.FIT,
                    },
                    //onClick: () => { modal(context).alert("Item Clicked " + index) }
                }).apply({
                    actions: [
                        {
                            title: "First",
                            backgroundColor: Color.RED,
                            callback: () => {
                                modal(context).alert("First action " + index)
                            }
                        },
                        {
                            title: "Second",
                            backgroundColor: Color.BLUE,
                            callback: () => {
                                modal(context).alert("Second action " + index)
                            }
                        }
                    ]
                })
            },
            onLoadMore: async () => {
                loge(`LoadMore,offset:${state.offset}`)
                const ret = await loadData(state.offset)
                this.updateState(state => {
                    state.end = ret.isEnd
                    state.data = state.data.concat(ret.data)
                    state.offset = state.data.length
                })
            },
            onScrollEnd: async () => {
                const ret = await vh.list.findCompletelyVisibleItems(context)
                loge('completelyVisible Items is:', ret)
                const ret2 = await vh.list.findVisibleItems(context)
                loge('visible Items is:', ret2)
            }
        })
        loadData(state.offset).then(ret => {
            this.updateState(state => {
                state.end = ret.isEnd
                state.data = state.data.concat(ret.data)
                state.offset = state.data.length
            })
        })
    }

    onBind(state: ListModel, vh: ListVH) {
        vh.list.apply({
            itemCount: state.data.length,
            loadMore: !state.end
        })
        loge(`onBind,itemCount:${vh.list.itemCount}`)
    }
}

@Entry
class ListPanel extends VMPanel<ListModel, ListVH> {
    getViewModelClass() {
        return ListVM
    }
    getViewHolderClass() {
        return ListVH
    }
    getState() {
        return {
            end: true,
            data: [],
            offset: 0
        }
    }
}
```
