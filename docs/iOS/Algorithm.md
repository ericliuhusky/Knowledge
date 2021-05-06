# 算法

## 1. 时间复杂度

- ### 时间频度

    算法中语句执行次数称为时间频度，记为T(n)

- ### 时间复杂度 O(n)

## 2. 空间复杂度

评估执行程序所需要的存储空间

## 3. 排序算法

这里都按从小到大的 < 顺序来排列

- ### 冒泡

    一次比较两个相邻元素，大的换到后面；遍历重复，确保也只能确保最后一个元素是最大的，前面除最后一个元素外仍可能是乱序；
    舍弃最后一个重复以上步骤，确保倒数第二个是第二大，以此类推就能确保右侧都是已排序序列

```swift
func bubbleSort(_ array: inout [Int]) {
    for i in 0..<array.count - 1 {
        for j in 0..<array.count - 1 - i {
            if array[j] > array[j+1] {
                let temp = array[j+1]
                array[j+1] = array[j]
                array[j] = temp
                //array.swapAt(j, j+1)
            }
        }
    }
}
```

- ### 选择

    在右侧未排序序列中遍历找到最小元素，让其和未排序序列最前的元素交换，即追加到左侧已排序序列的末尾；重复以上步骤，每次在
    剩下的未排序元素中找到最小的追加到已排序序列的末尾

```swift
func selectionSort(_ array: inout [Int]) {
    for i in 0..<array.count {
        var minIndex = i
        for j in i..<array.count {
            if array[j] < array[minIndex] {
                minIndex = j
            }
        }
        let temp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = temp
    }
}
```

- ### 插入

    在右侧未排序序列中选择最前的元素，让其和左侧已排序序列中元素从后到前遍历依次比较，一次比较两个相邻元素，小的换到前面；
    重复以上步骤，每次在未排序序列中选择最前的元素插入到已排序序列的应有位置使其仍然是已排序的序列

```swift
func insertionSort(_ array: inout [Int]) {
    for i in 0..<array.count {
        for j in (0..<i).reversed() {
            if array[j+1] < array[j] {
                let temp = array[j]
                array[j] = array[j+1]
                array[j+1] = temp
            }
        }
    }
}
```

## 4. 查找算法

## 5. 反转

- ### 数组

    前后两个指针分别指向开始和结尾，交换，接着前指针后移，后指针前移；直到两指针相遇（偶数个元素）或者前指针在后指针的后面（奇数个元素），
    也就是要保证前指针在后指针的前面，才可以进行循环

```swift
func reverse<T>(_ base: inout [T]) {
    var start = 0
    var end = base.count - 1
    while start < end {
        let temp = base[start]
        base[start] = base[end]
        base[end] = temp
        start += 1
        end -= 1
    }
}
```

- ### 字符串

    原理相同，只不过在swift中String不能直接进行下标访问，需要写一个extension

```swift
func reverse(_ string: inout String) {
    var start = 0
    var end = string.count - 1
    while start < end {
        let temp = string[start]
        string[start] = string[end]
        string[end] = temp
        start += 1
        end -= 1
    }
}

extension String {
    func index(_ i: Int) -> Self.Index {
        self.index(self.startIndex, offsetBy: i)
    }
    
    subscript(_ i: Int) -> Character {
        get {
            self[self.index(i)]
        }
        set {
            self.remove(at: self.index(i))
            self.insert(newValue, at: self.index(i))
        }
    }
}
```

- ### 链表

    设置一个新的头结点，遍历旧链表把每一个结点按顺序前插到新的链表中完成反转；使用可选项绑定来判空，首先临时保存当前结点的下一个结点，
    将当前结点前插到新链表中时，next指向发生变化，所以必须先保存next；接着使current后移完成遍历，新头结点前移等待下一次前插；最终
    新头结点为新链表的头结点

