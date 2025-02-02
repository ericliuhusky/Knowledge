# 设计模式

## 1. 单例模式

```swift
class Singleton {
    static let shared = Singleton()
}
```

## 2. 代理模式

```swift
protocol ADelegate: AnyObject {
    func didTap()
}

class A {
    weak var delegate: ADelegate?
    
    func tap() {
        delegate?.didTap()
    }
}

class B: ADelegate {
    init() {
        let a = A()
        a.delegate = self
        a.tap()
    }
    
    func didTap() {
        print("tap")
    }
}

B()
```

### 多代理

```swift
class M: ADelegate {
    var delegates = [ADelegate]()
    
    init() {
        let a = A()
        delegates.append(C())
        delegates.append(D())
        a.delegate = self
        a.tap()
    }
    
    func didTap() {
        delegates.forEach { delegate in
            delegate.didTap()
        }
    }
}

class C: ADelegate {
    func didTap() {
        print("tap c")
    }
}

class D: ADelegate {
    func didTap() {
        print("tap d")
    }
}

M()
```

## 3. 观察者模式

[观察者模式](../CS/DesignPatterns.md#_1-观察者模式)

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
