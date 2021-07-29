# Alamofire

## 请求

### GET

```swift
// 默认method: .get
AF.request("https://httpbin.org/get").response { response in
    debugPrint(response)
}
```

### POST

```swift
AF.request("https://httpbin.org/post", method: .post).response { response in
    debugPrint(response)
}
```

### PUT

```swift
AF.request("https://httpbin.org/put", method: .put).response { response in
    debugPrint(response)
}
```

### DELETE

```swift
AF.request("https://httpbin.org/delete", method: .delete).response { response in
    debugPrint(response)
}
```

## 带参数请求

### GET-URL编码

- #### 模型

```swift
struct Query: Encodable {
    let year: Int
    let month: Int
    let day: Int
}

let query = Query(year: 2021, month: 7, day: 29)
// 默认encoder: URLEncodedFormParameterEncoder.default
AF.request("https://httpbin.org/get", parameters: query).response { response in
    debugPrint(response)
}
```

- #### 字典

```swift
let query = [
    "year": 2021,
    "month": 7,
    "day": 29
]

AF.request("https://httpbin.org/get", parameters: query).response { response in
    debugPrint(response)
}
```

### POST-JSON编码

- #### 模型

```swift
struct User: Encodable {
    let name: String
    let password: String
}

let user = User(name: "hello", password: "world")

AF.request("https://httpbin.org/post", method: .post, parameters: user, encoder: JSONParameterEncoder.default).response { response in
    debugPrint(response)
}
```

- #### 字典

```swift
let user = [
    "name": "hello",
    "password": "world"
]

AF.request("https://httpbin.org/post", method: .post, parameters: user, encoder: JSONParameterEncoder.default).response { response in
    debugPrint(response)
}
```

## 响应

### JSON

```swift
AF.request("https://httpbin.org/json").responseJSON { response in
    debugPrint(response)
}
```

### Data

```swift
AF.request("https://httpbin.org/json").responseData { response in
    debugPrint(response)
}
```

### String

```swift
AF.request("https://httpbin.org/json").responseString { response in
    debugPrint(response)
}
```

### 模型解析

```swift
struct HTTPBinResponse: Decodable {
    let args: [String: String]
    let headers: [String: String]
    let origin: String
    let url: String
}

AF.request("https://httpbin.org/get").responseDecodable(of: HTTPBinResponse.self) { response in
    debugPrint(response)
}
```

## 下载

### 基本

```swift
AF.download("https://httpbin.org/image/png").response { response in
    debugPrint(response)
}
```

### 下载地址

```swift
let destination = DownloadRequest.suggestedDownloadDestination(for: .desktopDirectory, in: .userDomainMask)

AF.download("https://httpbin.org/image/png", to: destination).response { response in
    debugPrint(response)
}
```

### 下载进度

```swift
AF.download("https://swift.org/builds/swift-5.5-branch/xcode/swift-5.5-DEVELOPMENT-SNAPSHOT-2021-07-27-a/swift-5.5-DEVELOPMENT-SNAPSHOT-2021-07-27-a-osx.pkg").downloadProgress { progress in
    print(progress.fractionCompleted)
}.response { response in
    debugPrint(response)
}
```

## 不常用

### 设置其它请求参数

```swift
AF.request("https://httpbin.org/get") { request in
    request.timeoutInterval = 0.1
}.response { response in
    debugPrint(response)
}
```

### 请求头

```swift
let headers: HTTPHeaders = [
    .accept("application/json")
]

AF.request("https://httpbin.org/headers", headers: headers).response { response in
    debugPrint(response)
}
```
