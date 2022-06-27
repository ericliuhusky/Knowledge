# Swift 5.6

## 不可用条件

```swift
if #available(iOS 13, *) {} else {

}

if #unavailable(iOS 13) {

}
```

## 类型占位符

```swift
let x: _? = 1

let dict: [String: _] = ["a": 1]
```

## 临时未初始化的缓冲区

```swift
// 堆上分配
let pointer = UnsafeMutableBufferPointer<Int>.allocate(capacity: 3)

pointer.deallocate()

// 栈上分配
withUnsafeTemporaryAllocation(of: Int.self, capacity: 3) { pointer in

}
```

## 放宽 C 函数指针参数的诊断

`UnsafeMutableRawPointer` 可以自动转化为 `UnsafeMutabelPointer<UInt8>`

## 引入存在any

```swift
protocol P {

}

let p: P
let p: any P
```

## 具体实例

### 临时未初始化的缓冲区

```swift
import CommonCrypto

let data = "Hello, world!".data(using: .utf8)!

let digest: Data = data.withUnsafeBytes { dataPointer in
    withUnsafeTemporaryAllocation(of: UInt8.self, capacity: Int(CC_MD5_DIGEST_LENGTH)) { digestPointer in
        CC_MD5(dataPointer.baseAddress, CC_LONG(data.count), digestPointer.baseAddress)
        return Data(buffer: digestPointer)
    }
}

print(digest.reduce("", { partialResult, code in
    partialResult + String(format: "%02x", code)
}))
```

### 放宽 C 函数指针参数的诊断

```swift
import CommonCrypto

let data = "Hello, world!".data(using: .utf8)!
var digest = [UInt8](repeating: 0, count: Int(CC_MD5_DIGEST_LENGTH))

data.withUnsafeBytes { dataPointer in
    digest.withUnsafeMutableBytes { digestPointer in
//        CC_MD5(dataPointer.baseAddress, CC_LONG(data.count), digestPointer.baseAddress?.assumingMemoryBound(to: UInt8.self))
        CC_MD5(dataPointer.baseAddress, CC_LONG(data.count), digestPointer.baseAddress)
    }
}

print(digest.reduce("", { partialResult, code in
    partialResult + String(format: "%02x", code)
}))
```
