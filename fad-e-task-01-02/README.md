## 简答题
### 第一题
> 描述引用计数的工作原理和优缺点

> 原理：判断当前的引用数是否为0，是0的话，就可以直接删除

优点：
1. 在计算到没有引用的情况下，可以直接删除该内存

缺点：
1. 无法回收循环引用的对象
2. 空间开销大，得要记录每个对象的引用结果

### 第二题
> 描述标记整理算法的工作流程

1. 遍历所有对象找标记活动对象,其实就是从代码层面 去 找一遍能找到的对象，global 开始查找，找到了就进行标记
2. 遍历 所有对象清除没有标记对象,然后 把所有没有被标记的 给 删除
3. 整理内存，让空间能够连续

### 第三题
> 描述V8中新生代存储区垃圾回收的流程

1. 新生代分为 两个区域，分别为 from 和 to
2. 在from 内存即将用完之前，使用标记的方式将可达的内存复制一遍到达 to 区
3. 在这个过程中，同时会执行内存的整理，将零碎的空间整合成大块的可达区域
4. 这个时候 from 区就会变成 to 区，而to 区就变成了 from 区，循环往复
5. 把 一轮的GC 之后还存活着的内存放到老生代去

### 第四题
> 描述增量标记算法在何时使用，及工作原理

1. 对需要清除的内存进行一点一点地标记，但是并不立即删除
2. 在标记的过程中，超过一段时间就将线程让给 js 线程执行，js 线程 空闲了，就回归给 增量标记对内存进行 标记
3. 等到标记完成了，再对所有标记的 垃圾对象进行一次性删除

## 代码题
> 基于以下代码完成下面四个练习
```js
const fp = require('loadsh/fp')
// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin Onr-77', horsepower: 750, dollar_value: 185000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 130000, in_stock: false },
]
```

### 第一题
> 使用函数组合 fp.flowRight() 重新实现下面这个函数
```js
let isLastInStock = function(cars) {
    // 获取左后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)

}
```

> 解
``` javascript
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
```

### 第二题
> 使用 fp.flowRight()、fp.prop()和fp.first()获取第一个 car 的name

解：
```js
const name = fp.flowRight(fp.prop('name'), fp.first)(cars)
```

### 第三题
> 使用帮助函数_average重构 averageDollarValue，使用函数组合的方式实现
```js
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无需修改

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function(car) {
        return car.dollar_Value
    }, cars)
    return _average(dollar_values)
}
```

解：
```js
let averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
```

### 第四题
> 使用flowRight 写一个sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：
例如：sanitizeNames(['Hello World']) => ['hello_world']

```js
let _underscore = fp.replace(/\W+/g, '_')
// <- 无需改动，并在 sanitizeNames 中使用
```

解
```js
let _underscore = fp.replace(/\W+/g, '_');
const sanitizeNames = fp.map(fp.flowRight(_underscore,fp.toLower))
```


## 代码题2
> 基于以下代码完成下面四个练习
```js
class Container {
    static of (value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}
class Maybe {
    static of (x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = {
    Maybe,
    Container
}
```

### 第一题
> 使用fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1

``` javascript
const fp = require('loadsh/fp')
const {Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = // ... 你需要实现的位置
```
解：
```js
let ex1 = (maybe, num) => {
    return maybe.map(fp.map(fp.add(num)))
}
const added = ex1(maybe, 10)
```

### 第二题
> 实现一个函数ex2，能够使用fp.first 获取列表的第一个元素

```js
const fp = require('loadsh/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray', '', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = // ... 你实现的位置
```

解：
```js
let ex2 = (xs) => xs.map(fp.first)
const first = ex2(xs)
```

### 第三题
> 实现一个函数 ex3，使用safeProp 和 fp.first 找到 user 的名字的首字母

```js
const fp = require('loadsh/fp')
const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex2 = // ... 你需要实现的位置
```

解：
```js
const ex2 = (user, prop) => safeProp(prop, user).map((str) => str[0])
const first = ex2(user, 'name')
```

### 第四题
> 使用Maybe 重写 ex4，不要有 if 语句

```js
const fp = require('loadsh/fp')
const { Maybe, Container } = require('./support')

let ex4 = function(n) {
    if (n) {return parseInt(n)}
}
```

解：
```js
let ex41 = (n) => Maybe.of(n).map(parseInt)
```

