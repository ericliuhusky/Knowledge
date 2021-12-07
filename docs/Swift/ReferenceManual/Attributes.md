# 特性

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
