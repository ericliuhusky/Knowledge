# JavaScript

## 1. 事件代理

借助点击时事件(event)会附带被点击的元素的DOM子树(target)；当给很多元素添加事件的时候，可以给这些元素的
共同父元素添加事件，借助target和事件冒泡传递，使父元素代理子元素的事件处理

## 2. prototype

```javascript
class C {
    a = 1
}

C.prototype.getA = function (x) {
    return this.a + x
}

new C().getA(2)
```

## 3. 闭包

- ### 外向内传递值
  
```javascript
var a = 1
function f() {
    console.log(a)
}

f()
```

- ### 内向外传递值

```javascript
function f() {
    var a = 1
    return a
}

console.log(f())
```

```javascript
function f(callback) {
    var a = 1
    callback(a)
}

f(a => {
    console.log(a)
})
```

## 4. undeclared是语法错误表示没有声明，undefined表示根本未被定义，null是被定义了但是被定义的是空值

## 5. == 相等运算符， === 严格相等运算符

## 6. "use strict"严格模式下，不允许使用未声明的变量

## 7. 编译阶段，函数声明和变量声明会被提前到环境顶部，函数声明的优先级又高于变量声明；据此来分析js代码

## 8. 模块模式，减少命名冲突

```javascript
var m = (function () {
    function a() {
        console.log('a')
    }

    function b() {
        console.log('b')
    }

    return {
        a,
        b
    }
})()

m.a()
```

## 9. call 和 apply 的用法

```javascript
function f1(x, y, z) {
    console.log(x, y, z)
}

function f2(x, y, z) {
    console.log(x, y, z)
    f1.apply(this, arguments)
}
f2.call(this, 1, 2, 3)
```

## 10. async, await 和 Promise

```javascript
function callback({ data, success, fail }) {
    setTimeout(() => {
        if (data.flag) {
            success('success')
        } else {
            fail('error')
        }
    }, 1000)
}

async function asyncPromise(data) {
    return await new Promise((resolve, reject) => {
        callback({
            data: {
                flag: data.flag
            },
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

(async () => {
    let res = await asyncPromise({
        flag: true
    })
    console.log(res)
})()
```
