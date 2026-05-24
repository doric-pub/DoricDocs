---
title: 新增Doric扩展视图组件
---
> 扩展自定义视图需要通过如下步骤：
> - JS层面的定义和导出
> - Android，iOS，Web和Qt部分相应原生组件的实现

> 本文将通过实现一个可拖拽的视图组件来阐述视图的扩展方式。

## JavaScript部分的定义和导出

* 作为视图容器层，需要有视图容器的基本属性，因此这里声明一个可拖拽接口IDraggable继承IStack接口
* Draggable作为Stack的子集同时实现IDraggable接口，包含一个onDrag方法，该方法包含修饰器Property，表明此方法可以被动态修改
* draggable方法接受IDraggable接口的具体实现和内部子视图的数组，来生成一个Draggable视图的实例

```javascript
import { Property, View } from "../ui/view"
import { IStack, Stack } from "../widget/layouts"
import { layoutConfig } from "../util/layoutconfig"

export interface IDraggable extends IStack {
    onDrag?: (x: number, y: number) => void
}

export class Draggable extends Stack implements IDraggable {
    @Property
    onDrag?: (x: number, y: number) => void
}

export function draggable(config: IDraggable, views: View[]) {
    const ret = new Draggable
    ret.layoutConfig = layoutConfig().fit()
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret)
    }
    for (let v of views) {
        ret.addChild(v)
    }
    return ret
}
```

为了提供给外部使用，则可以采用ES6的导出

```javascript
export * from './draggable'
```

## Native部分的实现
### Android端的实现

* 声明DraggableNode类，继承于StackNode
* blend方法则用来接受从JS层面传来的onDrag参数
* build方法返回一个DraggableView的实例，该DraggableView在onTouchEvent内通过callJSResponse此方法将该View的位置通知JS层

```java
package pub.doric.shader;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.MotionEvent;
import android.widget.FrameLayout;

import com.github.pengfeizhou.jscore.JSValue;

import pub.doric.DoricContext;
import pub.doric.extension.bridge.DoricPlugin;

@DoricPlugin(name = "Draggable")
public class DraggableNode extends StackNode {

    private String onDrag;

    public DraggableNode(DoricContext doricContext) {
        super(doricContext);
    }

    @Override
    protected FrameLayout build() {
        return new DraggableView(getContext());
    }

    @Override
    protected void blend(FrameLayout view, String name, JSValue prop) {
        if ("onDrag".equals(name)) {
            if (prop.isString()) {
                onDrag = prop.asString().value();
            } else {
                onDrag = null;
            }
        } else {
            super.blend(view, name, prop);
        }
    }

    private class DraggableView extends FrameLayout {
        private int lastX;

        private int lastY;

        public DraggableView(Context context) {
            super(context);
        }

        @SuppressLint("ClickableViewAccessibility")
        @Override
        public boolean onTouchEvent(MotionEvent event) {
            int x = (int) event.getX();
            int y = (int) event.getY();

            int rawX = (int) event.getRawX();
            int rawY = (int) event.getRawY();

            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    lastX = x;
                    lastY = y;
                    break;
                case MotionEvent.ACTION_MOVE:
                    int offsetX = x - lastX;
                    int offsetY = y - lastY;
                    layout(getLeft() + offsetX, getTop() + offsetY, getRight() + offsetX, getBottom() + offsetY);
                    break;
                case MotionEvent.ACTION_UP:
                    break;
            }

            callJSResponse(onDrag, rawX - x, rawY - y);
            return true;
        }
    }
}
```

### iOS端的实现

* 声明DraggableNode类，继承于StackNode
* blendView方法则用来接受从JS层面传来的onDrag参数
* build方法返回一个UIView的实例，该UIView实现了UIPanGestureRecognizer，当监听到拖拽手势时通过callJSResponse此方法将该View的位置通知JS层

```objc
#import "DoricStackNode.h"

NS_ASSUME_NONNULL_BEGIN

@interface DoricDraggableNode : DoricStackNode

@property(nonatomic, strong) NSString *onDragFunction;

@end

NS_ASSUME_NONNULL_END
```

```objc
#import "DoricDraggableNode.h"

@implementation DoricDraggableNode
- (UIView *)build {
    UIView *stackView = [super build];
    UIPanGestureRecognizer *gesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(onDrag:)];
    [stackView addGestureRecognizer:gesture];
    return stackView;
}

- (void)onDrag:(UIPanGestureRecognizer *)gesture {
    CGPoint point = [gesture translationInView:self.view];
    CGRect originalFrame = self.view.frame;
    originalFrame.origin.x += point.x;
    originalFrame.origin.y += point.y;
    self.view.frame = originalFrame;
    self.view.doricLayout.marginLeft = originalFrame.origin.x;
    self.view.doricLayout.marginTop = originalFrame.origin.y;
    [gesture setTranslation:CGPointZero inView:self.view];
    [self callJSResponse:_onDragFunction, @(originalFrame.origin.x), @(originalFrame.origin.y), nil];
}

- (void)blendView:(UIView *)view forPropName:(NSString *)name propValue:(id)prop {
    if ([name isEqualToString:@"onDrag"]) {
        _onDragFunction = prop;
    } else {
        [super blendView:view forPropName:name propValue:prop];
    }
}
@end
```

### DoricRegistry类内显式注册DraggableNode

#### Android端
```java
this.registerViewNode(DraggableNode.class);
```

#### iOS端
```objc
[self registerViewNode:DoricDraggableNode.class withName:@"Draggable"];
```