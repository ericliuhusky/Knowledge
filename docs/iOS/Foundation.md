# Foundation

## 蛇形JSON解析自动转换为驼峰

```swift
struct Hello: Decodable {
    var camelSnake: Int
}

let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
let hello = try! decoder.decode(Hello.self, from: "{\"camel_snake\": 1}".data(using: .utf8)!)
print(hello)
```
