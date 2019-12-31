---
title: Doric Android SDK
---
本文介绍在Android中使用Doric的方式及常用API

# 在项目中引入

1. 在项目根目录 build.gradle 中添加远程maven地址:
    ```gradle
    allprojects {
        repositories {
            ...
            maven {
                    url "https://dl.bintray.com/osborn/Android"
            }
        }
    }
    ```

1. 在app目录中的