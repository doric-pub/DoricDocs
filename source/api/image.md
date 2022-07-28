---
title: Image - 图片控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
imageUrl|string|图片在线地址
imageBase64|string|Base64编码的图片内容
image|Resource|图片资源
imagePath|string|图片local路径
imageRes|string|图片resource路径
imageFilePath|string|图片文件路径
scaleType|ScaleType|图片缩放方式
isBlur|boolean|是否高斯模糊
loadCallback|(image: { width: number; height: number } \| undefined) => void|图片加载回调
onAnimationEnd|( ) => void|动画图片资源播放结束回调
imagePixels|{ width: number, height: number, pixels: ArrayBuffer }|图片像素格式内容

方法 |类型 | 描述
--- | --- | ---
isAnimating|(context: BridgeContext)=>Promise<boolean>|判断图片资源动画是否进行中
startAnimating|(context: BridgeContext)=>Promise<any>|图片资源动画开始运行
stopAnimating|(context: BridgeContext)=>Promise<any>|图片资源动画结束运行
getImageInfo|(resource: Resource) => Promise<any>|获取图片资源信息
getImagePixels|(context: BridgeContext)=> Promise<ArrayBuffer>|获取图片像素信息
setImagePixels|(context: BridgeContext, image): Promise<void>|设置图片像素信息


### 用法示例
#### 基础用法
```typescript
            image({
                imageUrl:"https://p.upyun.com/demo/webp/webp/jpg-0.webp",
                width: 300,
                height: 300,
                scaleType: ScaleType.ScaleAspectFit,
                layoutConfig: layoutConfig().just(),
            }),
            image({
                imageRes: "qrc:/resource/main/icon_cp_gift_box_tips.png",
                layoutConfig: layoutConfig().fit().configMargin({
                    top: 23,
                    right: 23
                }).configAlignment(gravity().right()),
        
            }),
            image({
                image: new AssetsResource("dididi.png"),
                height: 78,
                width: 84,
                backgroundColor: Color.BLACK,
                scaleType: ScaleType.ScaleAspectFill,
                layoutConfig: layoutConfig().just(),
            }),
```