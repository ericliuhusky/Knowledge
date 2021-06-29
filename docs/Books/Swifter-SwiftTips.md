# Swifter Swift必备Tips

## 1. 柯里化

```swift
func addTo(_ adder: Int) -> (Int) -> Int {
    return { num in
        adder + num
    }
}

let addToOne = addTo(1)
let addToTwo = addTo(2)

print(addToOne(10)) // 11
print(addToTwo(10)) // 12
```

## 2. Sequence for-in迭代

```swift
struct IntArray: Sequence {
    var array: [Int]
    
    func makeIterator() -> IntArrayIterator {
        return IntArrayIterator(array: array)
    }
}

struct IntArrayIterator: IteratorProtocol {
    var array: [Int]
    var index = 0
    
    mutating func next() -> Int? {
        guard index < array.count else { return nil }
        defer {
            index += 1
        }
        return array[index]
    }
}

let array = IntArray(array: [0, 1, 2, 3])
for item in array {
    print(item)
}
```

## 3. 元组多返回值

```swift
func getColor() -> (R: Int, G: Int, B: Int) {
    return (255, 255, 255)
}

print(getColor()) // (R: 255, G: 255, B: 255)
```

## 4. @autoclosure 自动闭包

```swift
func closure(_ number: @autoclosure () -> Int) -> Int {
    let number = number()
    return number
}

print(closure(3)) // 3
```

## 4. @escaping 逃逸闭包

```swift
import Dispatch

func asyncAfter(seconds: Int, execute: @escaping () -> Void) {
    DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(seconds)) {
        execute()
    }
}

asyncAfter(seconds: 3) {
    print("3秒后执行")
}
```

## 5. 操作符重载

```swift
struct ValueInt {
    let value: Int
    
    static func +(left: ValueInt, right: ValueInt) -> Int {
        left.value + right.value
    }
}

let a = ValueInt(value: 1)
let b = ValueInt(value: 3)

print(a + b) // 4
```

## 6. 函数参数传递

- ### 值类型参数

    #### 不更改原值

    ```swift
    func increased(_ variable: Int) -> Int {
        var variable = variable
        variable += 1
        return variable
    }

    print(increased(0)) // 1
    ```

    #### 更改原值

    ```swift
    func increase(_ variable: inout Int) {
        variable += 1
    }

    var variable = 0

    increase(&variable)

    print(variable) // 1
    ```

- ### 引用类型参数

    #### 不更改原值

    ```swift
    class ReferenceInt {
        var value: Int
        init(_ value: Int) {
            self.value = value
        }
    }

    func increased(_ variable: ReferenceInt) -> ReferenceInt {
        let variable = ReferenceInt(variable.value)
        variable.value += 1
        return variable
    }

    let variable = ReferenceInt(0)

    print(increased(variable).value) // 1
    print(variable.value) // 0
    ```

    #### 更改原值

    ```swift
    func increase(_ variable: ReferenceInt) {
        variable.value += 1
    }


    let variable = ReferenceInt(0)
    increase(variable)
    print(variable.value)
    ```

## 7. 字面量表达协议

```swift
struct ValueInt: ExpressibleByIntegerLiteral {
    var value: Int
    
    init(integerLiteral value: IntegerLiteralType) {
        self.value = value
    }
}

let variable: ValueInt = 3
print(variable.value) // 3
```

## 8. subscript 下标访问

```swift
struct IntArray {
    var array: [Int]

    subscript(index: Int) -> Int {
        get {
            array[index]
        }
        set {
            array[index] = newValue
        }
    }
}

var array = IntArray(array: [0, 1, 2, 3])
print(array[1]) // 1
array[3] = 4
print(array[3]) // 4
```

## 9. typealias 类型别名

```swift
typealias IntArray = Array<Int>


protocol A {
    var a: Int { get }
}

protocol B {
    var b: Int { get }
}

typealias C = A & B

struct D: C {
    var a: Int
    
    var b: Int
    
}
```

## 10. associatedType 相关类型

```swift
protocol ArrayExtension {
    associatedtype T
    
    mutating func appendAndPrint(_ newElement: T)
}

extension Array: ArrayExtension {
    typealias T = Element
    
    mutating func appendAndPrint(_ newElement: Element) {
        print(newElement)
        append(newElement)
    }
}

var array = Array<Int>()
array.appendAndPrint(1) // 1
```

## 11. 可变参数

