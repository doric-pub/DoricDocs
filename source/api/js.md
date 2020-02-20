---
title: Doric JS Framework
---
Doric使用TypeScript作为开发语言，提供了一套TypeScript框架层接口。
在开发Doric程序时，需依赖该框架层实现功能。

# 安装
Doric JS程序发布在NPM官网，您可直接通过`npm`命令安装

```bash
$ npm install doric@latest
```

# 基础类及相关接口

## Panel - 页面单元面板基类

具备完整的页面生命周期回调，以及区域内视图的构建逻辑。

回调 | 描述
--- | ---
`onCreate`|Panel被创建时的回调
`onDestroy`|Panel被销毁时的回调
`onShow`|Panel显示在前台的回调
`onHidden`|Panel从前台切换到后台时的回调
`build(root:Group)`|构建视图时的回调

其它API | 描述
--- | ---
`getRootView():Group`|获取根视图
`getInitData():object\|undefined`|获取初始化参数


## Entry - 入口标示
用于`Panel`子类的注解，表示Doric程序运行的入口。
被其标记的Panel类将被自动创建实例并挂载。
用法如下:
```typescript
@Entry 
MyPanel extends Panel {
    ...
}
```

## context - JS沙箱环境的上下文
在Doric程序中，您可将context当作全局变量使用。    

context中存储了当前运行所处沙盒信息。
当调用原生桥API时，您需要传入context作为参数。

```typescript
    modal(context).toast('This is a toast.')
```

## Environment - 平台环境参数
Environment提供了当前Doric应用所处平台及系统的环境参数，作为全局变量使用。
定义字段如下:

属性 |类型 | 描述
--- | --- | ---
platform|string|标示所处平台，可取值为`"Android" \| "iOS" \| "Qt" \| "h5"`
platformVersion|string|平台系统版本号
appName|string|应用名称
appVersion|string|应用版本号
screenWidth|number|屏幕宽度
screenHeight|number|屏幕高度

用法如下：

```typescript
if (Environment.platform === 'Android') {
    ///Do something
}else {

}

```
# View - 所有视图控件的基类

Doric中所有视图控件的基类。
属性如下：

属性 |类型 | 描述
--- | --- | ---
width | number |控件宽度
height |number |控件高度
backgroundColor|Color|控件背景色
corners |```number \| { leftTop?: number; rightTop?: number; leftBottom?: number; rightBottom?: number } ```| 圆角半径，可分别定义上下左右四个圆角半径
border|`{ width: number; color: Color; }`|边框，可设置宽度及颜色
shadow|`{ color: Color; opacity: number; radius: number; offsetX: number; offsetY: number}`|阴影，可设置阴影颜色，透明度，阴影半径及偏移位置
alpha|number|控件透明度，取值范围为[0-1]
hidden|boolean|控件是否为隐藏
padding|`{left?: number,right?: number,top?: number,bottom?: number,}`|控件内边距
layoutConfig|`LayoutConfig` | 控件的布局属性
onClick|`()=>void`|控件的点击回调

下面列出Doric SDK中支持的所有控件。
**请注意，您可以通过这篇[文档](./view.html)方便地将原生的控件转为Doric控件。**

### Text - 文本控件

属性如下：

属性 |类型 | 描述
--- | --- | ---
text|string|文本内容
textColor|Color|文本颜色
textSize|number|文本尺寸
maxLines|number|最大文本行数
textAlignmnet|Gravity|文本对齐方式

用法如下:
```typescript
            text({
                text: "Text Demo",
                layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                textSize: 30,
                textColor: Color.WHITE,
                backgroundColor: colors[1],
                textAlignment: gravity().center(),
                height: 50,
            }),
```
### Input - 文本输入或编辑

属性如下：

属性 |类型 | 描述
--- | --- | ---
text|string|已输入文本
textColor|Color|已输入文本颜色
textSize|number|已输入文本尺寸
textAlignmnet|Gravity|文本对齐方式
hintText|string|提示文案
hintTextColor|Color|提示文案颜色
multiline|boolean|是否多行文本
onTextChange|(text: string) => void|文本变化回调
onFocusChange|(focused: boolean) => void|输入焦点变化回调

方法 |类型 | 描述
--- | --- | ---
getText|(context: BridgeContext)=>Promise<string>|获取当前已输入文本
setSelection|(context: BridgeContext, start: number, end: number = start)=>Promise<any>|设置选中项
requestFocus|(context: BridgeContext)=>Promise<any>|请求获取焦点
releaseFocus|(context: BridgeContext)=>Promise<any>|请求释放焦点

