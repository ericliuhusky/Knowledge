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

## MemoryLayout | sizeof()

```swift
MemoryLayout<CChar>.size
```

```c
sizeof(char)
```