```swift
class LinkNode<T> {
    var data: T
    var next: LinkNode?
    init(_ data: T, _ next: LinkNode? = nil) {
        self.data = data
        self.next = next
    }
}

func reverse<T>(_ head: LinkNode<T>?) -> LinkNode<T>? {
    var current = head
    var newHead: LinkNode<T>? = nil
    while let cur = current {
        let temp = cur.next
        cur.next = newHead
        current = temp
        newHead = cur
    }
    return newHead
}
```

## 6. 合并有序数组

使用两个指针分别指向两个数组，当两个指针都在数组范围内时，结果数组追加两个数组中更小的一个元素，追加了谁谁的指针就后移；
当两个指针中有一个溢出就不可再继续了，代码中数组访问会报错；分别使用两个循环追加剩下的元素，不用关心谁有剩余，谁有剩余谁追加，没有剩余循环就退出

```swift
func merge(_ array1: [Int], _ array2: [Int]) -> [Int] {
    var p = 0
    var q = 0
    var result = [Int]()
    while p < array1.count && q < array2.count {
        if array1[p] <= array2[q] {
            result.append(array1[p])
            p += 1
        } else {
            result.append(array2[q])
            q += 1
        }
    }
    
    while p < array1.count {
        result.append(array1[p])
        p += 1
    }
    while q < array2.count {
        result.append(array2[q])
        q += 1
    }
    return result
}
```

## 7. 哈希计数查找

查找第一个只出现一次的元素，哈希计数，遍历输入的序列，如果元素是第一次出现就把它的计数设为1，如果不是第一次出现就计数+1；
重新遍历，第一次找到哈希计数为一次的就反回结果；输入的序列可以是字符串或数组，序列中的元素要遵循哈希协议，这里的哈希实现
使用字典；字典返回的为可选项，当字典中没有关键字对应的值时返回nil，可选项绑定判空来判断是否是第一次出现

```swift
func hashCount<T: Sequence>(_ sequence: T) -> T.Element? where T.Element: Hashable {
    var dict = [T.Element: Int]()
    for element in sequence {
        guard let value = dict[element] else { dict[element] = 1; continue }
        dict[element] = value + 1
    }

    for element in sequence {
        if dict[element] == 1 {
            return element
        }
    }
    return nil
}
```

## 8. 用有序字典实现 LRU缓存

