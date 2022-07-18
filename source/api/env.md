---
title: Environment - Doric中的环境变量
---
Environment在Doric中已作为全局变量注入运行时中, 记录了Doric运行时中的一些基础环境值.

## 已支持字段

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
statusBarHeight|number|状态栏高度
hasNotch|boolean|是否有全面屏缺口
deviceBrand|string|手机品牌商,ex:Apple or Google
deviceModel|string|手机型号,ex:iPhone12,5 or pixel 3
localeLanguage|string|手机设置当前的语言
localeCountry|string|手机设置当前的国家
[index: string]|string|自定义设置的值 
## 用法示例：

```typescript
if (Environment.platform === 'Android') {
    ///Do something
}else {

}

```

## 自定义注入
您可以扩展Environment定义,加入提前定义好的一些变量值,以让JS侧读取到
请在Doric初始化前调用该方法
### Android中
```java
package pub.doric;
public class Doric {
... 
    public static void setEnvironmentValue(Map<String, Object> value);
}
```
### iOS中
```objective-c
@interface Doric : NSObject
...
+ (void)setEnvironmentValue:(NSDictionary *)value;
@end
```