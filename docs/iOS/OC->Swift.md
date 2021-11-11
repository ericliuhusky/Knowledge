# Objective-C组件库用Swift转写的方法论

## OC库重构拆分

目的为将组件库拆分为OC特性和可用Swift替换的两部分

进入组件Pod目录，复制Classes文件夹下所有文件并重命名为Classes_Swift，新建空的Classes_OC文件夹。
全局搜索#define、typedef、static，将所有搜索到的头文件拆分（.m文件可以忽略），将#define宏拆分出来在原文件名基础上加上后缀_Macro，将typedef拆分出来再原文件名基础上加上后缀_TypeDef，将static拆分出来在原文件名基础上加上后缀_Global。
整个文件本身全部都是#define宏、typedef、static静态变量的，直接将文件移动至Classes_OC文件夹。新建三个目录，Macro、TypeDef、Global，将拆分出来的文件分类放入。

此外还有Swift无法表示的NSInvocation，Swift类无法被OC继承ObjcSubclassingRestricted

最后修改podspec`s.source_files = 'Pod/Classes_Swift/**/*.{h,m}', 'Pod/Classes_OC/**/*'`

## 使用Swift转写替换

文件命名和类命名和函数命名要与原组件库完全一致，此部分作为接口兼容外部业务的调用，可起名叫做OCDerecated。向外再抽一层，作为Swift风格的实现。

```swift
@objcMembers
public class <#NSClass#>: NSObject {
    public static func <#function#>() {
        
    }
}
```

```swift
@objc public extension <#NSObject#> {
    
}
```

```swift
@objc public enum <#NSEnum#>: Int {
    case <#one#>
}
```

最后修改podspec`s.source_files = 'Pod/Classes_Swift/**/*.{swift}', 'Pod/Classes_OC/**/*'`