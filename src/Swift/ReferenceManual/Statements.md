# 语句

## 循环语句

### For-In 循环

```swift
for i in 0..<3 {
    print(i)
}
```

#### 步长不为一或倒序

```swift
for i in stride(from: 0, to: 10, by: 2) {
    print(i) // 0 2 4 6 8
}
```

### While 循环

```swift
var i = 0
while i < 3 {
    print(i)
    
    i += 1
}
```

### Repeat-While 循环

```swift
// while第一次判断条件不满足直接不执行
// repeat while即使第一次判断条件不满足也会至少执行一次
var i = 0
repeat {
    print(i)
    
    i += 1
} while i < 3
```

## 分支语句

### if 语句

```swift
func someMethod(x: Int) {
    if x > 1 {
        
    } else if x > 0 {
        
    } else {
        
    }
}
```

```swift
// 可选绑定
if let zero = Int("0") {
    
}
```

```swift
let result = Result<Int, NSError>.success(1)

// case 模式匹配
if case let .success(x) = result {
    print(x)
}


let dualOption: Int?? = 1

if case let x?? = dualOption {
    print(x)
}
```

### guard 语句

```swift
func someMethod(x: Int) {
    guard x > 0 else { return }
    
}
```

```swift
func someMethod() {
    guard let zero = Int("0") else { return }
}
```

### switch 语句

```swift
switch UIDevice.current.userInterfaceIdiom {
case .mac:
    print("mac")
case .phone:
    print("phone")
case .pad:
    print("pad")
default:
    break
}
```

```swift
func someMethod(string: String) {
    if string.hasPrefix("a") {
        print("a")
    } else if string.hasPrefix("b") {
        print("b")
    } else if string.hasPrefix("c") {
        print("c")
    } else {
        print("unknown")
    }
}

// case let where 模式匹配替换if else
func someMethod(string: String) {
    switch string {
    case let string where string.hasPrefix("a"):
        print("a")
    case let string where string.hasPrefix("b"):
        print("b")
    case let string where string.hasPrefix("c"):
        print("c")
    default:
        print("unknown")
    }
}
```

## 带标签的语句

```swift
label: if true {
    while true {
        if true {
            print("inside")
            break label
        }
    }
    // break本应跳出while循环，break label指定了要跳出的标签，最终跳出了if语句
    print("outside") // 将不会被执行
}
```

## 控制转移语句

```swift
while true {
    break
}

for i in 0..<3 {
    if i < 1 {
        continue
    }
    print(i) // 1 2
}

func someMethod() {
    return
}

func makeError() throws {
    throw NSError()
}
```

## defer 语句

```swift
func someMethod() {
    let pointer = UnsafeMutablePointer<Int>.allocate(capacity: 1)
    // defer 推迟到退出当前作用域之前执行
    defer {
        pointer.deallocate()
    }
    
    pointer.initialize(to: 0)
}
```

## do 语句

```swift
do {
    try String(contentsOfFile: "")
} catch let error {
    print(error) // Error Domain=NSCocoaErrorDomain Code=258 "The item couldn’t be opened because the file name “” is invalid." UserInfo={NSFilePath=}
}
```

```swift
// 引入一个新的作用域，分隔代码块的界限，不会损失性能
do {
    print("Hello, world!")
}
```

## 编译器控制语句

### 条件编译代码块

```swift
#if os(iOS) || os(tvOS)
import UIKit
#elseif os(macOS)
import AppKit
#elseif os(watchOS)
import WatchKit
#elseif os(Linux) || os(Windows)
#else
#endif

#if arch(i386) || arch(x86_64)
#elseif arch(arm) || arch(arm64)
#endif

#if swift(>=5)
#endif

#if compiler(>=5)
#endif

#if canImport(SwiftUI)
import SwiftUI
#endif

#if targetEnvironment(simulator)
#elseif targetEnvironment(macCatalyst)
#endif
```

### 行控制语句

```swift
#sourceLocation(file: "name", line: 1)

print(#file, #line) // name 2

#sourceLocation()

print(#file, #line) // 文件名和行号被重置
```

### 编译时诊断语句

```swift
#error("错误")

#warning("警告")
```

## 可用性条件

```swift
if #available(iOS 13.0, *) {
    
}
```
