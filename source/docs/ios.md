---
title: iOS中接入Doric SDK
---
本文介绍在iOS中使用Doric的方式及常用API

# 项目引入
![icon](https://img.shields.io/cocoapods/v/DoricCore)
1. 在pod spec中添加:
    ```ruby
    // 请注意sdkVersion需>=当前项目中的doric js库版本
      pod 'DoricCore', '~>${sdkVersion}'
    ```

2. 安装pod
    ```bash
    $ pod install
    ```
# 常用参数说明
本小节内容解释Doric SDK参数名词及意义。
## `source`
标示JS bundle的来源，`DoricJSLoader`可根据`source`请求到JS bundle内容。
## `alias`
用于标识Doric运行时，用于热重载调试。可为空。
## `extra`
初始化DoricJS时传入的额外数据,在`Panel`中，可通过`getInitData`获取。为JSON格式的字符串。可传空。

# Doric容器
Doric容器可以接收Doric JS bundle并运行。

## DoricViewController

经DoricViewController装载的Doric程序可绘制在整个ViewController之上。

```objectivec
    DoricViewController *doricViewController = [[DoricViewController alloc] initWithSource:[NSString stringWithFormat:@"assets://src/%@.js", bundleName]
                                                                                     alias:bundleName
                                                                                     extra:@""];
    [navigationController pushViewController:doricViewController animated:YES];
```

## DoricPanel

更细粒度的Doric容器，需直接传入JS bundle内容。`jsBundleString`可通过`DoricJSLoader`获取。 

```objectivec
    DoricPanel *panel = [DoricPanel new];
    [panel.view also:^(UIView *it) {
        it.backgroundColor = [UIColor whiteColor];
        it.width = self.view.width;
        it.height = self.view.height;
    }];
    [self.view addSubview:panel.view];
    [self addChildViewController:panel];
    [panel config:jsBundleString alias:alias extra:extra];
    panel.doricContext.navigator = self;
    panel.doricContext.navBar = self;
```

# Bundle装载 - DoricJSLoader

DoricJSLoader的作用是根据Source协议请求加载JS内容。
Doric内部实现了通过`assets`文件或`http/https`地址加载。
您也可以按如下注册自己的DoricJSLoader来实现自定义协议。

## 使用
Doric内置了两种协议实现
1. App内文件，source格式为`assets://xxxxxx`。`xxxxxx`即为文件相对MainBundle的路径。
2. Http或Https协议，source格式即为http地址,`https://example.com/bundle.js`

```objectivec
NSString *source = @"assets://src/HelloDoric.js";
NSString *alias = @"HelloDoric";
[[DoricJSLoaderManager instance] request:source].resultCallback = ^(NSString *result) {
    [doricPanel config:source alias:alias extra:@"{}"];
};
```
## 注册
您可以注册DoricJSLoader来实现对JS Bundle的自定义请求下载。

```objectivec
@protocol DoricLoaderProtocol <NSObject>
- (BOOL)filter:(NSString *)scheme;

- (DoricAsyncResult <NSString *> *)request:(NSString *)scheme;
@end
```

## 实现接口

```objectivec
@interface DoricHttpJSLoader : NSObject <DoricLoaderProtocol>
@end

@implementation DoricHttpJSLoader

- (BOOL)filter:(NSString *)scheme {
    return [scheme hasPrefix:@"http"];
}

- (DoricAsyncResult <NSString *> *)request:(NSString *)scheme {
    DoricAsyncResult *ret = [DoricAsyncResult new];
    NSURL *URL = [NSURL URLWithString:scheme];
    NSURLRequest *request = [NSURLRequest requestWithURL:URL];
    [[[NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]]
            dataTaskWithRequest:request
              completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                  if (!error) {
                      NSString *dataStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                      [ret setupResult:dataStr];
                  } else {
                      [ret setupError:[[NSException alloc] initWithName:@"DoricJSLoaderManager Exception" reason:error.description userInfo:nil]];
                  }
              }] resume];
    return ret;
}
@end
```

## 注册生效

创建`JSLoader`的实例并在`Doric`中注册

```objectivec
    [Doric addJSLoader:[DoricHttpJSLoader new]];
```