# 内存管理

## 1. ARC自动引用计数

初始化类的时候会分配内存，ARC自动计数实例被引用的次数，当不再被引用的时候释放内存；
默认创建的引用为强引用，只有当c1,c2,c3都取消对实例的引用时才会释放为实例分配的内存

```swift
class C {
    deinit {
        print("deinit")
    }
}

var c1: C?
var c2: C?
var c3: C?

c1 = C()
c2 = c1
c3 = c1

c1 = nil
c2 = nil
c3 = nil
```

## 2. weak循环引用

互相持有会引起循环引用，导致ARC引用计数永不为空，无法释放内存；添加weak关键字使用弱引用即可解决这个问题

```swift
class A {
    weak var b: B?
    deinit {
        print("deinit A")
    }
}

class B {
    var a: A?
    deinit {
        print("deinit B")
    }
}

var a: A?
var b: B?

a = A()
b = B()

a!.b = b
b!.a = a

a = nil
b = nil
```

## 3. 深拷贝和浅拷贝

- 值类型深拷贝，像细胞分裂一样完全的复制一份出来

```swift
struct S {
    var s = 0
}

var s1 = S()
var s2 = s1
s1.s = 1
s2.s = 2
print(s1.s, s2.s)
```

- 引用类型浅拷贝，仅复制对实例的引用，两个引用仍是同一个实例的引用

```swift
class C {
    var c = 0
}

let c1 = C()
let c2 = c1
c1.c = 1
c2.c = 2
print(c1.c, c2.c)
```

## 4. 参数传递

- 值类型默认值传递，会复制一份传入函数内，如果想要修改外部变量必须显示声明inout，且在调用的时候添加&

```swift
struct S {
    var s = 0
}

func modify(_ s: inout S) {
    s.s = 1
}

var s = S()
modify(&s)
print(s.s)
```

- 引用类型默认引用传递，会传入实例的引用，可以直接修改外部的实例

```swift
class C {
    var c = 0
}

func modify(_ c: C) {
    c.c = 1
}

let c = C()
modify(c)
print(c.c)
```

## 5. BAD_ACCESS

访问了已经释放的变量
