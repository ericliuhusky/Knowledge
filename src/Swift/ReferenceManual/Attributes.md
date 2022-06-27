# 特性

## available

```swift
@available(iOS 13.0, *)
@available(iOSApplicationExtension, unavailable)
@available(swift 5)
@available(iOS, introduced: 13.0) // is only available in iOS 13.0 or newer
@available(iOS, deprecated: 13.0) // is deprecated: deprecated
@available(iOS, obsoleted: 13.0) // is unavailable in iOS
@available(*, deprecated, message: "deprecated")
@available(*, unavailable, renamed: "newname") // has been renamed to 'newname'
```

## discardableResult

```swift
@discardableResult
func someFunction() -> Int {
    1
}

someFunction()
```

## dynamicCallable

```swift
import JavaScriptCore

@dynamicCallable
struct JSFunctionWrapper {
    let value: JSValue

    func dynamicallyCall(withArguments args: [Any]) -> JSValue {
        value.call(withArguments: args)
    }
    
    func dynamicallyCall(withKeywordArguments pairs: [String: Any]) -> JSValue {
        value.call(withArguments: [pairs["a"]!, pairs["b"]!])
    }
}

let context: JSContext = JSContext()
context.evaluateScript(
"""
function sum(a, b) {
    return a + b
}
"""
)
let sumValue: JSValue = context.evaluateScript("sum")

let sum = JSFunctionWrapper(value: sumValue)
print(sum(1, 2)) // 3
print(sum(a: 1, b: 2)) // 3
```

## dynamicMemberLookup

```swift
@dynamicMemberLookup
struct DynamicDict {
    let dict: [String: Int]
    
    subscript(dynamicMember key: String) -> Int? {
        dict[key]
    }
}

let dict = DynamicDict(dict: ["a": 1])
print(dict.a) // Optional(1)
print(dict.b) // nil
```

## frozen

冻结对枚举的case和结构体的存储属性进行添加、删除、重新排序的操作，以保证发布二进制库的ABI兼容

## main

```swift
@main
struct Main {
    static func main() {
        print("Hello, world!")
    }
}
```

## nonobjc

```swift
@objcMembers
public class OCBridge: NSObject {
    @nonobjc public func onlyInSwift() {
        
    }
}
```

## objc

```swift
public class OCBridge: NSObject {
    @objc func compatibleMethod() {
        
    }
    
    @objc(ocMethod)
    func swiftMethod() {
        
    }
}
```

## objcMembers

```swift
@objcMembers
public class OCBridge: NSObject {
    
}
```

## propertyWrapper

```swift
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T
    
    init(wrappedValue defaultValue: T, _ key: String) {
        self.key = key
        self.defaultValue = defaultValue
    }
    
    var wrappedValue: T {
        get {
            UserDefaults.standard.object(forKey: key) as? T ?? defaultValue
        }

        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
    
    var projectedValue: T? {
        UserDefaults.standard.object(forKey: key) as? T
    }
}

struct AppConfig {
    @UserDefault("hasAppLaunchedOnce") static var hasAppLaunchedOnce: Bool = false
}

var isFirstLaunch: Bool {
    if AppConfig.hasAppLaunchedOnce {
        return false
    }

    AppConfig.hasAppLaunchedOnce = true
    return true
}

print(isFirstLaunch) // true false
print(AppConfig.hasAppLaunchedOnce) // false true
print(AppConfig.$hasAppLaunchedOnce) // Optional(false) Optional(true)
```

## resultBuilder

```swift
@resultBuilder struct Paragraph {
    static func buildBlock(_ sentences: String...) -> String {
        sentences.joined(separator: "\n")
    }
}

@Paragraph
func makeParagraph() -> String {
    "resultBuilder"
    "hello"
    "world"
}

print(makeParagraph())
// resultBuilder
// hello
// world
```
