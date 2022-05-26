# 应用扩展不可用编译错误

## 问题描述

在带有应用扩展的工程中，组件库内使用`UIApplication.shared`，编译器报`'shared' is unavailable in application extensions for iOS: Use view controller based solutions where appropriate instead.`的错误

根据[App Extension Programming Guide
](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionOverview.html#//apple_ref/doc/uid/TP40014214-CH2-SW6)，`UIApplication.shared`以及其它使用`NS_EXTENSION_UNAVAILABLE`标记的API在应用扩展中不可用

## 解决办法

为函数添加应用扩展不可用标记

函数默认是可以在应用扩展中调用的，这样在函数内部调用应用扩展不可用的API就会有问题。将函数标记为应用扩展不可用，可以类比将异常抛出，在用到应用扩展不可用的API的函数调用链的每一层全部加上应用扩展不可用标记，只要在应用扩展中不调用这些被标记的函数即可。换言之，被标记的函数在应用扩展中不可再被调用。

### Swift

```swift
@available(iOSApplicationExtension, unavailable)
func methodUsedApplicationExtensionUnavailableAPI() {
    UIApplication.shared
}
```

### OC

```objc
- (void)methodUsedApplicationExtensionUnavailableAPI NS_EXTENSION_UNAVAILABLE_IOS("") {
    [UIApplication sharedApplication];
}
```
