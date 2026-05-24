---
title: Text - 文本控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
text|string|文本内容
textColor|Color|文本颜色
textSize|number|文本尺寸
maxLines|number|最大文本行数
textAlignment|Gravity|文本对齐方式
fontStyle|`"normal" \| "bold" \| "italic" \| "bold_italic"`|字体样式
font|string \| Resource|字体，可设置ttf文件
maxWidth|number|控件最大宽度
maxHeight|number|控件最大高度
lineSpacing|number|设置行间距
strikethrough|boolean|设置删除线效果
underline|boolean|设置下划线效果
htmlText|string|设置html文本
truncateAt|TruncateAt|设置省略符，可取值为`TruncateAt.End \| TruncateAt.Middle \| TruncateAt.Start \| TruncateAt.Clip`

### 用法示例
#### 基础用法
```typescript
            text({
                text: "Text Demo",
                height: 50,
                layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
                textSize: 30,
                textColor: Color.WHITE,
                backgroundColor: Color.GREEN,
                font: new AssetsResource('Hanabi.ttf'),
                textAlignment: Gravity.Center,
            }),
```

#### tsx写法
```tsx
      <Text
          height={50}
          layoutConfig={layoutConfig().configWidth(LayoutSpec.MOST)}
          textSize={30}
          textColor={Color.WHITE}
          backgroundColor={Color.GREEN}
          font={new AssetsResource('Hanabi.ttf')}
          textAlignment={Gravity.Center}
      >
          Text Demo
      </Text>
```
