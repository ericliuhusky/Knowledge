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

## UITabBarController

```swift
class TabBarController: UITabBarController, UITabBarControllerDelegate {
    init() {
        super.init(nibName: nil, bundle: nil)
        
        viewControllers = ["1", "2", "3"].map { text in
            ViewController(text: text)
        }
        
        delegate = self
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
        print(viewControllers?.firstIndex(of: viewController))
    }
}

class ViewController: UIViewController {
    init(text: String) {
        super.init(nibName: nil, bundle: nil)
        
        let label = UILabel(frame: .init(x: 100, y: 100, width: 100, height: 30))
        label.text = text
        
        view.addSubview(label)
        tabBarItem = UITabBarItem(title: text, image: nil, tag: 0)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

## 在SwiftUI中使用UIKit的App生命周期

```swift
import SwiftUI

@main
struct DemoApp: App {
    @UIApplicationDelegateAdaptor var delegate: AppDelegate
    
    var body: some Scene {
        WindowGroup {
            DemoView()
        }
    }
}

class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        return true
    }
}
```