用法如下:
```typescript
            input({
                layoutConfig:layoutConfig().just().configHeight(LayoutSpec.FIT),
                width:300,
                hintText : "HintText",
                textAlignment: Gravity.Left,
                onTextChange:(s) => {
                    log(`onTextChange:${s}`)
                },
                onFocusChange: (f) => {
                    log(`onFocusChange:${f}`)
                }
            }),
```
### Image - 图片控件

属性如下：

属性 |类型 | 描述
--- | --- | ---
imageUrl|string|图片在线地址
imageBase64|string|Base64编码的图片内容
scaleType|ScaleType|图片缩放方式
isBlur|boolean|是否高斯模糊
loadCallback|(image: { width: number; height: number } \| undefined) => void|图片加载回调

用法如下:
```typescript
            image({
                imageUrl,
                width: 300,
                height: 300,
                scaleType: ScaleType.ScaleAspectFit,
                layoutConfig: layoutConfig().just(),
            }),
```
### VLayout - 垂直线性布局组件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|水平方向上子控件的对齐方式

用法如下：
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

### HLayout - 水平线性布局容器控件

属性 |类型 | 描述
--- | --- | ---
space|number|子控件间距
gravity|Gravity|垂直方向上子控件的对齐方式

用法如下：
```typescript
                    hlayout([
                        box(1),
                        box(2),
                        box(3),
                        box(4),
                        box(5),
                    ]).apply({
                        space: 20
                    } as IHLayout),
```

### Stack - 层叠布局容器控件

子控件都是相对于其左上角顶点摆放

用法如下：
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

### List - 列表控件

属性 |类型 | 描述
--- | --- | ---
itemCount|number|列表条数
renderItem|(index: number) => ListItem|列表每项渲染回调
loadMore|boolean|设置是否显示加载更多
loadMoreView|ListItem|显示在底部表示加载更多的视图
onLoadMore|() => void|加载更多的回调

用法如下：
```typescript
                list({
                    itemCount: 0,
                    renderItem: (idx) => listItem(text({
                                            layoutConfig: {
                                                widthSpec: LayoutSpec.MOST,
                                                heightSpec: LayoutSpec.JUST,
                                                alignment: gravity().center(),
                                            },
                                            text: `Cell At Line ${idx}`,
                                            textAlignment: gravity().center(),
                                            textColor: Color.BLACK,
                                            textSize: 20,
                                            height: 50,
                                        })),
                    layoutConfig: layoutConfig().most(),
                }),
```

### Scroller - 滑动控件

属性 |类型 | 描述
--- | --- | ---
content|View|可滑动的内容视图

用法如下：
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

### Slider - 翻页滑动(幻灯片)控件

属性 |类型 | 描述
--- | --- | ---
itemCount|number|幻灯片页数
renderPage|(index: number) => SlideItem|每页的渲染回调
onPageSlided|(index: number) => void|幻灯片滑动回调

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
            }),
```

### FlowLayout - 流式网格布局控件

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

用法如下：
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

# 原生功能插件列表

Doric在平台原生能力之上提供一套默认的JS API，您可方便地在TypeScript代码中调用平台能力。
**您可以参照这篇文档[Native插件拓展](./plugin.html)方便地开发您自己的插件**

## Module & Method
在Doric中，插件按照模块的粒度进行管理。功能相近的一组API接口作为一个Module注册进Doric中,Module中每个API作为Method。
所以，请保持Module命名空间唯一。
举例：在Module`modal`中，存放着`toast`、`alert`、`confirm`等Method。

## BridgeContext
`BridgeContext`定义了您当前Doric运行程序上下文`context`的类型。
当您从Doric中import任意变量(直接import {}都可以)时，`context`变量即可使用。
当您自定义原生桥时，您也可直接调用context进行使用。
`BridgeContext` 类型结构如下：

属性 |类型 | 描述
--- | --- | ---
id|string|标识沙箱的唯一ID
entity|any|实体内容，在Doric中即为`@Entry`所修饰的类生成的实例
callNative|(namespace: string, method: string, args?: any)=>Promise<any>|通信API，用于与原生层进行通信，推荐不直接使用。
function2Id|(func:Function)=>string|将Function转为string，用于某种场景下原生层与JS层通信时的数据转换
removeFuncById|(funcId:string)=>void|用于释放经`function2Id`转换的Function

```typescript
    //如果您定义的插件名为'myPlugin',方法名为'myMethod'
    const resultPromise = context.callNative('myPlugin','myMethod')
