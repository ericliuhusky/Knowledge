# 设计模式

## 1. 单例模式

```swift
class Singleton {
    static let shared = Singleton()
}
```

## 2. 代理模式

## 3. 观察者模式

```swift
//  可观察对象
class Subject {
    var state = 0
    
    //  观察者
    private var observers = [Observer]()
    
    //  添加
    func appendObserver(_ observer: Observer) {
        observers.append(observer)
    }
    
    //  删除
    func removeObserver(_ observer: Observer) {
        if let index = observers.firstIndex(where: { $0 === observer} ) {
            observers.remove(at: index)
        }
    }
    
    //  通知观察者更新
    func notify() {
        observers.forEach { (observer) in
            observer.update(subject: self)
        }
    }
}

//  观察者协议
//  class仅类协议，才可以判断实例对象===地址相等
protocol Observer: class {
    func update(subject: Subject)
}

//  观察者A
class ObserverA: Observer {
    func update(subject: Subject) {
        print("observerA", subject.state)
    }
}

//  观察者B
class ObserverB: Observer {
    func update(subject: Subject) {
        print("observerB", subject.state)
    }
}

let subject = Subject()
let observerA = ObserverA()
let observerB = ObserverB()

subject.appendObserver(observerA)
subject.appendObserver(observerB)

subject.state = 1
subject.notify()

subject.removeObserver(observerA)
subject.state = 2
subject.notify()

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
