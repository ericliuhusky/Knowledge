# 词法结构

## 注释

```swift
// 注释
/*
多行注释
*/
```
## 标识符

```swift
let 中文 = "也可用作标识符"
let 😄 = "甚至emoji也可以"
let `class` = "保留关键字做标识符需要加反引号"
```

## 关键字

### 声明关键字

`associatedtype`, `class`, `deinit`, `enum`, `extension`, `fileprivate`, `fun`, `import`, `init`, `inout`, `internal`, `let`, `open`, `operator`, `private`, `precedencegroup`, `protocol`, `public`, `rethrows`, `static`, `struct`, `subscript`, `typealias`, `var`

### 语句关键字

`break`, `case`, `catch`, `continue`, `default`, `defer`, `do`, `else`, `fallthrough`, `for`, `guard`, `if`, `in`, `repeat`, `return`, `throw`, `switch`, `where`, `while`

### 表达式和类型关键字

`Any`, `as`, `catch`, `false`, `is`, `nil`, `rethrows`, `self`, `Self`, `super`, `throw`, `throws`, `true`, `try`

### 模式关键字

`_`

### 以#开头的关键字

`#available`, `#colorLiteral`, `#column`, `#dsohandle`, `#elseif`, `#else`, `#endif`, `#error`, `#fileID`, `#fileLiteral`, `#filePath`, `#file`, `#function`, `#if`, `#imageLiteral`, `#keyPath`, `#line`, `#selector`, `#sourceLocation`, `#warning`

### 仅特定环境保留关键字（在环境外可以用作标识符）

`associativity`, `convenience`, `didSet`, `dynamic`, `final`, `get`, `indirect`, `infix`, `lazy`, `left`, `mutating`, `none`, `nonmutating`, `optional`, `override`, `postfix`, `precedence`, `prefix`, `Protocol`, `required`, `right`, `set`, `some`, `Type`, `unowned`, `weak`, `willSet`

## 字面量

```swift
33 // 整数字面量
3.1415926 // 浮点数字面量
"Hello, world!" // 字符串字面量
true // 布尔值字面量
nil // 空字面量
```

### 整数字面量

```swift
0b11111111 // 二进制整数字面量
0o377 // 八进制整数字面量
0xFF // 十六进制整数字面量
-42 // 负整数字面量
1_000_000 // 以下划线隔开更易读的整数字面量
```

### 浮点数字面量

```swift
1.25e2 // 科学计数法浮点数字面量
1.25e-2
0x1p2 // 十六进制科学计数法浮点数字面量
-42.5 // 负浮点数字面量
-1.000_1 // 以下划线隔开更易读的浮点数字面量
```

### 字符串字面量

```swift
"字符串"
"""
多行字符串
"""

let x = "world"
"Hello, \(x)!"  // 字符串插值

#"\"# // 真实值字符串字面量，显示真实字符而非转义后的字符

"Hello, " + "world!" // 字符串连接（在编译时进行连接）
```

## 运算符
