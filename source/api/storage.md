---
title: storage-本地存储
---

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

**使用示例：**
```typescript
const storedKey = "StoredKey"
const zone = "StorageDemo"

storage(context).setItem(storedKey, 'Jack', zone)

storage(context).getItem(storedKey, zone).then((e) => {
    this.nameLabel.text = e || "";
})

storage(context).remove(storedKey, zone)

storage(context).clear(zone).then((e) => {
    this.update();
})
```
