---
title: Doric中的MVVM
---
构建可维护的复杂页面从来都不是简单的事情。
在Doric中我们推荐使用MVVM的方式构建复杂页面，通过轻量级的实现维护复杂的数据到视图的映射逻辑.

本文阐述了Doric中MVVM架构使用,并通过计数器Demo举例说明。

您可以通过[线上Demo](https://p.doric.pub/play/#example/Counter.ts) 快速查看本文源码及运行效果.

# MVVM
## 数据驱动视图

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:525px; height:245px;" src="https://www.processon.com/embed/61370bab5653bb2d6d2decce"></iframe>

## 例子:一个计数器

用MVVM的方式实现一个简单的计数器，点击后数字加一。
我们可以将代码按MVVM的方式实现:

### 定义状态模型 Model部分

<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28171%2C184%2C195%2C0%29&t=vscode&wt=none&l=application%2Ftypescript&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=interface%2520CountModel%2520%257B%250A%2520%2520count%253A%2520number%253B%250A%257D"
  style="width: 100%; height: 128px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
该数据结构存储了计数器的计数状态.


### 创建视图 View部分 

<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=vscode&wt=none&l=text%2Ftypescript-jsx&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=2px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=class%2520CounterView%2520extends%2520ViewHolder%2520%257B%250A%2520%2520number%21%253A%2520Text%253B%250A%2520%2520counter%21%253A%2520Text%253B%250A%2520%2520build%28root%253A%2520Group%29%2520%257B%250A%2520%2520%2520%2520vlayout%28%250A%2520%2520%2520%2520%2520%2520%255B%250A%2520%2520%2520%2520%2520%2520%2520%2520%28this.number%2520%253D%2520text%28%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520textSize%253A%252040%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%29%29%252C%250A%250A%2520%2520%2520%2520%2520%2520%2520%2520%28this.counter%2520%253D%2520text%28%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520text%253A%2520%2522Click%2520To%2520Count%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520textSize%253A%252020%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%29%29%252C%250A%2520%2520%2520%2520%2520%2520%255D%252C%250A%2520%2520%2520%2520%2520%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520layoutConfig%253A%2520layoutConfig%28%29.most%28%29%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520gravity%253A%2520Gravity.Center%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520space%253A%252020%252C%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%29.in%28root%29%253B%250A%2520%2520%257D%250A%257D"
  style="width: 100%; height: 488px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

这一步,创建了计数器的视图结构,并持有关键的视图组件的引用,以待后续的更新.

### 关联视图与状态 ViewModel部分

<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=vscode&wt=none&l=text%2Ftypescript-jsx&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=2px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=class%2520CounterVM%2520extends%2520ViewModel%253CCountModel%252C%2520CounterView%253E%2520%257B%250A%2520%2520onAttached%28s%253A%2520CountModel%252C%2520vh%253A%2520CounterView%29%2520%257B%250A%2520%2520%2520%2520vh.counter.onClick%2520%253D%2520%28%29%2520%253D%253E%2520%257B%250A%2520%2520%2520%2520%2520%2520this.updateState%28%28state%29%2520%253D%253E%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520state.count%252B%252B%250A%2520%2520%2520%2520%2520%2520%257D%29%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%2520%2520onBind%28s%253A%2520CountModel%252C%2520vh%253A%2520CounterView%29%2520%257B%250A%2520%2520%2520%2520vh.number.text%2520%253D%2520%2560%2524%257Bs.count%257D%2560%250A%2520%2520%257D%250A%257D"
  style="width: 100%; height: 290px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

在VM的`onAttached`中将点击事件设置为改变计数值,在`onBind`中将视图`text`属性设置为计数值,即将计数值与视图进行绑定.
`onAttached`只会在初始化时调用一次,以后每次`updateState`都会触发`onBind`回调.

### 通过VMPanel构建出完整的页面.

<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=vscode&wt=none&l=text%2Ftypescript-jsx&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=2px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%2540Entry%250Aclass%2520CounterPanel%2520extends%2520VMPanel%253CCountModel%252C%2520CounterView%253E%257B%250A%250A%250A%2520%2520%2520%2520getViewHolderClass%28%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520return%2520CounterView%250A%2520%2520%2520%2520%257D%250A%250A%2520%2520%2520%2520getViewModelClass%28%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520return%2520CounterVM%250A%2520%2520%2520%2520%257D%250A%250A%2520%2520%2520%2520getState%28%29%253A%2520CountModel%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520return%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520count%253A%25200%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%257D"
  style="width: 100%; height: 398px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

`CounterPanel`的`getState`方法返回的是状态初始值,核心逻辑通过VM及VH实现.