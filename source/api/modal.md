---
title: modal-模态窗口
---

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
* 使用示例: 
```typescript
modal(context).toast("保存成功");

modal(context).toast("保存成功", Gravity.Center);
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
* 使用示例: 
```typescript
modal(context).alert('确定删除吗？')

modal(context).alert({title: '提示', msg: '确定删除吗？', okLabel:'确认'})
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
* 使用示例: 
```typescript
// 方式1
modal(context).confirm('确定删除吗？')
// 方式2
modal(context).confirm({title: '提示', msg: '确定删除吗？', okLabel:'确认', cancelLabel: '取消'})
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
* 使用示例: 
```typescript
// 方式1
modal(this.context).prompt({title: '提示', msg: '请输入手机号', okLabel:'确认', cancelLabel: '取消'}).then((result)=>{
    log(`result = ${result}`);
});

// 方式2
const result = await modal(this.context).prompt({title: '提示', msg: '请输入手机号', okLabel:'确认', cancelLabel: '取消'});
log(`result = ${result}`);
```