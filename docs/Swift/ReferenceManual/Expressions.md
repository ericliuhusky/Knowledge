# 表达式

## 前缀表达式

### 输入输出表达式

```swift
func increase(_ variable: inout Int) {
    variable += 1
}

var variable = 0

increase(&variable) // 输入输出表达式

print(variable) // 1
```

### try 运算符

```swift
func makeError() throws -> Int {
    throw NSError()
}

func getResult() throws -> Int {
    try makeError()
}

let result: Int? = try? makeError() // nil

let result: Int = try! makeError() // EXC_BAD_INSTRUCTION
```

### await 运算符

```swift
func hello() async -> Int {
    await Task.sleep(1_000_000_000)
    return 1
}

Task {
    let n = await hello()
}
```

## 二元表达式

### 赋值表达式

```swift
let x = 1

let (a, b) = (3, 3)
```

### 条件运算符

```swift
let bool = [0, 1].randomElement()! == 1 ? true : false
```

### 类型转换运算符

```swift
let string = NSString(string: "abc")

let object = string as NSObject // 向上转换
let str = object as? NSString // 向下转换

let num = object as? NSNumber // nil
let num = object as! NSNumber // signal SIGABRT
```

```swift
let string = "String"
let nsString = NSString(string: "NSString")

let nsStr: NSString = string as NSString // Swift标准库类型与Foundation基础库类型的桥接
let str: String = nsString as String

let nsStr: NSString = NSString(string: string)
let str: String = String(nsString)
```

## 基本表达式

### 字面量表达式

```swift
#file
#filePath
#fileID
#line
#column
#function
#dsohandle
```

```swift
[0, 1, 2, 3]

["a": 1, "b": 2]
```
