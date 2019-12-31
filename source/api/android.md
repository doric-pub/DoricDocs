---
title: Doric Android SDK
---
本文介绍在Android中使用Doric的方式及常用API

# 项目引入

1. 在项目根目录 build.gradle 中添加远程maven地址:
    ```gradle
    allprojects {
        repositories {
            ......
            maven {
                    url "https://dl.bintray.com/osborn/Android"
            }
        }
    }
    ```

1. 在app目录中的 build.gradle 中添加依赖:
    ```gradle
        dependencies {
            ......
            implementation "pub.doric:core:0.2.1"
            debugImplementation "pub.doric:devkit:0.2.1"
        }
    ```

1. 直接跳转到DoricActivity(装载JS Bundle为 `assets/src/BUNDLE_NAME.js`)
    ```java
        Intent intent  = new Intent(context, DoricActivity.class);
        intent.putExtra("scheme", "assets://src/" + BUNDLE_NAME + ".js");
        intent.putExtra("alias", BUNDLE_NAME);
        context.startActivity(intent);
    ```

# Doric容器
Doric容器可以接收Doric JS bundle并运行。

## DoricActivity

Activity级别的Doric容器，经DoricActivity装载的Doric程序可绘制在整个Activity之上。

```java
    Intent intent  = new Intent(context, DoricActivity.class);
    intent.putExtra("scheme", "assets://src/" + BUNDLE_NAME + ".js");
    intent.putExtra("alias", BUNDLE_NAME);
    context.startActivity(intent);
```

## DoricFragment & DoricPanelFragment

Fragment级别的Doric容器，经DoricFragment装载的Doric程序可绘制在Fragment所处区域。
DoricFragment装载的Doric程序可在其内部进行不同DoricPanel间的跳转。
而DoricPanelFragment装载的Doric程序只能装载自身，不能进行跳转切换。

```java
    String scheme = "assets://src/" + BUNDLE_NAME + ".js";
    getIntent().putExtra("scheme", scheme);
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

# Bundle装载 - DoricJSLoader

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

创建`JSLoader`的实例并在`DoricRegistry`中注册

```java
DoricRegistry.addJSLoader(new DoricHttpJSLoader());
```