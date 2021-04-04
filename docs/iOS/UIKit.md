# UIKit

## 1. UIView 和 CALayer

- UIView继承UIResponder，可以响应事件；
- CALayer用来绘制内容；
- UIView设置表现和位置时，内部实际是对所持有的layer的更改

## 2. Frame 和 Bounds

- 在width和height上frame和bounds没有什么区别
- frame设置控件在父控件坐标系中的位置；bounds更改控件自身的坐标系
- 默认坐标系是左上角为(0,0)，向右向下(x,y)变大，更改bounds的(x,y)可以改变坐标系左上角为(x,y)，
  子控件自然随着控件自身坐标系的更改而改动位置
