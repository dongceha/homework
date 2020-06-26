## 简答题
### 第一题
> 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

### 第二题
> 请简述 Diff 算法的执行过程

1. 


## 代码题
### 第一题
>> 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

### 第一题
> 使用函数组合 fp.flowRight() 重新实现下面这个函数


### 第二题
> 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。


### 第三题
> 参考 Snabbdom 提供的电影列表的示例，实现类似的效果，如图：

![image](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/homework2-3.png)

