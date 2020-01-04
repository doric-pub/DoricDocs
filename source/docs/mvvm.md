---
title: Doric中的MVVM
---
构建可维护的复杂页面在任何终端都不是简单的事情。

MVVM是Model-View-ViewModel的简写。在Doric中我们推荐使用MVVM进行页面构建，将Model数据与View视图进行最大限度的分离，ViewModel驱动Model数据生成或更新View视图。

本文阐述了Doric中MVVM架构使用及计数器示例。

您可以通过[Doric Playground](https://doric-pub.github.io/DoricPlayground/play/public/?e=77#example/2) 快速查看并运行本文源码

# MVVM

## 

# 数据驱动视图

# 一个简单计数器的MVVM实现

用MVVM的方式实现一个简单的计数器，点击后加一。
我们可以将实现分解成四部分:

### 定义状态模型 Model部分

```typescript
interface CountModel {
    count: number
}
```

### 创建视图 View部分 

```typescript
class CounterView extends ViewHolder {
    number!: Text
    counter!: Text
    build(root: Group) {
        vlayout([
            this.number = text({
                textSize: 40,
            }),

            this.counter = text({
                text: "Click To Count",
                textSize: 20,
            }),
        ]).apply({
            layoutConfig: layoutConfig().most(),
            gravity: Gravity.Center,
            space: 20,
        } as IVLayout).in(root)
    }
}
```

### 关联视图与状态 ViewModel部分

```typeScript
class CounterVM extends ViewModel<CountModel, CounterView> {
    onAttached(s: CountModel, vh: CounterView) {
        vh.counter.onClick = () => {
            this.updateState(state => {
                state.count++
            })
        }
    }
    onBind(s: CountModel, vh: CounterView) {
        vh.number.text = `${s.count}`
    }
}
```

### 拼装各部分形成Panel

```typescript
@Entry
class CounterPanel extends VMPanel<CountModel, CounterView>{


    getViewHolderClass() {
        return CounterView
    }

    getViewModelClass() {
        return CounterVM
    }

    getState(): CountModel {
        return {
            count: 0
        }
    }
}
```

### 注意
`CounterPanel`的`getState`方法返回的是状态初始值