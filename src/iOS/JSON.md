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

```objc
@import Foundation;
@import ObjectiveC;

@interface User : NSObject
@property NSString *name;
@property NSNumber *age;
@end

@implementation User
@end

int main() {
    NSString *jsonString = @"{\"name\":\"EricLiu\",\"age\":26}";
    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:[jsonString dataUsingEncoding:NSUTF8StringEncoding] options:nil error:nil];
    User *user = [[User alloc] init];
    for (NSString *key in dict.allKeys) {
        id value = dict[key];
        NSString *setterName = [[NSString alloc] initWithFormat:@"set%@:", [key capitalizedString]];
        SEL setter = sel_registerName([setterName cStringUsingEncoding:NSASCIIStringEncoding]);
        
        ((void (*)(id, SEL, id))objc_msgSend)(user, setter, value);
    }
    return 0;
}
```

### YYModel

目的是根据字典，在运行时改变对象的属性值

- 不用KVC，因为每次KVC都会遍历继承链
- 直接向对象属性的setter发送消息
- YYModel只遍历继承链一次，缓存类的元信息，以应对更复杂的情况
