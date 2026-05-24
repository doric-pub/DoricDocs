---
title: Gesture - 手势控件
---

### 属性

属性 |类型 | 描述
--- | --- | ---
onSingleTap|() => void|单点屏幕时的监听回调
onDoubleTap|() => void|连点屏幕时的监听回调
onLongPress|() => void|长按屏幕时的监听回调
onPinch|(scale: number) => void|双指放大缩小时的监听回调
onPan|(dx: number, dy: number) => void|手指平移时的监听回调
onRotate|(dAngle: number) => void|双指旋转时的监听回调
onSwipe|(orientation: SwipeOrientation) => void|手指滑动方向监听回调，orientation枚举值为`SwipeOrientation.LEFT \| SwipeOrientation.RIGHT \| SwipeOrientation.TOP \| SwipeOrientation.BOTTOM`
onTouchDown|(event: { x: number, y: number }) => void|手指触碰屏幕时的回调
onTouchMove|(event: { x: number, y: number }) => void|手指在屏幕上移动时的回调
onTouchUp|(event: { x: number, y: number }) => void|手指离开屏幕瞬间的回调
onTouchCancel|(event: { x: number, y: number }) => void|手指离开屏幕后的回调

### 用法示例
#### onTouch
```typescript
                    gestureContainer([
                        touchChild
                    ], {
                        onTouchDown: (event: { x: number, y: number }) => {
                            modal(context).toast("onTouchDown x=" + event.x + " y=" + event.y)
                        },
                        onTouchMove: (event: { x: number, y: number }) => {
                            touchChild.x = event.x - 50
                            touchChild.y = event.y - 50
                        },
                        onTouchUp: (event: { x: number, y: number }) => {
                            modal(context).toast("onTouchUp x=" + event.x + " y=" + event.y)
                        },
                        onTouchCancel: (event: { x: number, y: number }) => {
                            modal(context).toast("onTouchCancel x=" + event.x + " y=" + event.y)
                        }
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    }),
```
#### SingleTap、DoubleTap、LongPress
```typescript
                    gestureContainer([], {
                        onSingleTap: () => {
                            modal(context).toast("onSingleTap")
                        },
                        onDoubleTap: () => {
                            modal(context).toast("onDoubleTap")
                        },
                        onLongPress: () => {
                            modal(context).toast("onLongPress")
                        }
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    }),
```

#### Pinch
```typescript
                    gestureContainer([
                        pinchChild
                    ], {
                        onPinch: (scale: number) => {
                            pinchChild.width = 100 * scale
                            pinchChild.height = 100 * scale
                        },
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    }),
```

#### Pan
```typescript
                    gestureContainer([
                        panChild
                    ], {
                        onPan: (dx: number, dy: number) => {
                            panChild.x -= dx
                            panChild.y -= dy
                        },
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    }),
```

#### Rotate
```typescript
                    gestureContainer([
                        rotateChild
                    ], {
                        onRotate: (dAngle: number) => {
                            if (rotateChild.rotation == null) {
                                rotateChild.rotation = 0
                            }
                            rotateChild.rotation += dAngle
                        }
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    })
```

#### Swipe
```typescript
                    gestureContainer([
                    ], {
                        onSwipe: (orientation) => {
                            if (orientation == SwipeOrientation.LEFT) {
                                modal(context).toast("onSwipeLeft")
                            } else if (orientation == SwipeOrientation.RIGHT) {
                                modal(context).toast("onSwipeRight")
                            } else if (orientation == SwipeOrientation.TOP) {
                                modal(context).toast("onSwipeTop")
                            } else if (orientation == SwipeOrientation.BOTTOM) {
                                modal(context).toast("onSwipeBottom")
                            }
                        }
                    }).apply({
                        layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
                        width: 300,
                        height: 300,
                        backgroundColor: Color.BLACK
                    })
```

