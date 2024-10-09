# RunLoop原理模拟

RunLoop是个适时休眠的循环

循环处理定时器、输入源事件

```swift
class RunLoop: @unchecked Sendable {
    var timers: [Timer] = []
    
    static let main = RunLoop()
    
    func run() {
        while true {
            timers.filter { timer in
                timer.fireDate.timeIntervalSinceReferenceDate <= CFAbsoluteTimeGetCurrent()
            }.forEach { timer in
                timer.fire()
            }
        }
    }
    
    func add(_ timer: Timer) {
        timers.append(timer)
    }
}
```