```swift
func sum(_ number: Int...) -> Int {
    return number.reduce(0, +)
}

print(sum(0, 1, 2, 3)) // 6
```

## 12. 初始化顺序

```swift
class Rectangle {
    var name: String
    init() {
        name = "长方形"
    }
}

class Square: Rectangle {
    var sideLength: Int
    override init() {
        sideLength = 10
        super.init()
        name = "正方形"
    }
}
```

## 13. 可空初始化

```swift
struct PositiveNumberString {
    var value: String
    init?(_ value: Int) {
        guard value > 0 else { return nil }
        self.value = String(value)
    }
}

let str = PositiveNumberString(-1)
print(str as Any) // nil
```

## 14. 函数默认参数

```swift
func printInt(_ value: Int = 0) {
    print(value)
}

printInt() // 0
printInt(1) // 1
```

## 15. ... ..< 区间操作符

```swift
let range = 0..<3
let closedRange = 0...3

print([Int](range)) // [0, 1, 2]
print([Int](closedRange)) // [0, 1, 2, 3]

print(("a"..."z").contains("c")) // true
```

## 16. 元类型

```swift
struct Type {
    static func staticMethod() {
        print("静态方法")
    }
    
    func instanceMethod() {
        print("实例方法")
    }
}

let instance: Type = Type()
instance.instanceMethod() // 实例方法
let type: Type.Type = Type.self
type.staticMethod() // 静态方法
```

## 17. 深拷贝

```swift
protocol Copyable {
    func copy() -> Self
}

class ReferenceInt: Copyable {
    var value: Int
    
    required init(_ value: Int) {
        self.value = value
    }
    
    func copy() -> Self {
        return type(of: self).init(value)
    }

}


let a = ReferenceInt(0)
let b = a.copy()
b.value = 1

print(a.value) // 0
print(b.value) // 1
```

## 18. 属性观察

```swift
struct ValueInt {
    var value: Int {
        willSet {
            print("值即将从\(value)更改为\(newValue)")
        }
        didSet {
            print("值已经从\(oldValue)更改为\(value)")
        }
    }
}

var variable = ValueInt(value: 0)
variable.value = 1 // 值即将从0更改为1 \n 值已经从0更改为1
```

## 19. lazy 懒加载

```swift
struct LazyMan {
    var food: String = {
        print("吃饭")
        return "食物"
    }()
    
    lazy var work: String = {
        print("起床")
        return "工作"
    }()
}

var man = LazyMan() // 吃饭
print(man.work) // 起床 \n 工作
```

## 20. 懒实现序列

```swift
let array = [0, 1, 2, 3]
let result = array.lazy.map { item -> Int in
    print("正在映射\(item)")
    return item + 1
}

for item in result {
    print("映射结果\(item)")
    break
}

// 正在映射0
// 映射结果1
```

```swift
let array = [0, 1, 2, 3]
let result = array.map { item -> Int in
    print("正在映射\(item)")
    return item + 1
}

for item in result {
    print("映射结果\(item)")
    break
}

// 正在映射0
// 正在映射1
// 正在映射2
// 正在映射3
// 映射结果1
```

## 21. Optional Map

```swift
var variable: Int? = 0
let result = variable.map { variable in
    variable + 1
}

print(result as Any) // Optional(1)
```

```swift
var variable: Int? = 0
var result: Int? = nil
if let variable = variable {
    result = variable + 1
}

print(result as Any) // Optional(1)
```

## 22. where 模式匹配

```swift
let model = "iPhone12 mini"

switch model {
case let model where model.hasPrefix("iPhone"):
    print("iPhone")
default:
    break
}
// iPhone


for i in 0..<10 where i < 3 {
    print(i)
}
// 0 \n 1 \n 2
```

## 23. indirect 嵌套enum

```swift
indirect enum LinkedNode {
    case empty
    case node(Int, LinkedNode)
}

let linkedList = LinkedNode.node(0, .node(1, .node(2, .empty)))

print(linkedList) // node(0, node(1, .node(2, .empty)))
```

## 24. 实例方法的其它调用方式

```swift
struct ValueInt {
    let value: Int
    func call(_ way: String) {
        print(self.value, way)
    }
}

let v0 = ValueInt(value: 0)
v0.call("(value:)") // 0 (value:)
let v1 = ValueInt.init(value: 1)
v1.call(".init(value:)") // 1 .init(value:)

ValueInt.call(v0)("ValueInt.call(_ self:)") // 0 ValueInt.call(_ self:)

let call = ValueInt.call
call(v0)("call(_ self:)") // 0 call(_ self:)
```

