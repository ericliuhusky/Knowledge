# Swift

## 1. copy

```swift
class A: NSCopying {
    var a = 1
    func copy(with zone: NSZone? = nil) -> Any {
        let cp = A()
        cp.a = a
        return cp
    }
}

let a = A()
let cp = a.copy() as! A

a.a = 2
print(a.a, cp.a)
```

## 2. mutating

```swift
struct A {
    var a = 1
    
    mutating func changeA() {
        a = 2
    }
}

var a = A()
a.changeA()
print(a.a)
```

## 3. 柯里化

```swift
func addTo(_ x: Int) -> (Int) -> Int {
    return { y in
        return x + y
    }
}

let addTo3 = addTo(3)
addTo3(4)
addTo3(5)
```

## 4. 常用高阶函数

```swift
//map映射
let mapResult = [0,1,2,3].map { (i) -> String in
    return "\(i)"
}
print(mapResult)//["0", "1", "2", "3"]


//compactMap丢弃nil映射
let compactMapResult = ["0","@","1","#","2","3"].compactMap { (s) -> Int? in
    return Int(s)
}
print(compactMapResult)//[0, 1, 2, 3]


//filter过滤器
let filterResult = [0,1,2,3].filter { (i) -> Bool in
    return i % 2 == 0
}
print(filterResult)//[0, 2]


//reduce合并
let reduceResult = [0,1,2,3].reduce(0) { (re, i) -> Int in
    return re + i
}
print(reduceResult)//6
```

## 5. defer

延时执行，会在其所在作用域内所有语句执行完毕再执行
可以使得数据库连接、文件连接等关闭语句不一定非要写到作用域尾部，可以使用defer关键字和建立连接写到一起

```swift
func f() {
    defer {
        print(2)
    }
    print(1)
}

f()//   1\n 2\n
```

## 6. associatedtype

协议的泛型

```swift
protocol P {
    associatedtype A
    var p: A { get set }
    func changeP() -> A
}

class C1: P {
    typealias A = Int
    
    var p: Int = 1
    
    func changeP() -> Int {
        p = 2
        return p
    }
}

class C2: P {
    typealias A = String
    
    var p: String = "a"
    
    func changeP() -> String {
        p = "b"
        return p
    }
}

let c1 = C1()
c1.changeP()
let c2 = C2()
c2.changeP()
```

## 7. final

限制继承和重写

```swift
//final限制继承
final class FinalClass {

}
//class SubClass: FinalClass {}  //编译错误，无法继承final class
```

## 8. 访问控制

- open
- public
- internal
- file-private
- private

1. open 在其它模块中可以访问和重写
2. public 在其它模块中可以访问，但不可以重写
3. internal 默认，在模块内部的多个文件内可以访问和重写
4. file-private 在文件内部可以访问
5. private 在类或结构体的内部可以访问

## 9. try! try?

```swift
//try!  try?
func devide(_ a: Double, _ b: Double) throws -> Double {
    enum DevideError: Error {
        case ZeroError
    }
    guard b != Double(0) else {
        throw DevideError.ZeroError
    }
    return a / b
}
print(try? devide(2, 1))//Optional(2.0)
//print(try! devide(2, 0))   //Fatal error崩溃退出
```

## 10. @autoclosure

```swift
//autoclosure把传进来的参数自动加上个闭包
func logIfTrue(_ predict: @autoclosure () -> Bool) {
    if predict() {
        print("True")
    }
}
logIfTrue(2 > 1)
```

## 11. @escaping

```swift
import Foundation

//  逃逸闭包，在闭包所在的函数体执行完毕之后执行的闭包
func delay(callback: @escaping (Timer) -> Void) {
    Timer(timeInterval: 1, repeats: false, block: callback).fire()
}

delay { _ in
    print("escaping after 1 second")
}
```

## 12. @discardableResult

```swift
//在函数前加上@discardableResult，即使返回值没有被使用，编译器也不会提示
@discardableResult
func discardResult() -> Int {
    return 1
}
discardResult()
```

## 13. 枚举关联值

```swift
enum Person {
    case man(name:String)
    case woman(name: String)
}

func whatName(_ person: Person) {
    switch person {
    case let .man(name: name):
        print("man", name)
    case let .woman(name: name):
        print("woman", name)
    }
}

whatName(.man(name: "1")) // man 1
whatName(.woman(name: "2")) // woman 2
```

## 14. 枚举封装

```swift
enum Week {
    case Monday
    case Tuesday
    case Whitch(Int)
    func printDay() {
        switch self {
        case .Monday:
            print(1)
        case .Tuesday:
            print(2)
        case .Whitch(let i):
            print(i)
        }
    }
}
Week.Monday.printDay()
Week.Tuesday.printDay()
Week.Whitch(1).printDay()
```

## 15. 操作列表

```swift
//[.option1, .option2]
enum Option {
    case option1
    case option2
}
typealias Options = [Option]
func setOptions(_ options: Options) {
    struct ParsedOptions {
        var option1 = false
        var option2 = false
        init(_ options: Options) {
            for op in options {
                switch op {
                case .option1:
                    option1 = true
                case .option2:
                    option2 = true
                }
            }
        }
    }
    print(ParsedOptions(options))
}
setOptions([.option1, .option2])
```

## 16. ??

```swift
//?? Optional默认值
let defaultNilValue = Int("@") ?? 0
print(defaultNilValue)
```

## 17. @propertyWrapper

```swift
//  用属性包装器来包裹
@propertyWrapper
struct AddOne {
    private var x: Int
    
    init() {
        x = 0
    }
    
    var wrappedValue: Int {
        get {
            x + 1
        }
        
        set {
            x = newValue
        }
    }
}

//  属性包装器不能写在模块顶层
struct Test {
    @AddOne var addOne: Int
}
var test = Test()
print(test.addOne) // 1
test.addOne = 1
print(test.addOne) // 2
```

## 18. keyPath

```swift
struct A {
    struct B {
        struct C {
            let value: String = "c"
        }
        let value: C = C()
    }
    let value: B = B()
    var c: String {
        get {
            self[keyPath: \.value.value.value]
        }
    }
    func keyPath(_ keyPath: KeyPath<A, String>) -> String {
        return self[keyPath: keyPath]
    }
}

let a = A()
a.value.value.value
let keyPath = \A.value.value.value
a[keyPath: keyPath]
a.keyPath(\.value.value.value)
a.c
```

## 19. 元素为值类型和引用类型的数组更改的区别

```swift
// 元素为值类型的数组只可以使用index更改数组

struct Value {
    var property = 0
}

var valueArray: [Value] = .init(repeating: .init(), count: 3)

for index in 0..<valueArray.count {
    valueArray[index].property += 1
}

dump(valueArray)
```

```swift
// 元素为引用类型的数组既可以使用index更改数组，又可以使用for-in循环更改数组
class Reference {
    var property = 0
}

// 引用类型元素不可以使用Array(repeating:count:)来循环创建数组，否则创建出来的数组都是同一个引用
//var referenceArray: [Reference] = .init(repeating: .init(), count: 3)
var referenceArray: [Reference] = .init(AnyIterator(Reference.init).prefix(3))

for reference in referenceArray {
    reference.property += 1
}

for index in 0..<referenceArray.count {
    referenceArray[index].property += 1
}

dump(referenceArray)
```