```

## modal
提供一组模态窗口API

### toast
弹出Toast弹窗
* 参数类型:
```typescript
msg: string ///弹窗文本
gravity?:Gravity ///弹窗位置，可为上中下，默认为下
```
* 返回值: 
```typescript
void
```

### alert
弹出警告弹窗
* 参数类型:
```typescript
arg: string | {
            title: string; ///弹窗标题
            msg: string;///弹窗内容
            okLabel?: string | undefined; ///确认按钮的文本
        })
```
* 返回值: 
```typescript
Promise<any>/// 点击确认后触发resolve回调
```

### confirm
弹出确认弹窗
* 参数类型:
```typescript
arg: string | {
            title: string;///弹窗标题
            msg: string;///弹窗内容
            okLabel?: string | undefined; ///确认按钮的文本
            cancelLabel?: string | undefined; ///取消按钮的文本
        }
```
* 返回值: 
```typescript
Promise<any>/// 点击确认后触发resolve回调，点击取消触发reject回调
```

### prompt
弹出输入弹窗
* 参数类型:
```typescript
arg: string | {
            title: string;///弹窗标题
            msg: string;///弹窗内容
            okLabel?: string | undefined; ///确认按钮的文本
            cancelLabel?: string | undefined; ///取消按钮的文本;
            text?: string | undefined; ///默认填充文本
            defaultText?: string | undefined; ///内容为空时的提示文本
        }
```
* 返回值: 
```typescript
Promise<string>/// 点击确认后触发resolve回调，返回输入值，点击取消触发reject回调
```
## navbar
提供导航栏相关API
### isHidden
当前导航栏是否隐藏
* 参数类型:
```typescript
hidden: boolean ///
```
* 返回值: 
```typescript
Promise<boolean>
```

### setHidden
设置导航栏显示或隐藏，
**请注意：当设置导航栏为隐藏后，Doric视图原点为屏幕左上角，即状态栏会覆盖在DoricPanel之上**
* 参数类型:
```typescript
hidden:boolean
```
* 返回值: 
```typescript
Promise<any>
```

### setTitle
设置导航栏标题
* 参数类型:
```typescript
title:string
```
* 返回值: 
```typescript
Promise<any>
```

### setBgColor
设置导航栏背景颜色
* 参数类型:
```typescript
color:Color
```
* 返回值: 
```typescript
Promise<any>
```

### setLeft
设置导航栏左侧Icon或文字按钮
* 参数类型:
```typescript
view: View
```
* 返回值: 
```typescript
Promise<any>
```
### setRight
设置导航栏右侧Icon或文字按钮
* 参数类型:
```typescript
view: View
```
* 返回值: 
```typescript
Promise<any>
```
## navigator
提供导航器相关API

### push
跳转到新的Doric页面
* 参数类型:
```typescript
source:string,/// 新的Doric页面对应的Source地址
config?: {
            alias?: string | undefined; /// 别名，用于调试信息
            animated?: boolean | undefined; ///是否支持跳转动画
            extra?: object | undefined; /// 新的Doric页面携带的参数
        } | undefined)
```

* 返回值: 
```typescript
Promise<any>
```

### pop
跳出当前页面
* 参数类型:
```typescript
animated?: boolean ///是否支持跳转动画
```

* 返回值: 
```typescript
Promise<any>
```

## network
提供网络相关API

### request
请求网络
* 参数类型:
```typescript
{
    url?: string;
    method?: "get" | "post" | "put" | "delete";
    headers?: {
        [index: string]: string;
    };
    params?: {
        [index: string]: string;
    };
    data?: object | string;
    timeout?: number;
}
```

* 返回值: 
```typescript
Promise< {
        data: any;
        status: number;
        headers?: {
            [index: string]: string;
        };
    }>
```

### get
GET 请求
* 参数:
```typescript
url,
{
    headers?: {
        [index: string]: string;
    };
    params?: {
        [index: string]: string;
    };
    timeout?: number;
}
```
* 返回值: 
```typescript
Promise< {
        data: any;
        status: number;
        headers?: {
            [index: string]: string;
        };
    }>
```

### post
POST请求

* 参数:
```typescript
url,
data?: string | object | undefined, 
{
    headers?: {
        [index: string]: string;
    };
    params?: {
        [index: string]: string;
    };
    timeout?: number;
}
```
* 返回值: 
```typescript
Promise< {
        data: any;
        status: number;
        headers?: {
            [index: string]: string;
        };
    }>
```

### put
PUT请求

* 参数:
```typescript
url,
data?: string | object | undefined, 
{
    headers?: {
        [index: string]: string;
    };
    params?: {
        [index: string]: string;
    };
    timeout?: number;
}
```
* 返回值: 
```typescript
Promise< {
        data: any;
        status: number;
        headers?: {
            [index: string]: string;
        };
    }>
