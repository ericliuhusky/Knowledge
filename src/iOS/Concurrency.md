# 并发编程

## 异步函数的定义和调用

```swift
func hello(_ number: Int) async -> Int {
    await Task.sleep(1_000_000_000)
    print("Hello Concurrency! \(number)")
    
    return number
}

let n = await hello(0)
print(n)
```

## 串行

```swift
let n0 = await hello(0)
let n1 = await hello(1)
let n2 = await hello(2)

print(n0 + n1 + n2)
```

## 并行

```swift
async let n3 = hello(3)
async let n4 = hello(4)
async let n5 = hello(5)

print(await (n3 + n4 + n5))
```

### 循环并行

```swift
await withTaskGroup(of: Int.self) { group in
    for i in 0..<10 {
        group.async {
            let n = await hello(i)
            return n
        }
    }

}
```

### 异步序列

```swift
var sum = 0
    
for await result in group {
    sum += result
}

print(sum)
```

## 群组

```swift
// 保证群组内的相对顺序，不保证群组间的顺序
async let g0: Int = {
    let n0 = await hello(0)
    let n1 = await hello(1)
    let n2 = await hello(2)
    return n0 + n1 + n2
}()

async let g1: Int = {
    let n3 = await hello(3)
    let n4 = await hello(4)
    let n5 = await hello(5)
    return n3 + n4 + n5
}()

async let g2: Int = {
    let n6 = await hello(6)
    let n7 = await hello(7)
    let n8 = await hello(8)
    return n6 + n7 + n8
}()

print(await (g0 + g1 + g2))
```

## 数据竞争

### 数据未隔离

```swift
var data = 0

await withTaskGroup(of: Void.self) { group in
    for _ in 0..<10000 {
        group.async {
            data += 1
        }
    }
}

print(data)
```

### 参与者

```swift
// 参与者也是引用类型
actor SafeData {
    private(set) var data = 0
    
    func add(_ number: Int) {
        // 将可能引起数据竞争的逻辑放到参与者中
        
        self.data += number
    }
}

let safeData = SafeData()

await withTaskGroup(of: Void.self) { group in
    for _ in 0..<10000 {
        group.async {
            await safeData.add(1)
        }
    }
}

print(await safeData.data)
```


## 结构化任务

### 串行

```swift
await withTaskGroup(of: Int.self) { group0 in
        
    group0.async {
        let n0 = await hello(0)
        await withTaskGroup(of: Int.self) { group1 in
            
            group1.async {
                let n1 = await hello(1)
                await withTaskGroup(of: Int.self) { group2 in
                    
                    group2.async {
                        let n2 = await hello(2)
                        return n2
                    }
                }
                return n1
            }
        }
        return n0
    }
}
```

### 并行

```swift
await withTaskGroup(of: Int.self) { group in
    group.async {
        let n = await hello(3)
        return n
    }
    group.async {
        let n = await hello(4)
        return n
    }
    group.async {
        let n = await hello(5)
        return n
    }
    
    print(await (group.next()! + group.next()! + group.next()!))
}
```

### 群组

```swift
await withTaskGroup(of: Int.self) { group in
    group.async {
        let n0 = await hello(0)
        let n1 = await hello(1)
        let n2 = await hello(2)
        return n0 + n1 + n2
    }
    group.async {
        let n3 = await hello(3)
        let n4 = await hello(4)
        let n5 = await hello(5)
        return n3 + n4 + n5
    }
    group.async {
        let n6 = await hello(6)
        let n7 = await hello(7)
        let n8 = await hello(8)
        return n6 + n7 + n8
    }
    
    print(await (group.next()! + group.next()! + group.next()!))
}
```
