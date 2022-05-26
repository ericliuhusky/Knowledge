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

### self表达式

```swift
struct SomeStruct {
    func instanceMethod() {
        // 在实例方法中self指代当前实例
        self.instanceMethod()
    }
    
    static func staticMethod() {
        // 在静态方法中self指代当前类型，与Self相同
        self.staticMethod()
        Self.staticMethod()
    }
}
```

```swift
struct SomeStruct {
    var property: Int
    
    init(property: Int) {
        self.property = property
    }

    init() {
        self.init(property: 1)
    }
}
```

### super表达式

```swift
class Super {
    init() {
        
    }
}

class Child: Super {
    override init() {
        super.init()
    }
}
```

### 闭包表达式

```swift
func closure(block: (Int, Int) -> Int) {
    block(1, 2)
}

closure { (x, y) -> Int in
    return x + y
}

closure { x, y in
    x + y
}

closure {
    $0 + $1
}
```

#### 捕获列表

```swift
var a = 0
var b = 0

let closure = { [a] in
    print(a, b)
}

a = 1
b = 1

closure() // 0 1
```

```swift
class ReferenceInt {
    var value = 0
}

let a = ReferenceInt()
let b = ReferenceInt()

let closure = { [a] in
    print(a.value, b.value)
}

a.value = 1
b.value = 1

closure() // 1 1
```

```swift
class Strong {
    var closure: () -> Void = {}
    
    init() {
        closure = { // [self] in
            print(self.closure)
        }
    }
    
    deinit {
        print(self)
    }
}

class Weak {
    var closure: () -> Void = {}
    
    init() {
        closure = { [weak self] in
            print(self?.closure)
        }
    }
    
    deinit {
        print(self)
    }
}

var a: Strong? = Strong()
var b: Weak? = Weak()

a = nil
b = nil // 只有Weak被释放了
```

### 隐式成员表达式

```swift
let zero = Int.zero

let zero: Int = .zero
```

### 括号表达式

```swift
extension String {
    var firstLetterUppercased: String {
        // 使用括号更改默认优先级的符号运算顺序
        (first?.uppercased() ?? "") + dropFirst()
    }
}
```

### 元组表达式

```swift
(3, 3)

(x: 3, y: 3)
```

### 通配符表达式

```swift
let (x, _) = (3, 3)


func closure(block: (Int, Int) -> Void) -> Int {
    1
}

_ = closure { x, _ in
    
}
```

### Key-Path表达式

```swift
"Hello, world!"[keyPath: \String.count]
```

```swift
var index = 0
let path = \[Int].[index]

print([0, 1, 2][keyPath: path]) // 0
index += 1
print([0, 1, 2][keyPath: path]) // 0
```

```swift
struct Task {
    var done: Bool
}

let todoList = [
    Task(done: true),
    Task(done: false)
]

let doneTasks = todoList.filter(\.done)
```

### Selector表达式

```swift
class SomeClass {
    @objc let property = 0
    
    @objc func method() {
        
    }
}

let selectorForProperty = #selector(getter: SomeClass.property)
let selectorForMethod = #selector(SomeClass.method)
```

### Key-Path字符串表达式

```swift
class SomeClass: NSObject {
    @objc let property = 0
}

let keyPathString = #keyPath(SomeClass.property) // "property"
let value = SomeClass().value(forKey: keyPathString)
```

## 后缀表达式

### 函数调用表达式

```swift
func someFunction(_ x: Int) {

}

func someFunction(x: Int) {

}

someFunction(0)
someFunction(x: 1)
```

```swift
func someFunction(completion: () -> Void) {

}

someFunction(completion: {

})

someFunction() {

}

someFunction {

}
```

```swift
func someFunction(x: Int, success: () -> Void, failure: () -> Void) {

}

someFunction(x: 1, success: {

}, failure: {

})

someFunction(x: 1) {

} failure: {

}
```

#### 隐式转换为指针类型

```swift
var a = 0

func implicit(pointer: UnsafePointer<Int>) {
    
}

withUnsafePointer(to: &a) { pointer in
    
}

implicit(pointer: &a) // inout输入输出参数隐式转换为UnsafePointer或UnsafeMutablePointer指针类型
```

### 初始化器表达式

```swift
let zero = Int()
let zero = Int.init()

let metaType = Int.self
let zero = metaType.init()
```

```swift
let stringArray = [0, 1, 2].map(String.init)
let stringArray = [0, 1, 2].map { String($0) }
```

### 显示成员表达式

```swift
struct SomeStructure {
    func someMethod(x: Int) {}
    func someMethod(y: Int) {}
    func overloadedMethod(x: Int) {}
    func overloadedMethod(x: Bool) {}
}

let instance = SomeStructure()

let method = instance.someMethod(x:)
let overloadedMethod: (Int) -> Void = instance.overloadedMethod(x:)
```

### 后缀self表达式

```swift
let number: Int = 1.self
let metaType: Int.Type = Int.self
```

### 下标表达式

```swift
var array = [0, 1, 2]
array[0] = array[1]
```

### 强制取值表达式

```swift
var x: Int? = 0

x! += 1

let unwrapped = x!
```

### 可选链表达式

```swift
let string: String? = "Hello, world!"

print(string?.first?.lowercased()) // Optional("h")
```
