# KVO

## 原理模拟

实现观察者模式，hook setter方法，调用setter的时候通知观察者  
（属性需要标记为dynamic）

```swift
class KVO: NSObject {
    var observers: [String: [KVO]] = [:]
    
    func addObserver(_ observer: KVO, forKey key: String) {
        observers[key, default: []].append(observer)
        
        let setterSelector = Selector("set\(key.capitalized):")
        let oldImp = {
            let method = class_getInstanceMethod(Self.self, setterSelector)!
            let imp = method_getImplementation(method)
            return unsafeBitCast(imp, to: (@convention(c) (Any, Selector, Any) -> Void).self)
        }()
        
        let newSetter: @convention(block) (Any, Any) -> Void = { [weak self] obj, newValue in
            oldImp(obj, setterSelector, newValue)
            
            self?.observers[key]?.forEach { observer in
                observer.observeValue(forKey: key, of: self)
            }
        }
        
        class_replaceMethod(Self.self, setterSelector, imp_implementationWithBlock(newSetter), nil)
    }
    
    func observeValue(forKey key: String, of object: Any?) {}
}
```

## Swift解决方案

语言层面属性观察器

```swift
struct A {
    var a = 0 {
        willSet {
            print("will be", newValue)
        }
        
        didSet {
            print("was", oldValue)
        }
    }
}
```
