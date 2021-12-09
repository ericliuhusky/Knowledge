# 类型

命名类型和复合类型

命名类型包含内置类型和自定义类型

复合类型包含函数类型和元组类型

## 类型标注

```swift
let x: Int = 1 // 显式指定变量类型
```

## 类型标识符

类型标识符指代命名类型或命名类型和复合类型的别名

```swift
Int // Int指代Int类型
typealias Point = (Int, Int) // Point指代(Int, Int)类型的别名
```

## 元组类型

```swift
let point: (Int, Int) = (3, 3)
point.0
point.1

let point: (x: Int, y: Int) = (3, 3)
point.x // 命名元组中的元素，用名称来指代元素
point.y

func getPosition() -> (Int, Int) {
    (3, 3) // 函数多返回值
}
let pos = getPosition()
let (x, y) = getPosition()

Void // 空元组 typealias Void = ()
```

## 函数类型

函数类型表示函数、方法或闭包的类型

```swift
let closure: (Int) -> Void
let closure: (_ x: Int) -> Void
```

```swift
func sum(_ number: Int...) -> Int { // 可变参数
    return number.reduce(0, +)
}

print(sum(0, 1, 2, 3)) // 6
```

```swift
func increase(_ variable: inout Int) { // 输入输出参数
    variable += 1
}

var variable = 0

increase(&variable)

print(variable) // 1
```

```swift
func addTo(_ adder: Int) -> (Int) -> Int { // 返回值为函数类型
    return { num in
        adder + num
    }
}

let addToOne = addTo(1)
let addToTwo = addTo(2)

print(addToOne(10)) // 11
print(addToTwo(10)) // 12
```

```swift
func makeError() throws -> Int { // 抛出异常
    0
}

try makeError()
```

## 数组类型

```swift
let array: [Int] = []

let array: Array<Int> = []

let array = [Int]()
```

## 字典类型

```swift
let dictionary: [String: String] = [:]

let dictionary: Dictionary<String, String> = [:]

let dictionary = [String: String]()
```

## 可选类型

```swift
let option: Int? = nil

let option: Optional<Int> = nil

let option = Int?(nil)
```

## 隐式展开可选类型

```swift
let option: Int! = nil
let unwrapped: Int = option // Fatal error: Unexpectedly found nil while implicitly unwrapping an Optional value
```

## 协议组合类型

```swift
typealias Codable = Decodable & Encodable
```

## 不透明类型

不透明类型可以理解为反向范型，范型是由调用者来决定具体类型，不透明类型是由实现来决定具体类型

不透明类型抛弃了协议的动态性，编译时就确定其具体类型

```swift
protocol View {
    associatedtype Body
    var body: Body { get }
}

struct AnyView<V>: View {
    typealias Body = V
    
    let view: V
    
    var body: Body {
        view
    }
}

func draw() -> some View {
    AnyView(view: "Hello, world!")
}
```

## 元类型

```swift
let x: Int = 1

let type: Int.Type = Int.self
```
