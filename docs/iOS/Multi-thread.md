# 多线程

## 1. 进程与线程

- 进程

进程是指正在运行的一个应用程序，正在进行的程序；进程之间是独立的，拥有独立运行所需要的全部资源

- 线程

一个进程中可以有多个线程，至少有一个默认启动的线程即为主线程；同一个进程内的线程共享进程资源

## 2. 什么是多线程

- 同一时间内单核CPU只能执行一个线程，多线程是CPU快速在多个线程之间进行切换调度，造成的多个线程同时执行的假象；多核CPU可以真的多线程
- 多线程是为了同步完成多项任务

## 3. 多线程的优点和缺点

- 优点

适当提高程序的执行效率，适当提高资源利用率

- 缺点

开启线程需要内存空间，线程越多CPU的调度开销越大，线程之间的数据通信和共享更使得程序开发更加复杂

## 4. 并行 和 并发

- 并行：利用计算机的多核，在多个线程上同步进行
- 并发：在一条线程上快速切换，让人感觉在同步进行

## 5. 多线程方案

- Thread

面向对象，需要手动创建但不需要手动销毁，线程通信困难

- GCD DispatchQueue

充分利用设备多核，自动管理线程生命周期，比OperationQueue效率更高

- OperationQueue

基于GCD的封装，更加面向对象

## 6. Thread

```swift
import Foundation

let c1 = NSCondition()
let c2 = NSCondition()

let t1 = Thread {
    for index in 1...5 {
        print("t1", index)
        
        //  t1输出两次之后开始等待
        if index == 2 {
            print("t1 waiting......")
            
            c1.lock()
            c1.wait()
            c1.unlock()
        }
    }
    
    //  t1输出完毕之后，通知t2继续
    c2.signal()
}
let t2 = Thread {
    for index in 1...5 {
        print("t2", index)
        
        //  t2输出三次之后开始等待，并通知t1继续
        if index == 3 {
            c1.signal()
            
            print("t2 waiting......")
            
            c2.lock()
            c2.wait()
            c2.unlock()
        }
    }
}

t1.start()
t2.start()

//  让主线程等待以看到所有输出，不然切换到主线程执行完毕就没有输出了
Thread.sleep(forTimeInterval: 10)
```

## 7. GCD

串行队列：队列中的任务按顺序执行
并行队列：队列中的任务并行执行
同步：阻塞，等到执行完毕
异步：非阻塞

```swift
//GCD

//异步回到主线程执行闭包，同步会死锁
DispatchQueue.main.async {
    print("main thread")
}


//异步串行执行闭包，保证queue内添加的闭包按添加顺序执行
let queue = DispatchQueue(label: "com.queue")
queue.async {
    print(1)
}
queue.async {
    print(2)
}
queue.async {
    print(3)
}


//获取全局并行队列，异步并发执行闭包，不能保证闭包按顺序执行
DispatchQueue.global().async {
    print(1)
}
DispatchQueue.global().async {
    print(2)
}
DispatchQueue.global().async {
    print(3)
}


//异步延时执行
DispatchQueue.global().asyncAfter(deadline: .now() + DispatchTimeInterval.seconds(3)) {
    print("execute after 3 seconds")
}


//群组操作
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


//使用信号量同步执行异步并行队列的任务
let semaphore = DispatchSemaphore(value: 1)
for i in 0..<5 {
    //wait semaphore-1
    if semaphore.wait(timeout: .distantFuture) == .success {
        DispatchQueue.global().async {
            print(i)
            //signal semaphore+1
            semaphore.signal()
        }
    }
}
```

## 8. OperationQueue

```swift
import Foundation

//  切换到主线程
OperationQueue.main.addOperation {
    print("main thread")
}

//  串行
let queue = OperationQueue()
queue.addBarrierBlock {
    print(1)
}
queue.addBarrierBlock {
    print(2)
}
queue.addBarrierBlock {
    print(3)
}

//  并行
let queueConcurrent = OperationQueue()
queueConcurrent.addOperation {
    print(1)
}
queueConcurrent.addOperation {
    print(2)
}
queueConcurrent.addOperation {
    print(3)
}
```
