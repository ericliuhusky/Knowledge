# 设计模式

## 1. 单例模式

```swift
class Singleton {
    static let shared = Singleton()
}
```

## 2. 代理模式

```swift
//代理模式

//A的代理协议
protocol ADelegate {
    //回调
    func callBack(string: String)
}

//A类
class A {
    //A的代理
    var delegate: ADelegate?
    //执行A的函数
    func goBack() {
        if let delegate = delegate {
            //代理回调
            delegate.callBack(string: "123")
        }
    }
}

//B类是A的代理实现
class B: ADelegate {
    init() {
        let a = A()
        //把B类对象作为a对象的代理
        a.delegate = self
        a.goBack()
    }

    //回调执行
    func callBack(string: String) {
        print(string)
    }
}
//B构造执行init
B()
```

## 3. 观察者模式

[观察者模式](../CS/DesignPatterns.md#_1-观察者模式)

Key-Value Observing

```swift
import Foundation

class Subject: NSObject {
    @objc dynamic var state = 0
}

class Observer: NSObject {
    override func observeValue(forKeyPath keyPath: String?,
                               of object: Any?,
                               change: [NSKeyValueChangeKey : Any]?,
                               context: UnsafeMutableRawPointer?) {
        print(change?[.newKey] as Any)
    }
}

let subject = Subject()
let observer = Observer()
subject.addObserver(observer, forKeyPath: "state", options: .new, context: nil)
subject.state = 1
// print: Optional(1)
```

Notification
```swift
import Foundation

let name = Notification.Name.init("event")
class ObjectA {}
class ObjectB {}

let objectA = ObjectA()
let objectB = ObjectB()

// NotificationCenter实际上是观察者模式中的被观察对象
let center = NotificationCenter.default

center.addObserver(forName: name, object: nil, queue: .main) { (notification) in
    print("我接收所有对象的通知", "发送至\(notification.object ?? "所有对象")")
}

center.addObserver(forName: name, object: objectA, queue: .main) { (notification) in
    print("我只接收A的通知", "发送至\(notification.object ?? "所有对象")")
}

center.post(name: name, object: nil)
center.post(name: name, object: objectA)
center.post(name: name, object: objectB)
// print: 我接收所有对象的通知 发送至所有对象
//        我接收所有对象的通知 发送至ObjectA
//        我只接收A的通知 发送至ObjectA
//        我接收所有对象的通知 发送至ObjectB
```

## 4. 工厂模式

```swift
//  工厂
class Factory {
    //  产品类型
    enum ProductType {
        case ProductA
        case ProductB
    }
    //  制造
    func make(type: ProductType) -> Product {
        switch type {
        case .ProductA:
            return ProductA()
        case .ProductB:
            return ProductB()
        }
    }
}

//  产品协议
protocol Product {
    //  产品说明书
    func instructions()
}

//  产品A
class ProductA: Product {
    func instructions() {
        print("product A")
    }
}

//  产品B
class ProductB: Product {
    func instructions() {
        print("product B")
    }
}

let factory = Factory()
factory.make(type: .ProductA).instructions()
factory.make(type: .ProductB).instructions()
```

## 5. 装饰器模式

```swift
//  礼物
protocol Gift {
    //  惊喜
    func surprise()
}

//  玩具车
class ToyCar: Gift {
    func surprise() {
        print("a toy car")
    }
}

//  装饰器
class Decorator: Gift {
    private var decorated: Gift
    
    init(_ gift: Gift) {
        decorated = gift
    }
    
    func surprise() {
        decorated.surprise()
    }
}

//  礼物盒
class GiftBox: Decorator {
    override func surprise() {
        super.surprise()
        print("decorated with a gift box")
    }
}

GiftBox(ToyCar()).surprise()
```

## 6. 迭代器模式

```swift
protocol _Sequence {
    associatedtype Element
    associatedtype Iterator

    func makeIterator() -> Self.Iterator
}

protocol _IteratorProtocal {
    associatedtype Element

    mutating func next() -> Self.Element?
}

struct _Array<Element>: _Sequence {
    typealias Element = Element
    typealias Iterator = _Iterator<Self>

    let value: [Element]

    func makeIterator() -> Self.Iterator {
        return _Iterator<Self>(value: value)
    }
}


struct _Iterator<Elements>: _IteratorProtocal where Elements: _Sequence {
    typealias Element = Elements.Element

    let value: [Element]
    var index: Int = 0

    mutating func next() -> Elements.Element? {
        guard index < value.count else { return nil }
        defer {
            index += 1
        }
        return value[index]
    }
}



var iter = _Array<Int>(value: [1, 2, 3, 4, 5]).makeIterator()
//var iter = _Array<String>(value: ["a","b","c","d","e"]).makeIterator()
while let item = iter.next() {
    print(item)
}
```
