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
