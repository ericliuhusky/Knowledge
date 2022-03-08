# 声明

## 顶级代码

```swift
print("Hello, world!")
```

## 代码块

```swift
do {
    
}
```

## 导入声明

```swift
import Foundation

import Foundation.NSObject

import struct Foundation.CGFloat

import class Foundation.NSObject
```

## 常量声明

```swift
let zero = 0

let zero: Int = 0
```

## 变量声明

### 存储变量和存储属性

```swift
var x = 1

var x: Int = 1
```

### 计算变量和计算属性

```swift
var number = 1

var opposite: Int {
    get {
        -number
    }
    
    set {
        number = -newValue
    }
    
//    set(newNumber) {
//        number = -newNumber
//    }
}

print(opposite) // -1
opposite = 3
print(number) // -3
```

```swift
var bit = 8

var byte: Int {
    bit / 8
    
//    get {
//        bit / 8
//    }
}
```

### 存储变量观察器和存储属性观察器

```swift
var x = 0 {
    willSet {
        print("\(x) will set to \(newValue)")
    }
    
    didSet {
        print("\(oldValue) did set to \(x)")
    }
}

x = 1
// 0 will set to 1
// 0 did set to 1
```

### 类型的属性

```swift
struct SomeStructure {
    static var x = 0
    
    static var y: Int {
        1
    }
}

class SomeClass {
    static var x = 0
    
    static var y: Int {
        1
    }
}
```

```swift
class Super {
    class var x: Int {
        0
    }
}

class Child: Super {
    override class var x: Int {
        1
    }
}
```

## 类型别名声明

```swift
typealias Dict = Dictionary
typealias StringDict<Value> = Dictionary<String, Value>

let dict1: Dict<String, Int> = [:]
let dict2: StringDict<Int> = [:]
```

## 函数声明

### 参数名

```swift
func f(a: Int, b: Int) -> Int {
    a + b
}

f(a: 0, b: 1)

func f(_ a: Int, x b: Int) -> Int {
    a + b
}

f(0, x: 1)
```

### 输入输出参数

调用函数时，复制参数；在函数中，副本被修改；函数返回时，副本被赋值给原参数

```swift
var _x = 0
var x: Int {
    get {
        print("copy in")
        return _x
    }

    set {
        _x = newValue
        print("copy out")
    }
}

func f(x: inout Int) {
    x = 1
    print("copy is modified")
    return
}

f(x: &x)
// copy in
// copy is modified
// copy out
```

```swift
var x = 0

// 捕获输入输出参数，不改变它
func f(x: inout Int) {
    DispatchQueue.global().async { [x] in
        print(x + 1)
    }
}

// 捕获输入输出参数，并改变它
func f(x: inout Int) {
    var local = x
    defer {
        x = local
    }

    let queue = DispatchQueue(label: "serial")
    queue.async {
        local += 1
    }
    queue.sync {}
}
```

### 特殊参数

```swift
func sum(_ number: Int...) -> Int { // 可变参数
    return number.reduce(0, +)
}

print(sum(0, 1, 2, 3)) // 6


func printInt(_ value: Int = 0) {
    print(value)
}

printInt() // 0
printInt(1) // 1
```

### 特殊方法

```swift
struct SomeStructure {
    var x = 0

    mutating func modify() {
        x += 1
    }
}


class Super {
    func method() {

    }
}

class Child: Super {
    override func method() {

    }
}


class SomeClass {
    // Cannot override static method
    static func typeMethod1() {
        
    }
    
    // Class method overrides a 'final' class method
    final class func typeMethod2() {
        
    }
    
    // 允许子类重写
    class func typeMethod3() {
        
    }
}
```

### 特殊名称方法

```swift
struct AddTo {
    var adder: Int
    
    func callAsFunction(_ num: Int) -> Int {
        adder + num
    }
}


let addToOne = AddTo(adder: 1)
let addToTwo = AddTo(adder: 2)

print(addToOne(10)) // 11
print(addToTwo(10)) // 12
```

### 抛出异常的函数和方法

```swift
func makeError() throws -> Int {
    throw NSError()
}
```

### 重抛异常的函数和方法

```swift
func rethrowError(block: () throws -> Void) rethrows {
    try block()
}

// 函数将闭包内的异常再次抛出以交由外部处理
try? rethrowError {
    throw NSError()
}
```

