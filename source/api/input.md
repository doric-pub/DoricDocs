---
title: Input - 文本输入或编辑
---

### 属性

属性 |类型 | 描述
--- | --- | ---
text|string|已输入文本
textColor|Color|已输入文本颜色
textSize|number|已输入文本尺寸
textAlignmnet|Gravity|文本对齐方式
hintText|string|提示文案
hintTextColor|Color|提示文案颜色
hintFont|string|提示文案的字体样式
multiline|boolean|是否多行文本
onTextChange|(text: string) => void|文本变化回调
beforeTextChange|(change: string) => boolean|文本变化前回调
onFocusChange|(focused: boolean) => void|输入焦点变化回调
onSubmitEditing|(text: string) => void|编辑提交回调
maxLength|number|文本长度限制
font|string|字体样式
inputType|number|输入样式选择
password|boolean|是否为密码
editable|boolean|是否可编辑
returnKeyType|ReturnKeyType|返回键提示文案类型
enableHorizontalScrollBar|boolean|水平滑动条是否显示
enableVerticalScrollBar|boolean|竖直滑动条是否显示

方法 |类型 | 描述
--- | --- | ---
getText|(context: BridgeContext)=>Promise<string>|获取当前已输入文本
setSelection|(context: BridgeContext, start: number, end: number = start)=>Promise<any>|设置选中项
getSelection|(context: BridgeContext)=> Promise<any>|获取选中项
requestFocus|(context: BridgeContext)=>Promise<any>|请求获取焦点
releaseFocus|(context: BridgeContext)=>Promise<any>|请求释放焦点

### 用法示例
#### 基础用法
```typescript
             input({
                layoutConfig:layoutConfig().just().configHeight(LayoutSpec.FIT),
                width:300,
                maxLength: 20,
                hintText : "HintText",
                textSize: 40,
                text: 'HelloDoric',
                textAlignment: Gravity.Left,
                textColor: Color.WHITE,
                multiline:true
                hintText: "Please input something",
                hintTextColor: Color.GREEN,
                font: 'DINPro',
                hintFont: 'Hanabi',
                inputType: InputType.Decimal,
                password: true,
                enableHorizontalScrollBar:true
                onTextChange:(s) => {
                    log(`onTextChange:${s}`)
                },
                onFocusChange: (f) => {
                    log(`onFocusChange:${f}`)
                }
                beforeTextChange = (change) => {
                    log(`beforeTextChange  ${JSON.stringify(change)}`);
                return true;
                }
```