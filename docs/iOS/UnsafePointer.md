# Swift 指针

## UnsafePointer | const *

```swift
let a = 3
withUnsafePointer(to: a) { p in
    print(p.pointee)
}
```

```c
const int a = 3;
const int *p = &a;
printf("%d\n", *p);
```

##  UnsafeMutablePointer | *

```swift
var a = 0
withUnsafeMutablePointer(to: &a) { p in
    p.pointee += 1
}
print(a)
```

```c
int a = 0;
int *p = &a;
*p += 1;
printf("%d\n", a);
```

## UnsafeBufferPointer | const * []

```swift
let a = [0, 1, 2]
a.withUnsafeBufferPointer { p in
    for i in 0..<3 {
        print(p[i])
    }
}
```

```c
const int a[] = {0, 1, 2};
const int *p = a;

for(int i = 0; i < 3; i++) {
    printf("%d\n", *p);
    p += 1;
}
```

## UnsafeMutableBufferPointer | * []

```swift
var a = [0, 1, 2]
a.withUnsafeMutableBufferPointer { p in
    for i in 0..<3 {
        p[i] = p[i] + 3
    }
}

print(a)
```

```c
int a[] = {0, 1, 2};
int *p = a;

for(int i = 0; i < 3; i++) {
    *p = *p + 3;
    p += 1;
}

p = a;

for(int i = 0; i < 3; i++) {
    printf("%d\n", *p);
    p += 1;
}
```

## UnsafeRawPointer | const void *

```swift
let a = 3
let c = "c"

var p = withUnsafePointer(to: a, UnsafeRawPointer.init)

print(p.assumingMemoryBound(to: Int.self).pointee)

p = withUnsafePointer(to: c, UnsafeRawPointer.init)

print(p.assumingMemoryBound(to: String.self).pointee)
```

```c
const int a = 3;
const char c = 'c';
const void *p = &a;
printf("%d\n", *(int*)p);
p = &c;
printf("%c\n", *(char*)p);
```

## UnsafeMutableRawPointer | void *

```swift
var a = 0
var c = "0"

var p = withUnsafeMutablePointer(to: &a, UnsafeMutableRawPointer.init)

p.assumingMemoryBound(to: Int.self).pointee += 1

print(a)

p = withUnsafeMutablePointer(to: &c, UnsafeMutableRawPointer.init)

p.assumingMemoryBound(to: String.self).pointee = "1"

print(c)
```

```c
int a = 0;
char c = '0';
void *p = &a;
*(int*)p += 1;
printf("%d\n", a);
p = &c;
*(char*)p = '1';
printf("%c\n", c);
```

## allocate(capacity:) deallocate() | malloc() free()

```swift
let p = UnsafeMutablePointer<Int>.allocate(capacity: 1)
p.pointee = 3
print(p.pointee)
p.deallocate()
```

```c
int *p = (int*)malloc(1);
*p = 3;
printf("%d\n", *p);
free(p);
```

## MemoryLayout | sizeof()

```swift
MemoryLayout<CChar>.size
```

```c
sizeof(char)
```

### 内存对齐

```swift
struct T {
    var a: Int32
    var b: CChar
    var c: CChar
}

print(MemoryLayout<T>.size) // 4 + 1 + 1
print(MemoryLayout<T>.alignment) // 4
print(MemoryLayout<T>.stride) // 4 + [(1 + 1) -> 4]


struct T {
    var b: CChar
    var a: Int32
    var c: CChar
}

print(MemoryLayout<T>.size) // [1 -> 4] + 4 + 1
print(MemoryLayout<T>.alignment) // 4
print(MemoryLayout<T>.stride) // [1 -> 4] + 4 + [1 -> 4]


struct T {
    var b: CChar
    var c: CChar
    var a: Int32
}

print(MemoryLayout<T>.size) // [(1 + 1) -> 4] + 4
print(MemoryLayout<T>.alignment) // 4
print(MemoryLayout<T>.stride) // [(1 + 1) -> 4] + 4
```

```c
struct T {
    int a;
    char b;
    char c;
};

printf("%lu\n", sizeof(struct T)); // 8
```

## Unmanaged

```swift
class SomeClass {
    
}

func printAddress<T: AnyObject>(_ object: T) {
//    print(String(unsafeBitCast(object, to: Int.self), radix: 16, uppercase: false))
    print(Unmanaged<T>.passUnretained(object).toOpaque())
}

printAddress(SomeClass()) // 打印对象内存地址
```
