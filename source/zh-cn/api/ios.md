---
title: Doric iOS SDK
---
本文介绍在iOS中使用Doric的方式及常用API

# 项目引入

1. 在pod spec中添加:
    ```ruby
      pod 'DoricCore', '~>0.2.1'
    ```

1. 安装pod
    ```bash
    $ pod install
    ```

# Doric容器
Doric容器可以接收Doric JS bundle并运行。

## DoricViewController

经DoricViewController装载的Doric程序可绘制在整个ViewController之上，传入Scheme可加载JS Bundle。

```objectivec
    DoricViewController *doricViewController = [[DoricViewController alloc] initWithScheme:[NSString stringWithFormat:@"assets://src/%@.js", bundleName]
                                                                                     alias:bundleName
                                                                                     extra:@""];
    [navigationController pushViewController:doricViewController animated:YES];
```

## DoricPanel

更细粒度的Doric容器，需直接传入JS bundle内容，不能通过Scheme装载JS Bundle。

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

创建`JSLoader`的实例并在`DoricRegistry`中注册

```objectivec
    [DoricJSLoaderManager.instance addJSLoader:[DoricHttpJSLoader new]];
```