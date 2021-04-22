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
