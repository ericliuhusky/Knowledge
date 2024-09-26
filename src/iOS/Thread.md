# 多线程

## POSIX封装

### 线程

```swift
import Darwin

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
import Darwin

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

## GCD

### 原理模拟

任务队列，线程池循环从队列里取任务执行  
并行队列不加锁，线程池里的每个线程，都可以从队列里取任务执行，不能保证执行顺序  
串行队列加锁，保证队列的任务执行在同一个线程上，可以保证队列内部的执行顺序

```swift
typealias Task = () -> Void

class DispatchQueue {
    var queue: [Task] = []
    let lock = Lock()
    
    static let main = DispatchQueue()
    static let _global = DispatchQueue()
    class func global() -> DispatchQueue {
        _global
    }
    
    init(label: String = "") {
        serialQueue.append(self)
    }
    
    func async(block: @escaping Task) {
        lock.lock()
        queue.append(block)
        lock.unlock()
    }
    
    func sync(block: Task) {
        block()
    }
    
    func dequeue() -> Task? {
        lock.lock()
        defer {
            lock.unlock()
        }
        return queue.isEmpty ? nil : queue.removeFirst()
    }
}

var serialQueue = [DispatchQueue]()
let serialLock = Lock()

let threadPool = (0..<10).map { _ in
    Thread {
        while let task = DispatchQueue.global().dequeue() {
            task()
        }
        for queue in serialQueue {
            serialLock.lock()
            while let task = queue.dequeue() {
                task()
            }
            serialLock.unlock()
        }
    }
}

func dispatchMain() {
    threadPool.forEach { thread in
        thread.start()
    }
    threadPool.forEach { thread in
        thread.join()
    }
    while let task = DispatchQueue.main.dequeue() {
        task()
    }
}
```

原子操作flag，保证多线程条件下只执行一次  
（单线程，只用flag就可以保证只执行一次）

```swift
import Atomics

func dispatchOnce(_ done: ManagedAtomic<Bool>, block: @escaping () -> Void) {
    if !done.compareExchange(expected: false, desired: true, ordering: .relaxed).original {
        block()
    }
}
```

### 常见用法

命令行程序要手动调用`dispatchMain`，UIApplication,NSApplication,RunLoop会自动调

```swift
dispatchMain()
```

主线程执行任务

```swift
DispatchQueue.main.async {
    print("main thread")
}
```

非主线程串行执行任务

```swift
let queue = DispatchQueue(label: "")
queue.async {
    for i in 0..<3 {
        print("a \(i)")
    }
}
queue.async {
    for i in 0..<3 {
        print("b \(i)")
    }
}
queue.async {
    for i in 0..<3 {
        print("c \(i)")
    }
}
```

并行执行任务

```swift
DispatchQueue.global().async {
    for i in 0..<3 {
        print("a \(i)")
    }
}
DispatchQueue.global().async {
    for i in 0..<3 {
        print("b \(i)")
    }
}
DispatchQueue.global().async {
    for i in 0..<3 {
        print("c \(i)")
    }
}
```

延时执行

```swift
DispatchQueue.global().asyncAfter(deadline: .now() + .seconds(3)) {
    print("execute after 3 seconds")
}
```

群组

```swift
let group = DispatchGroup()
DispatchQueue.global().async(group: group) {
    print(1)
}
DispatchQueue.global().async(group: group) {
    print(2)
}
DispatchQueue.global().async(group: group) {
    print(3)
}
group.notify(queue: .main) {
    print("all done")
}
```

信号量为1时，相当于一个互斥锁

```swift
for _ in 0..<100 {
    var a = 0
    let group = DispatchGroup()
    let semaphore = DispatchSemaphore(value: 1)
    
    for _ in 0..<10 {
        DispatchQueue.global().async(group: group) {
            semaphore.wait()
            let t = a
            pthread_yield_np()
            a = t + 1
            semaphore.signal()
        }
    }
    
    group.notify(queue: .main) {
        print(a, terminator: " ")
    }
}
```

## OperationQueue

并行执行任务

```swift
let queue = OperationQueue()

let operation1 = BlockOperation {
    for i in 0..<3 {
        print("a \(i)")
    }
}

let operation2 = BlockOperation {
    for i in 0..<3 {
        print("b \(i)")
    }
}

let operation3 = BlockOperation {
    for i in 0..<3 {
        print("c \(i)")
    }
}

queue.addOperations([operation1, operation2, operation3], waitUntilFinished: false)
```

任务完成回调

```swift
operation2.completionBlock = {
    print("b all done")
}
```

任务依赖，确保任务A在任务B执行完后再执行

```swift
operation1.addDependency(operation2)
```
