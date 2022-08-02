# String

## 1. str[0]

```swift
//  扩展字符串使它可以像其他语言一样以下标方式修改获取字符
extension String {
    
    //  String中的每个字符元素并不是等长的，而是由1~4个UTF-8组成，因此不能直接使用Int来索引
    func index(_ i: Int) -> Index {
        //  根据首索引和偏移计算出真实的索引
        self.index(self.startIndex, offsetBy: i)
    }
    
    subscript(_ i: Int) -> Character {
        set(newValue) {
            self.remove(at: self.index(i))
            self.insert(newValue, at: self.index(i))
        }
        get {
            return self[self.index(i)]
        }
    }
}
```

## 2. split

```swift
//  split分割
let sentence = "hello, my name is eric"
let words = sentence.split(separator: " ")
print(words)
```

## 3. join

```swift
//  joined拼接
let words = ["hello,", "my", "name", "is", "liuzihao"]
let sentence = words.joined(separator: " ")
print(sentence)
```

## 4. contains

```swift
//  是否包含
"abc".contains("a")
```

## 5. 大小写

```swift
"abcd".uppercased()

"ABCD".lowercased()
```

## 6. unicode

```swift
"abcd".unicodeScalars.forEach { (unicode) in
    print(unicode.value)
}
```

## 7. substring

```swift
//  前几位子字符串
"abcd".prefix(2)//  ab
//  后几位子字符串
"accd".suffix(2)//  cd
```


## Swift String Length

`String.count`得到的是`Unicode.Scalar`按Unicode规则合成`Character`后，`String`中`Character`的个数。
"\r"和"\n"两个字符合成了新的单个字符"\r\n"，因此字符串长度为1

```swift
"\r\n".count // 1
strlen("\r\n") // 2
"\r\n".unicodeScalars.count // 2

("🇨" + "🇳") == "🇨🇳" // true
("🇨" + "🇳").count // 1
"🇨🇳".unicodeScalars.count // 2
```

### 使用utf8和C函数一起工作

```swift
strlen("你好") // 6
"你好".utf8.count // 6
```

### 使用utf16和Objective-C函数一起工作

```swift
NSString(string: "你好").length // 2
"你好".utf16.count // 2
```

### utf8CString

```swift
strlen("abc") // 3 (长度不包含'\0')
"abc".utf8CString // [97, 98, 99, 0]
"abc".utf8CString.count // 4 (长度包含'\0')
```

### contains的巨坑

引入Foundation之前，contains调用的是Swift标准库；引入之后，contains调用的是Foundation中NSString的方法。
Swift完全支持Unicode，而Objective-C只支持utf-16，造成了引入前后不一样的结果

```swift
"\r\n".contains("\n") // false
"🇨🇳".contains("🇨") // false
```

```swift
import Foundation

"\r\n".contains("\n") // true
"🇨🇳".contains("🇨") // true
```
