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