### 异步函数和方法

```swift
func hello() async -> Int {
    try! await Task.sleep(nanoseconds: 1000_000_000)
    return 1
}

let n = await hello()
```

### 永不返回的函数

```swift
func crash() -> Never {
    fatalError("bad apple")
}
```

## 枚举声明

```swift
enum SomeEnumeration: Equatable {
    case aCase
    case withAssociatedValue(Int)
}


// 数值类型枚举默认rawValue值自动递增
enum RawIntEnumeration: Int {
    case aCase = 10
    case bCase // rawValue 11
}

// 字符串类型枚举默认rawValue值与标识符相同
enum RawStringEnumeration: String {
    case aCase // rawValue "aCase"
    case bCase // rawValue "bCase"
}
```

```swift
indirect enum LinkedNode {
    case empty
    case node(Int, LinkedNode)
}

let linkedList = LinkedNode.node(0, .node(1, .node(2, .empty)))

print(linkedList) // node(0, node(1, .node(2, .empty)))
```

## 结构体声明

```swift
struct SomeStructure {
    
}
```

## 类声明

```swift
class SomeClass {
    
}
```

## 参与者声明

```swift
actor SomeActor {
    
}
```

## 协议声明

```swift
protocol SomeProtocol {
    associatedtype SomeType
    
    var x: SomeType { get set}
    
    func method()
    subscript() -> Int { get set }
}
```

```swift
// 仅类可以实现的协议
protocol ClassOnlyProtocol: AnyObject {
    
}
```

## 初始化器声明

```swift
class Super {
    var father: Int
    
    // designated initializer
    init(father: Int) {
        self.father = father
    }
}


class Child: Super {
    var child: Int
    
    override init(father: Int) {
        child = 0
        super.init(father: 0)
        self.father = 1
    }
    
    // designated initializer
    init(child: Int) throws {
        self.child = child
        super.init(father: 0)
        father = 1
    }
    
    // convenience initializer
    convenience init() throws {
        try self.init(child: 1)
    }
}
```

```swift
struct PositiveNumberString {
    var value: String

    // 可失败初始化器
    init?(_ value: Int) {
        guard value > 0 else { return nil }
        self.value = String(value)
    }
}

if let str = PositiveNumberString(-1) {

}
```

## 反初始化器声明

```swift
deinit {
    
}
```

## 扩展声明

```swift
protocol SomeProtocol {
    
}

struct SomeStructure {
    
}

extension SomeStructure: SomeProtocol {
    
}
```

```swift
protocol SomeProtocol {
    func method()
}

extension SomeProtocol {
    func method() {
        
    }
}

struct SomeStructure {
    
}

extension SomeStructure: SomeProtocol {
    
}
```

```swift
protocol Serializable {
    func serialize()
}

protocol SerializableInArray { }
extension Int: SerializableInArray { }
extension String: SerializableInArray { }

extension Array: Serializable where Element: SerializableInArray {
    func serialize() {
        
    }
}
```

## 下标声明

```swift
struct List {
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

print(List(array: [0, 1, 2])[0]) // 0
```

## 运算符声明

```swift
postfix operator ++
prefix operator ++
infix operator ++

extension Int {
    static postfix func ++(i: inout Int) {
        i += 1
    }
    
    static prefix func ++(i: inout Int) {
        i += 1
    }
    
    static func ++(left: Int, right: Int) -> Int {
        left + right
    }
}

var i = 0
i++
++i
print(i) // 2
print(1 ++ i) // 3
```

## 优先级组声明

```swift
precedencegroup 优先级组名称{
    higherThan: 较低优先级组的名称
    lowerThan: 较高优先级组的名称
    associativity: 结合性
    assignment: 赋值性
}
```

## 声明修饰符

`class` 修饰符表明是类自身的成员，而不是类实例的成员

`dynamic` 修饰由Objective-C Runtime动态派发的成员

`final` 限制类被继承，限制类成员被重写

`lazy` 修饰的属性第一次被访问时，计算和存储一次

`optional` 修饰@objc协议的可选成员

`required` 修饰的初始化器子类必须实现

`static` 修饰类型成员，而不是类实例成员，且不允许子类重写

`unowned` 无主引用

`weak` 弱引用

### 访问控制级别

```swift
private
fileprivate
internal
public
open
```