```

### delete
DELETE请求

* 参数:
```typescript
url,
data?: string | object | undefined, 
{
    headers?: {
        [index: string]: string;
    };
    params?: {
        [index: string]: string;
    };
    timeout?: number;
}
```
* 返回值: 
```typescript
Promise< {
        data: any;
        status: number;
        headers?: {
            [index: string]: string;
        };
    }>
```

## storage
提供本地存储API 

### setItem
写入本地存储
* 参数类型:
```typescript
key: string,  /// 写入的Key值
value: string, ///写入的值
zone?: string | undefined ///标识存储区域，如不传则为全局，建议传入。
```

* 返回值: 
```typescript
Promise<any>
```

### getItem
读取本地存储
* 参数类型:
```typescript
key: string,  /// 存储Key值
zone?: string | undefined ///标识存储区域，如不传则为全局，建议传入。
```

* 返回值: 
```typescript
Promise<string> ///读取的值
```

### remove
删除某个值
* 参数类型:
```typescript
key: string,  /// 待删除的Key值
zone?: string | undefined ///标识存储区域，如不传则为全局，建议传入。
```

* 返回值: 
```typescript
Promise<any>
```
### clear
清空某个存储区域内的所有值
* 参数类型:
```typescript
zone: string ///标识存储区域，如不传则为全局，建议传入。
```

* 返回值: 
```typescript
Promise<any>
```


## popover
提供浮层弹窗API

### show
显示浮层
* 参数类型:
```typescript
view: View /// 需显示的浮层View
```
* 返回值: 
```typescript
Promise<any>
```

### dismiss
隐藏浮层
* 参数类型:
```typescript
view?: View | undefined/// 需消失的浮层View，如果传入undefined，则当前所有浮层都会消失
```
* 返回值: 
```typescript
Promise<any>
```


## animate
提供动画相关API
* 参数类型:
```typescript
{
    ///在该回调里设置的View相关的变更将在duration时段内渐变过渡
    animations: () => void;
    ///动画时长
    duration: number;
}
```
* 返回值: 
```typescript
Promise<any>
```

* 例子:
```typescript
 animate(context)({
    animations: () => {
        view.y = view.y || 0
        view.y += 100
        view2.y += 50
    },
    duration: 1000,
})
```

## notification
提供广播订阅机制API

### publish
发出广播通知
* 参数类型:
```typescript
{
    /// 业务唯一ID前缀
    biz?: string | undefined;
    /// 广播名称
    name: string;
    /// 广播携带的数据
    data?: object | undefined;
    /// Android上是否通过系统广播发送，默认通过LocalBroadcast发送
    androidSystem?: boolean | undefined;
}
```
* 返回值: 
```typescript
Promise<any>
```

### subscribe
订阅广播
* 参数类型:
```typescript
{
    /// 业务唯一ID前缀
    biz?: string | undefined;
    /// 广播名称
    name: string;
    /// 收到广播时的回调，广播携带的数据通过参数传入
    callback: (data?: any) => void;
    /// Android上是否监听系统广播，默认监听LocalBroadcast
    androidSystem?: boolean | undefined;
}
```
* 返回值: 
```typescript
Promise<string> /// 返回SubscribeID
```

### unsubscribe
取消订阅广播
* 参数类型:
```typescript
string /// subscribe方法的返回值
```
* 返回值: 
```typescript
Promise<any>
```


## statusbar
提供状态栏设置API

### setHidden
设置隐藏或显示导航栏
* 参数类型:
```typescript
boolean
```
* 返回值: 
```typescript
Promise<any>
```

### setMode
设置导航栏模式为深色或浅色
* 参数类型:
```typescript
enum StatusBarMode {
        LIGHT = 0,
        DARK = 1
}
```
* 返回值: 
```typescript
Promise<any>
```


## coordinator
提供复杂场景下的View联动机制API

### verticalScrolling

将可垂直方向滑动的View与另一个View的属性绑定，使其属性值可在滑动区域内渐变。

* 参数类型：
```typescript
{
    ///需要监听滑动的View，目前支持List,Scroller,FlowLayout三种视图类型
    scrollable: List | Scroller | FlowLayout;
    ///滑动区域，从start到end区域渐变
    scrollRange: {
        start: number;
        end: number;
    };
    ///设置目标View或导航栏
    target: View | "NavBar";
    ///映射的属性及值渐变范围，在设置target为"NavBar"时仅支持"backgroundColor"
    changing: {
        name: "width" | "height" | "x" | "y" | "backgroundColor";
        start: number | Color;
        end: number | Color;
    };
}
```
* 返回值:Promise<any>
