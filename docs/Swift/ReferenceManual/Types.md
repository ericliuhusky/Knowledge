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
