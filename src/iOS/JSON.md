# JSON

## Swift

### JSON字符串转模型

```swift
import Foundation

struct User: Codable {
    let name: String
    let age: Int
}

let jsonString = """
{
    "name": "EricLiu",
    "age": 26
}
"""

let decoder = JSONDecoder()
let user = try! decoder.decode(User.self, from: jsonString.data(using: .utf8)!)
dump(user)
```

### 多关键字对应同一属性

```swift
struct CustomCodingKey: CodingKey {
    var stringValue: String
    var intValue: Int?
    
    init?(intValue: Int) {
        fatalError()
    }
    
    init(stringValue: String) {
        self.stringValue = stringValue
    }
}
let codingDict = [
    "Name": "name",
    "NAME": "name"
]

decoder.keyDecodingStrategy = .custom { codingPath in
    let key = codingPath.last!.stringValue
    let stringValue = codingDict[key] ?? key
    return CustomCodingKey(stringValue: stringValue)
}
```

## Objective-C

### JSON字符串转模型

遍历字典向对象发送消息

```swift
import Foundation

@objcMembers
class User: NSObject {
    var name: String!
    var age: NSNumber!
}

let jsonString = """
{
    "name": "EricLiu",
    "age": 26
}
"""

let dict = try! JSONSerialization.jsonObject(with: jsonString.data(using: .utf8)!) as! [String : Any]
let user = User()
for (key, value) in dict {
    user.perform(Selector("set\(key.capitalized):"), with: value)
}
dump(user)
```

### YYModel

目的是根据字典，在运行时改变对象的属性值

- 不用KVC，因为KVC太重了
- 直接向对象属性的setter发送消息
- YYModel缓存类的元信息，以应对更复杂的情况
