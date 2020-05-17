### 第一题
> 请说出下列最终的执行结果，并解释为什么

``` javascript
var a = []
for (var i = 0; i < 10; i ++) {
    a[i] = function() {
        console.log(i)
    }
}
a[6]();
```
> 执行结果 是** 10**
解释： 在运行的过程之中，i 进行了 变量提升，全局只有一个 i ，而在 function 中的 i 指向的也是 同一个 i
在执行完毕 遍历之后，i 的值为 10，所以 输出的 a[6]() 输出的值 也是 10

### 第二题
> 请说出下列最终的执行结果，并解释为什么

``` javascript
var tmp = 123
if (true) {
    console.log(tmp)
	let tmp
}
```
> 执行结果 是 **报错**
解释： 在 if 中的 {} 中 使用了 let 定义了 tmp，这就导致了 {} 形成了 一个暂时性死区，在定义之前 都不能使用 let 定义的 tmp

### 第三题
> 结合ES6 新语法，用最简单的 方式找出 数组中的最小值

``` javascript
var arr = [12, 34, 32, 89, 4]
```
>解
```js
var min = Math.min(...arr)
```

### 第四题
> 请详细说明var，let，const 三种声明变量的方式之间的具体区别？

``` javascript
var 是 es6 之前定义 变量的关键字，而let const 是es6 之后新增的 定义变量的关键字
var 定义的变量 只有全局作用域 和函数作用域，而let 和const 有 {} 作用域
var 定义的变量能够 重复 声明，而let 和 const 定义的变量不能 重复声明
var 定义的变量 有变量 提升的效果，也就是在定义之前也能使用，而 let 和 const 只能在定义之后使用，存在暂时性死区
var 和 let 定义的变量 能够在 定义之后被改变，而const 定义的变量在定义之后不能改变
```

### 第五题
> 请说出下列代码最终输出的结果，并解释为什么

``` javascript
var a = 10
var obj = {
    a: 20,
    fn() {
	    setTimeout(() => {
	        console.log(this.a)
	    })
	}
}
```
> 执行结果 是 20
解释：在这里，函数fn的 this 指向的是其调用者，而 在 setTimeout 中使用了箭头函数 ，使得其内部的this 指向了 fn 的 this ，也就是 obj，所以 输出结果就是 obj.a === 20

### 第六题
> 简述 Symbol 类型的 用途
1. 用来描述 第一无二的变量，防止被开发者无意之中覆盖掉这个变量 或者产生冲突
2. 在 代码的运行中，如果采用了 虚拟dom，可以将 自己定义的 symbol 挂载这上面，防止 xss 注入
3. 在 Symbol 上面挂载着各种类型的 接口，如 iterator toPrimitive 等内置对象，可以使用这些内置对象来对 Number、String 等 对象修改 对应的实现

### 第七题
> 说说什么是浅拷贝，什么是深拷贝
深拷贝：
   对于 对象的每一层普通的 对象和 基本类型 进行了 复制，并 对于 function 和 Symbol 等特殊对象的引用进行了 复制
浅拷贝：
  只是 对 对象的第一层内容 做了一个复制，不改变里面的 引用

### 第八题
> 谈谈你是如何理解js异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？
1. js 的运行时单线程的，js 异步编程是 将 某一个函数的执行权力移交给 另外一个 函数执行到某一个阶段之后再去执行。也即是改变 某一个函数的执行时机
2. Event Loop 是 js 线程的执行机制，其维护着一个执行队列，在当前的 宏任务中，让每一个需要执行的函数 入栈，然后 出栈执行
3. 宏任务 就是 一次js 运行线程 完整的 入栈出栈的 整个执行过程，如 script 标签、setTimeout等 都是宏任务
4. 微任务是在每个 宏任务 之后维持着 一个 微任务队列，然后在当前宏任务执行结束之前，将 微任务队列出列，依次执行 所有的微任务，如 Promise,MutationOserver 就是 微任务


### 第九题
> 将下面异步代码使用Promise 改进

``` javascript
setTimeout(function() {
    var a = "hello"
	setTimeout(function() {
	    var b = "lagou"
		setTimeout(function() {
		    var c = "I U"
			console.log(a + b + c)
		})
	})
})
```
>解
```js
async function abc() {
    let a = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello')
        }, 20)
    })
    let b = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('lagou')
        }, 20)
    })
    let c = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('I U')
        }, 20)
    })
    console.log(a + b + c)
}
```

### 第十题
> 请简述 ts 和 js 之间的关系

ts 是 js  的超集，在js 的基础之上，定义了 一套类型系统，最后还是编译为 js 进行 运行

### 第十一题
> 谈谈你所认为的 ts 的优缺点

> **优点**
1. 对 js 的类型系统做出了 定义，方便 大型应用、多人合作的开发
2. 有了类型的定义，对于 包等外部引用 都方便了很多，可以得到良好的 编辑器提示
3. 了解了每个参数的 类型定义之后，以后想要对代码进行重构 或者 额外的开发会方便很多

> **缺点**
1. 学习的成本较高
2. 对于 多层嵌套的 复杂数据结构 的定义 需要 很麻烦的 编写
3. 在很多的情况下，失去了 js 语言灵活的特点，同时不能 灵活的自动进行类型转换，导致很多的 代码不能向前兼容
