# Runtime原理模拟

对象有个isa指针  
类继承对象，类有个superclass指针，有方法列表和变量列表

对象的isa指针指向类，类的isa指针指向元类；  
类的superclass指向父类，元类的superclass指向父类的元类

```swift
typealias Selector = String
typealias IMP = (Object, Selector) -> Object

class Object: Hashable {
    let isa: Class?
    var ivarMemory = [Object?](repeating: nil, count: 10)
    
    init(isa: Class?) {
        self.isa = isa
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(unsafeBitCast(self, to: UInt.self))
    }
    
    static func == (lhs: Object, rhs: Object) -> Bool {
        lhs === rhs
    }
}

class Class: Object {
    let name: String
    let superclass: Class?
    var methods: [Method]
    var ivars: [Ivar]
    
    init(name: String, superclass: Class?, isa: Class?) {
        self.name = name
        self.superclass = superclass
        methods = []
        ivars = []
        super.init(isa: isa)
    }
}

class Method {
    let name: Selector
    var imp: IMP
    
    init(name: Selector, imp: @escaping IMP) {
        self.name = name
        self.imp = imp
    }
}

struct Ivar {
    let name: String
    let offset: Int
}
```

全局变量：类字典，相关对象字典，辅助表里的引用计数字典和弱引用字典

```swift
class GlobalVar: @unchecked Sendable {
    struct SideTable {
        var referenceCountDict: [Object: Int]
        var weakTable: [Object: [AutoreleasingUnsafeMutablePointer<Object?>]]
    }
    
    var classDict = [String: Class]()
    var associationsDict: [Object: [AnyHashable: Object]] = [:]
    var sideTable = SideTable(referenceCountDict: [:], weakTable: [:])
}
let global = GlobalVar()
```

## 类

新建一个类和元类，把类注册到类字典中

```swift
func objc_allocateClassPair(_ superclass: Class?, _ name: String) -> Class {
    let meta = Class(name: name, superclass: superclass?.isa, isa: nil)
    let cls = Class(name: name, superclass: superclass, isa: meta)
    return cls
}

func objc_registerClassPair(_ cls: Class) {
    global.classDict[cls.name] = cls
}

func objc_getClass(_ name: String) -> Class? {
    global.classDict[name]
}
```

## 方法

遍历继承链，找到同名方法，并执行方法的实现函数

否则：消息转发
1. 动态方法解析，可以在resolveInstanceMethod中为类添加方法  
2. 对象转发，把方法交给其它对象处理  
3. 提供签名，并在Invocation中处理消息转发  

```swift
func class_addMethod(_ cls: Class, _ name: Selector, _ imp: @escaping IMP) {
    if !cls.methods.contains(where: { method in
        method.name == name
    }) {
        let method = Method(name: name, imp: imp)
        cls.methods.append(method)
    }
}

func class_getInstanceMethod(_ cls: Class, _ name: Selector) -> Method? {
    getMethod(cls, name)
}

func class_getClassMethod(_ cls: Class, _ name: Selector) -> Method? {
    getMethod(cls.isa, name)
}

func getMethod(_ cls: consuming Class?, _ name: Selector) -> Method? {
    while cls != nil {
        if let method = cls?.methods.first(where: { method in
            method.name == name
        }) {
            return method
        }
        cls = cls?.superclass
    }
    return nil
}

func objc_msgSend(_ self: Object, _ sel: Selector) -> Object {
    if let imp = getMethod(self.isa, sel)?.imp {
        return imp(self, sel)
    }
    // 1. resolveInstanceMethod
    // 2. forwardingTargetForSelector
    // 3. methodSignatureForSelector + forwardInvocation
    fatalError()
}

func object_getClass(_ obj: Object) -> Class {
    obj.isa!
}

func method_exchangeImplementations(_ m1: Method, _ m2: Method) {
    swap(&m1.imp, &m2.imp)
}
```

## 变量

在对象的内存中，根据变量的偏移，读写值

```swift
func class_addIvar(_ cls: Class, _ name: String) {
    let ivar = Ivar(name: name, offset: cls.ivars.count)
    cls.ivars.append(ivar)
}

func class_getInstanceVariable(_ cls: consuming Class?, _ name: String) -> Ivar? {
    while cls != nil {
        if let ivar = cls?.ivars.first(where: { ivar in
            ivar.name == name
        }) {
            return ivar
        }
        cls = cls?.superclass
    }
    return nil
}

func object_setIvar(_ obj: Object, _ ivar: Ivar, _ value: Object) {
    obj.ivarMemory[ivar.offset] = value
}

func object_getIvar(_ obj: Object, _ ivar: Ivar) -> Object? {
    obj.ivarMemory[ivar.offset]
}
```

## 相关对象

对象地址作为一级key，key作为二级key，读写相关对象字典

```swift
func objc_setAssociatedObject(_ object: Object, _ key: AnyHashable, _ value: Object?) {
    global.associationsDict[object, default: [:]][key] = value
}

func objc_getAssociatedObject(_ object: Object, _ key: AnyHashable) -> Object? {
    global.associationsDict[object]?[key]
}
```

## ARC

retain引用计数+1  
release引用计数-1

引用计数为0时，释放资源  
还要把每一个弱引用设为nil

```swift
func objc_retain(_ obj: Object) {
    global.sideTable.referenceCountDict[obj, default: 0] += 1
}

func objc_release(_ obj: Object) {
    global.sideTable.referenceCountDict[obj, default: 0] -= 1
    if global.sideTable.referenceCountDict[obj] == 0 {
        global.associationsDict[obj] = nil
        global.sideTable.weakTable[obj]?.forEach({ ref in
            ref.pointee = nil
        })
        global.sideTable.weakTable[obj] = nil
        global.sideTable.referenceCountDict[obj] = nil
        // free(obj)
    }
}

func objc_storeWeak(_ ref: AutoreleasingUnsafeMutablePointer<Object?>, _ obj: Object) -> Object? {
    global.sideTable.weakTable[obj]?.append(ref)
    return obj
}

func objc_loadWeak(_ ref: AutoreleasingUnsafeMutablePointer<Object?>) -> Object? {
    ref.pointee
}
```
