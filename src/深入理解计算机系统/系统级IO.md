# 系统级IO

## 打开和关闭文件

```swift
import Darwin

let fd = open("/etc/hosts", O_RDONLY, 0)
close(fd)
```

## 读写文件

```swift
import Darwin.POSIX.unistd

let buffer = UnsafeMutableBufferPointer<CChar>.allocate(capacity: 3)
defer {
    buffer.deallocate()
}

read(STDIN_FILENO, buffer.baseAddress, 3)
write(STDOUT_FILENO, buffer.baseAddress, 3)
```

## 读取目录

```swift
import Darwin.POSIX.dirent

let dir = opendir("/")

while let entry = readdir(dir) {
    let nameTuple = entry.pointee.d_name
    let nameArray = Mirror(reflecting: nameTuple).children.map(\.value) as! [CChar]
    let name = nameArray.withUnsafeBufferPointer {
        String(cString: $0.baseAddress!)
    }
    print(name)
}

closedir(dir)
```

## 获取文件元数据

```swift
import Darwin.POSIX.sys.stat

var meta = stat()
stat("/etc/hosts", &meta)

let fileSize = meta.st_size
```

## 标准I/O

### 打开和关闭文件

```swift
import Darwin.C.stdio

let file = fopen("/etc/hosts", "r")
fclose(file)
```

### 读写字节

```swift
import Darwin.C.stdio

let buffer = UnsafeMutableBufferPointer<CChar>.allocate(capacity: 3)
defer {
    buffer.deallocate()
}

fread(buffer.baseAddress, 3, 1, stdin)
fwrite(buffer.baseAddress, 3, 1, stdout)
```

### 读写字符串

```swift
import Darwin.C.stdio

let buffer = UnsafeMutableBufferPointer<CChar>.allocate(capacity: 3)
defer {
    buffer.deallocate()
}

fgets(buffer.baseAddress!, 3 + 1, stdin)
fputs(buffer.baseAddress!, stdout)
```
