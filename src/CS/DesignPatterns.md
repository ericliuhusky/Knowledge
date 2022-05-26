# 设计模式

## 1. 观察者模式

```swift
class Subject {
    var state = 0

    var observers = [Observer]()

    func append(observer: Observer) {
        observers.append(observer)
    }

    func remove(observer: Observer) {
        observers.removeAll(where: { $0 === observer })
    }


    func notify() {
        observers.forEach({ $0.update(subject: self)} )
    }
}


protocol Observer: class {
    func update(subject: Subject)
}


class ObserverA: Observer {
    func update(subject: Subject) {
        print("A", subject.state)
    }
}

class ObserverB: Observer {
    func update(subject: Subject) {
        print("B", subject.state)
    }
}

let subject = Subject()
let observerA = ObserverA()
let observerB = ObserverB()

subject.append(observer: observerA)
subject.append(observer: observerB)

subject.state = 1
subject.notify()
// print: A 1
//        B 1
subject.remove(observer: observerA)
subject.state = 2
subject.notify()
// print: B 2
```
