---
title: network-网络请求
---

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

* 使用示例: 
```typescript

let r: IRequest = {
                url: "http://baobab.kaiyanapp.com/api/v4/discovery/hot",
                method: "post",
                data: "start=1&num=1"
                };
network(this.context).request(r).then((res) => {
    const jsonStr = JSON.stringify(res);
}).catch((e) => {
    modal(this.context).toast("Catched:" + JSON.stringify(e));
 });
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

* 使用示例: 
```typescript
network(this.context).get('https://www.dmoe.cc/random.php?return=json').then((res) => {
    const jsonStr = JSON.stringify(res);
}).catch((e) => {
    modal(this.context).toast("Catched:" + JSON.stringify(e));
 });
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

* 使用示例: 
```typescript

const data = 'start=1&num=1'
network(this.context).post('http://baobab.kaiyanapp.com/api/v4/discovery/hot', data).then((res) => {
    const jsonStr = JSON.stringify(res);
}).catch((e) => {
    modal(this.context).toast("Catched:" + JSON.stringify(e));
 });
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
