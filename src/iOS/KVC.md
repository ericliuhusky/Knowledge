# KVC

## 原理模拟

向属性的setter发消息

```swift
extension NSObject {
    func value(forKey key: String) -> Any? {
        perform(Selector(key)).takeUnretainedValue()
    }
    
    func setValue(_ value: Any?, forKey key: String) {
        perform(Selector("set\(key.capitalized):"), with: value)
    }
}
```

## Swift解决方案

根据ABI直接读写内存

```swift
protocol KVC {}

extension KVC {
    var propOffsetDict: [String: Int] {
        var dict: [String: Int] = [:]
        let metaAddr = unsafeBitCast(Self.self, to: Int.self)
        let typeDescriptorAddr = UnsafePointer<Int>(bitPattern: metaAddr + 64)!.pointee
        let numberOfFields = Int(UnsafePointer<Int32>(bitPattern: typeDescriptorAddr + 36)!.pointee)
        
        let fieldOffsets = {
            let offsetToTheFieldOffsetVector = Int(UnsafePointer<Int32>(bitPattern: typeDescriptorAddr + 40)!.pointee)
            let fieldOffsetsAddr = metaAddr + 8 * offsetToTheFieldOffsetVector
            return [Int](UnsafeBufferPointer(start: UnsafePointer<Int>(bitPattern: fieldOffsetsAddr), count: numberOfFields))
        }()
        
        let fieldNames = {
            let fieldDescriptorOffsetAddr = typeDescriptorAddr + 16
            let fieldDescriptorOffset = Int(UnsafePointer<Int32>(bitPattern: fieldDescriptorOffsetAddr)!.pointee)
            let fieldDescriptorAddr = fieldDescriptorOffsetAddr + fieldDescriptorOffset
            let fieldsAddr = fieldDescriptorAddr + 16
            
            return (0..<numberOfFields).map { i in
                let fieldAddr = fieldsAddr + i * 12
                let fieldNameOffsetAddr = fieldAddr + 8
                let fieldNameOffset = Int(UnsafePointer<Int32>(bitPattern: fieldNameOffsetAddr)!.pointee)
                let fieldNameAddr = fieldNameOffsetAddr + fieldNameOffset
                return String(cString: UnsafePointer<CChar>(bitPattern: fieldNameAddr)!)
            }
        }()
        
        for i in 0..<numberOfFields {
            dict[fieldNames[i]] = fieldOffsets[i]
        }
        return dict
    }
    
    var addr: Int {
        unsafeBitCast(self, to: Int.self)
    }
    
    func setValue<Value>(_ value: Value, forKey key: String) {
        let propAddr = addr + propOffsetDict[key]!
        let propPtr = UnsafeMutablePointer<Value>(bitPattern: propAddr)!
        propPtr.pointee = value
    }
    
    func value<Value>(forKey key: String) -> Value? {
        let propAddr = addr + propOffsetDict[key]!
        let propPtr = UnsafePointer<Value>(bitPattern: propAddr)!
        return propPtr.pointee
    }
}
```
