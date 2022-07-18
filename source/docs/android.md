---
title: Android应用中使用Doric
---
本文介绍在Android中使用Doric的方式及常用API

# 项目引入
![icon](https://img.shields.io/maven-central/v/pub.doric/core)
1. 在项目根目录 build.gradle 中添加远程maven地址:
    ```gradle
    allprojects {
        repositories {
            ......
            mavenCentral()
        }
    }
    ```

2. 在app目录中的 build.gradle 中添加依赖:
    ```gradle
        dependencies {
            ......
            // 请注意sdkVersion需>=当前项目中的doric js库版本
            implementation "pub.doric:core:${sdkVersion}"
            debugImplementation "pub.doric:devkit:${sdkVersion}"
        }
    ```

3. 直接跳转到DoricActivity(装载JS Bundle为 `assets/src/BUNDLE_NAME.js`)
    ```java
        Intent intent  = new Intent(context, DoricActivity.class);
        intent.putExtra("source", "assets://src/" + BUNDLE_NAME + ".js");
        intent.putExtra("alias", BUNDLE_NAME);
        context.startActivity(intent);
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

## DoricActivity

Activity级别的Doric容器，经DoricActivity装载的Doric程序可绘制在整个Activity之上。

```java
    Intent intent  = new Intent(context, DoricActivity.class);
    intent.putExtra("source", "assets://src/" + BUNDLE_NAME + ".js");
    intent.putExtra("alias", BUNDLE_NAME);
    context.startActivity(intent);
```

## DoricFragment & DoricPanelFragment

Fragment级别的Doric容器，经DoricFragment装载的Doric程序可绘制在Fragment所处区域。
DoricFragment装载的Doric程序可在其内部进行不同DoricPanel间的跳转。
而DoricPanelFragment装载的Doric程序只能装载自身，不能进行跳转切换。

```java
    String source = "assets://src/" + BUNDLE_NAME + ".js";
    getIntent().putExtra("source", scheme);
    getIntent().putExtra("alias", BUNDLE_NAME);
    this.getSupportFragmentManager().beginTransaction().add(R.id.root, new DoricFragment()).commit();
```

## DoricPanel

View级别的Doric容器，经DoricPanel装载的Doric程序可绘制在View所处区域。

```xml
<?xml version="1.0" encoding="utf-8"?>
<pub.doric.DoricPanel xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/doric_panel"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</pub.doric.DoricPanel>
```

```java
doricPanel.config(bundleString, alias, extra);
```
这里的`bundleString`为实际运行的JS内容，您可以通过`DoricJSLoader`获取。

# Bundle装载 - DoricJSLoader

DoricJSLoader的作用是根据Source协议请求加载JS内容。
Doric内部实现了通过`assets`文件或`http/https`地址加载。
您也可以按如下注册自己的DoricJSLoader来实现自定义协议。

## 使用
Doric内置了两种协议实现
1. Asset文件夹，source格式为`assets://xxxxxx`
2. Http或Https协议，source格式即为http地址,`https://example.com/bundle.js`

```java
String source = "assets://src/HelloDoric.js";
final String alias = "HelloDoric";
DoricJSLoaderManager.getInstance().loadJSBundle(source).setCallback(new AsyncResult.Callback<String>() {
    @Override
    public void onResult(String result) {
        //result is JS content
        doricPanel.config(result,alias,null);
    }

    @Override
    public void onError(Throwable t) {

    }

    @Override
    public void onFinish() {

    }
});
```

## 注册自己的DoricJSLoader
您可以注册DoricJSLoader来实现对JS Bundle的自定义请求下载。

```java
public interface IDoricJSLoader {
    boolean filter(String scheme);

    AsyncResult<String> request(String scheme);
}
```
## 实现接口
```java
public class DoricHttpJSLoader implements IDoricJSLoader {
    private OkHttpClient okHttpClient = new OkHttpClient();

    @Override
    public boolean filter(String scheme) {
        return scheme.startsWith("http");
    }

    @Override
    public AsyncResult<String> request(String scheme) {
        final AsyncResult<String> ret = new AsyncResult<>();
        okHttpClient.newCall(new Request.Builder().url(scheme).build()).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                ret.setError(e);
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) {
                try {
                    ret.setResult(response.body().string());
                } catch (Exception e) {
                    ret.setError(e);
                }
            }
        });
        return ret;
    }
}
```

## 注册生效

创建`JSLoader`的实例并在`Doric`中注册

```java
Doric.addJSLoader(new DoricHttpJSLoader());
```