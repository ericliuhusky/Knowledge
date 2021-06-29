# Swift工具链

## swiftc

1. 编译

    `swiftc main.swift -o main.out`

2. 输出语法树

    `swiftc -dump-ast main.swift`

3. 输出Swift Intermediate Language

    `swiftc -emit-sil main.swift`

4. 输出汇编

    `swiftc -emit-assembly main.swift`

5. 输出LLVM IR

    `swiftc -emit-ir main.swift`

## swift package

1. 初始化包

    `swift package init`
    
    - 初始化可执行包

        `swift package init --type executable`

2. 解析包依赖，并抓取

    `swift package resolve`

3. 展示包依赖图

    `swift package show-dependencies`

4. 更新包依赖

    `swift package update`

5. 重置缓存的依赖

    `swift package reset`

6. 生成Xcode项目

    `swift package generate-xcodeproj`

## swift

1. 编译

    `swift build`
    
    - 编译发布版本

        `swift build -c release`

2. 运行

    `swift run`

## xcode-select

1. 显示当前使用的Xcode

    `xcode-select -p`

2. 切换指定的Xcode，工具链也会随之一同切换

    `sudo xcode-select -s /Applications/Xcode13.0-beta/Xcode-beta.app/Contents/Developer`

## xcodebuild

1. 终端使用代理

    `export all_proxy=127.0.0.1:1087`

2. Xcode通过系统Git拉取依赖

    `xcodebuild -resolvePackageDependencies -scmProvider system`