```swift
// 双向链表结点
class DoubleLinkedNode<Data> {
    var data: Data?
    var prev: DoubleLinkedNode?
    var next: DoubleLinkedNode?

    init(_ data: Data? = nil) {
        self.data = data
        self.prev = nil
        self.next = nil
    }
}

// 双向链表
// tips: 双向链表的优点主要在于删除快，不需要遍历一遍找到待删除结点的前一个结点
class DoubleLinkedList<Data> {
    // 虚拟头尾结点
    var head: DoubleLinkedNode<Data>
    var tail: DoubleLinkedNode<Data>

    // 链表结点个数
    var count: Int

    init() {
        self.head = DoubleLinkedNode()
        self.tail = DoubleLinkedNode()

        self.head.next = self.tail
        self.tail.prev = self.head

        self.count = 0
    }

    // 在虚拟头结点之后插入新结点，即在链表的第一个位置插入结点
    func insertFirst(_ newNode: DoubleLinkedNode<Data>) {
        self.insert(newNode, after: self.head)
    }

    // 删除虚拟尾结点的前一个结点，即删除链表最后一个位置的结点，并返回结点的引用
    func removeLast() -> DoubleLinkedNode<Data>? {
        guard let last = tail.prev else { return nil }
        self.remove(last)
        return last
    }

    // 把某个结点移动到链表的第一个位置
    func moveToFirst(_ node: DoubleLinkedNode<Data>) {
        // 先删掉它，再在第一个位置插入
        self.remove(node)
        self.insertFirst(node)
    }

    // 在某个结点之后插入新的结点
    func insert(_ newNode: DoubleLinkedNode<Data>, after prevNode: DoubleLinkedNode<Data>) {
        guard let nextNode = prevNode.next else { return }

        // 新结点的前指针指向新结点前面的结点，新结点后面的结点的前指针指向新结点
        newNode.prev = prevNode
        nextNode.prev = newNode

        // 新结点的后指针指向新结点后面的结点，新结点前面的结点的后指针指向新结点
        newNode.next = nextNode
        prevNode.next = newNode

        // 插入计数 + 1
        self.count += 1
    }

    // 删除结点
    func remove(_ node: DoubleLinkedNode<Data>) {
        guard let prevNode = node.prev, let nextNode = node.next else { return }

        // 待删除结点的后一个结点的前指针指向待删除结点的前一个结点，待删除结点的前一个结点的后指针指向待删除结点的后一个结点
        nextNode.prev = node.prev
        prevNode.next = node.next

        // 删除计数 - 1
        self.count -= 1
    }
}

// 键值对
struct KeyValue<Key, Value> {
    var key: Key
    var value: Value
}

// 双向链表 + 哈希表
// 用哈希字典存储链表的结点引用，可以根据 key 键找到哈希字典中的链表结点引用进而找到链表中存储的 value 值
// 本来哈希字典是没有顺序的，与链表结合可以创造有序字典
class LinkedHashList<Key: Hashable, Value>: DoubleLinkedList<KeyValue<Key, Value>> {
    // 哈希字典 [键: 结点引用]
    var dict: [Key: DoubleLinkedNode<KeyValue<Key, Value>>]

    override init() {
        self.dict = Dictionary()
        super.init()
    }

    subscript(key: Key) -> Value? {
        // key -> node -> value
        get {
            guard let node = self.dict[key] else { return nil }
            guard let data = node.data else { return nil }
            return data.value
        }

        set {
            // newValue 不为 nil 时
            if let newValue = newValue {
                // 已经有键时，修改链表结点的值
                if let node = self.dict[key] {
                    node.data?.value = newValue
                }
                // 没有键时，新建结点，设置哈希字典键对应的结点索引，并把结点插入到链表的第一个位置
                else {
                    let newNode = DoubleLinkedNode<KeyValue<Key, Value>>(KeyValue(key: key, value: newValue))
                    self.dict[key] = newNode
                    self.insertFirst(newNode)
                }
            }
            // newValue 为 nil 时，删除哈希字典索引，并删除链表中的结点 
            else {
                guard let node = self.dict[key] else { return }
                self.dict[key] = nil
                self.remove(node)
            }
        }
    }
 
    // 根据关键字，把某个结点移动到链表的第一个位置
    func moveToFirst(key: Key) {
        guard let node = self.dict[key] else { return }
        self.moveToFirst(node)
    }

    // 删除链表最后一个位置的结点，并把删除哈希字典索引
    func removeLast() { 
        guard let removedNode = super.removeLast() else { return }
        guard let data = removedNode.data else { return }
        self.dict[data.key] = nil
    }
}

// Least Recently Used，最少使用缓存算法
// 设置缓存最大容量，当缓存到达最大容量时，删除最少使用的缓存
class LRUCache<Key: Hashable, Value>: LinkedHashList<Key, Value> {
    // 容量
    var capacity: Int

    init(_ capacity: Int) {
        self.capacity = capacity
    }

    // 获取缓存
    func get(key: Key) -> Value? {
        // 使用过移动到最前
        self.moveToFirst(key: key)
        return self[key]
    }

    // 设置缓存
    func set(key: Key, value: Value) {
        // 使用过移动到最前，如果新建结点，默认插入到最前所以不需要移动到最前
        if let _ = self[key] {
            self.moveToFirst(key: key)
        }
        self[key] = value

        // 超出最大容量时，删除最后面的使用最少的缓存
        if self.count > self.capacity {
            self.removeLast()
        }
    }
}
```
