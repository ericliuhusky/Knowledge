# WebKit

## 1. JS 和 swift 互相调用

```swift
import JavaScriptCore

let context: JSContext = JSContext()
context.evaluateScript("function sum(a,b) { return a+b }")
let result = context.evaluateScript("sum(1,1)")
```