## 25. 单例模式

```swift
struct Singleton {
    static let shared = Singleton()
    
}
```

## 26. 条件编译

```swift
#if os(iOS) || os(tvOS)
import UIKit
#elseif os(watchOS)
import WatchKit
#elseif os(macOS)
import AppKit
#endif
```

## 27. 注释标记

```swift
// MARK: - 分割线
// TODO: 待办
// FIXME: 待修复
```

## 28. 可选协议

```swift
import Foundation
// objc标记的协议只能被class类实现
@objc protocol OptionalProtocol {
    @objc optional func optionalMethod()
}
```
使用协议扩展来实现可选协议
```swift
protocol OptionalProtocol {
    func optionalMethod()
}

extension OptionalProtocol {
    func optionalMethod() {
        
    }
}
```

## 29. 判断实例类型

```swift
print(type(of: 1)) // Int
print(1 is Int) // true
```

## 30. == === 判断相等

```swift
class ReferenceInt {
    var value: Int
    init(_ value: Int) {
        self.value = value
    }
    
    static func ==(left: ReferenceInt, right: ReferenceInt) -> Bool {
        return left.value == right.value
    }
}

let a = ReferenceInt(0)
let b = ReferenceInt(0)
print(a == b) // true
print(a === b) // false
```

## 31. 格式化字符串

```swift
import Foundation
print(String(format: "%.2f", 3.333333)) // 3.33
```

## 32. OptionSet 操作集合

```swift
struct Options: OptionSet {
    let rawValue: Int
    
    static let left = Options(rawValue: 1)
    static let top = Options(rawValue: 1 << 1)
    static let right = Options(rawValue: 1 << 2)
    static let bottom = Options(rawValue: 1 << 3)
}

var option: Options = .left
print(option) // Options(rawValue: 1)
option = .top
print(option) // Options(rawValue: 2)
option = .right
print(option) // Options(rawValue: 4)
option = .bottom
print(option) // Options(rawValue: 8)
option = [.left, .top]
print(option) // Options(rawValue: 3)
option = [.left, .top, .right, .bottom]
print(option) // Options(rawValue: 15)
```

## 33. enumerate 数组列举

```swift
for (index, item) in (10..<13).enumerated() {
    print(index, item)
}
// 0 10 \n 1 11 \n 2 12
```

## 34. Associated Object扩展存储属性

```swift
import ObjectiveC
// 只能为class类扩展
class IPhone {
    
}

private var key: Void?

extension IPhone {
    var storage: Int? {
        get {
            return objc_getAssociatedObject(self, &key) as? Int
        }
        
        set {
            objc_setAssociatedObject(self, &key, newValue, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }
}

var iPhone = IPhone()
print(iPhone.storage as Any) // nil
iPhone.storage = 128
print(iPhone.storage as Any) // Optional(128)
```

## 35. Lock 锁

```swift
import Foundation

func synchronized(_ lock: AnyObject, execute: () -> Void) {
    objc_sync_enter(lock)
    execute()
    objc_sync_exit(lock)
}

class SafeData {
    var data = 0
    
    func add(_ number: Int) {
        synchronized(self) {
            data += number
        }
    }
}

let safeData = SafeData()
for _ in 0..<10000 {
    DispatchQueue.global().async {
        safeData.add(1)
    }
}

print(safeData.data) // 10000
```

## 36. 编译符号

```swift
#file // 符号所在文件路径
#line // 符号所在行号
#column // 符号所在列
#function // 符号所在方法名
```

## 37. 溢出操作符

```swift
var max = UInt.max
print(String(max, radix: 2))
// 1111111111111111111111111111111111111111111111111111111111111111
max = max &+ 1
print(String(max, radix: 2)) // 0
```

## 38. 属性访问控制

```swift
private
fileprivate
internal
public
open
```

## 39. Swift解释执行

```swift
#!/usr/bin/env swift

print("hello")
```

## 40. swiftc编译

```shell
swiftc main.swift
```

## 41. 自定义打印输出

```swift
struct ValueInt: CustomStringConvertible {
    let value: Int
    
    var description: String {
        return "这是一个自定义的描述\(value)"
    }
}

print(ValueInt(value: 1)) // 这是一个自定义的描述1
```

## 42. 断言

```swift
// 断言只在Debug模式下有效
assert(1 == 1)
```

## 43. 错误退出

```swift
fatalError()
```
