---
title: imageDecoder-图片解码
---

图片解码相关API

### getImageInfo

获取图片宽高、图片类型等信息

* 参数类型：
```typescript
resource: Resource 
```
* 返回值:
```typescript
Promise<{
            width: number;   /// 宽度
            height: number;  /// 高度
            mimeType: string; /// 图片类型
        }>
```

* 使用示例：
```typescript
imageDecoder(context)
      .getImageInfo(new AssetsResource("bg.jpeg"))
      .then((info)=>{
        const width = info.width
        const height = info.height
        const mimeType = info.mimeType
      })
```

### decodeToPixels

解码图片

* 参数类型：
```typescript
resource: Resource 
```
* 返回值:
```typescript
Promise<ArrayBuffer>
```

* 使用示例：
```typescript
imageDecoder(context)
      .decodeToPixels(new AssetsResource("bg.jpeg"))
      .then((buffer)=>{
        const byteLength = buffer.byteLength
      })
```