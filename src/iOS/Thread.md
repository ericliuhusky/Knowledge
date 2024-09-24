# 多线程

## POSIX封装

### 线程

```swift
import Foundation

class Thread {
    let block: () -> Void
    var thread: pthread_t!
    
    init(block: @escaping () -> Void) {
        self.block = block
    }
    
    func start() {
        let selfPtr = Unmanaged.passRetained(self).toOpaque()
        pthread_create(&thread, nil, { context in
            let selfPtr = unsafeBitCast(context, to: Thread.self)
            selfPtr.block()
            Unmanaged<Thread>.fromOpaque(context).release()
            return nil
        }, selfPtr);
    }
    
    func join() {
        pthread_join(thread, nil)
    }
}
```

### 锁

```swift
import Foundation

class Lock {
    var mutex = pthread_mutex_t()
    
    init() {
        pthread_mutex_init(&mutex, nil)
    }
    
    deinit {
        pthread_mutex_destroy(&mutex)
    }
    
    func lock() {
        pthread_mutex_lock(&mutex)
    }
    
    func unlock() {
        pthread_mutex_unlock(&mutex)
    }
}
```

## 线程安全

### 读写冲突

#### 场景模拟

读一半写

```swift
// 执行一百次以观察到结果为-1的情况
for _ in 0..<100 {
    var a = 0
    func setA(_ v: Int) {
        a = v
    }
    func getA() -> Int {
        a += 1
        // 读一半，主动触发调度，另一个线程把a写为0，得到非预期的结果
        pthread_yield_np()
        a -= 1
        return a
    }
    
    let thread1 = Thread {
        print(getA(), terminator: " ")
    }
    thread1.start()
    
    let thread2 = Thread {
        setA(0)
    }
    thread2.start()
    
    thread1.join()
    thread2.join()
}
```

#### 解决方法

加锁保证读写原子性，读写隔离  
（OC可以使用atomic属性修饰）

```swift
for _ in 0..<100 {
    var a = 0
    let lock = Lock()
    func setA(_ v: Int) {
        lock.lock()
        a = v
        lock.unlock()
    }
    func getA() -> Int {
        lock.lock()
        a += 1
        pthread_yield_np()
        a -= 1
        lock.unlock()
        return a
    }
    
    let thread1 = Thread {
        print(getA(), terminator: " ")
    }
    thread1.start()
    
    let thread2 = Thread {
        setA(0)
    }
    thread2.start()
    
    thread1.join()
    thread2.join()
}
```

### 数据竞争

#### 场景模拟

多个读写线程，读了还没写，其它线程又读到没更新的旧值

```swift
// 执行一百次以观察到结果不为10的情况
for _ in 0..<100 {
    var a = 0
    
    var threads = [Thread]()
    
    for _ in 0..<10 {
        let thread = Thread {
            let t = a
            // 读了还没写，主动触发调度，使其它线程读到没更新的旧值
            pthread_yield_np()
            a = t + 1
        }
        threads.append(thread)
        thread.start()
    }
    
    for thread in threads {
        thread.join()
    }
    
    print(a, terminator: " ")
}
```

#### 解决方法

加锁

```swift
for _ in 0..<100 {
    var a = 0
    let lock = Lock()
    
    var threads = [Thread]()
    
    for _ in 0..<10 {
        let thread = Thread {
            lock.lock()
            let t = a
            pthread_yield_np()
            a = t + 1
            lock.unlock()
        }
        threads.append(thread)
        thread.start()
    }
    
    for thread in threads {
        thread.join()
    }
    
    print(a, terminator: " ")
}
```

### 死锁

#### 场景模拟

线程1持有锁1，线程2持有锁2，线程1等待锁2，线程2等待锁1，互相等待

```swift
// 执行一百次以观察到死锁的情况
for _ in 0..<100 {
    let lock1 = Lock()
    let lock2 = Lock()

    let thread1 = Thread {
        lock1.lock()
        pthread_yield_np()
        lock2.lock()
        lock2.unlock()
        lock1.unlock()
    }
    thread1.start()

    let thread2 = Thread {
        lock2.lock()
        pthread_yield_np()
        lock1.lock()
        lock1.unlock()
        lock2.unlock()
    }
    thread2.start()

    thread1.join()
    thread2.join()

    print("no dead lock")
}
```

#### 解决方法

约定锁的顺序

```swift
for _ in 0..<100 {
    let lock1 = Lock()
    let lock2 = Lock()

    let thread1 = Thread {
        lock1.lock()
        pthread_yield_np()
        lock2.lock()
        lock2.unlock()
        lock1.unlock()
    }
    thread1.start()

    let thread2 = Thread {
        lock1.lock()
        pthread_yield_np()
        lock2.lock()
        lock2.unlock()
        lock1.unlock()
    }
    thread2.start()

    thread1.join()
    thread2.join()

    print("no dead lock")
}
```
