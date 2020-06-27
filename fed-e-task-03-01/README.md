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
解
> 1、不是响应式的，如果想要变成响应式的
```js
this.$set(this.dog,'name','Trump')
```
> 2、原理是调用了 vue内部的监听observe函数，手动给 this.dog 设置name 属性的监听

### 第二题
> 请简述 Diff 算法的执行过程

1. 获取老节点的排头和排尾，以及新节点的排头和排尾
2. 遍历一直到老节点排头和排尾都为 存在的值结束
3. 当 ***老节点的排头和新节点的排头是相同节点***的时候 进入 patchVnode ，开始进一步比较这两个节点，同时 新老节点的排头和排尾往后移动一位
4. ***老节点的排尾和新节点的排尾是相同节点*** 的时候，进入 patchVnode，同时新老节点的排尾 向前移动一位
5. 当 ***老节点的排头和新节点的排尾 是相同节点*** 的时候，进入 patchVnode 深度比较，然后对 节点在 dom 上的位置进行移动，接着老节点的排头往后移动，新节点的排尾往前移动、
6. 当 ***老节点的排尾和新节点的排头是相同节点*** 的时候，进入 patchVnode 深入比较，然后对 对应的节点在 dom 上的位置进行移动，然后 老节点的排尾向前移动，新节点的排头向后移动
7. 当 前面的 3、4、5、6 都不符合之后，将 ***老节点的 key 和对应的index 作为一个 map 对象保存起来***
8. 然后将新节点剩下的节点 对应的 ***key 寻找老节点对应相同的 key***
9. 如果存在相同的节点，将对应的节点 进入 patchVnode，然后将老节点 key 对应的value 职位 undefined，也就是删除，接着将老节点插入
10. 如果最后遍历结束，***新节点还有剩余，那创建新节点，如果老节点还有剩余，那删除老节点***


## 代码题
### 第一题
> 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
> [vue-router地址](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/code/vue-router/index.js)
```js
// 修改点：当 初始化的时候，location没有 hash 的时候，给路径加上 #/
...
beforeCreate() {
    if (this.$options.router) {
        _Vue.prototype.$router =  this.$options.router
        this.$options.router.init()
++      if (!window.location.hash && this.$options.router.mode === 'hash') {
++          history.replaceState({}, '', '#/')
++      }
    }
}
...
// 初始化的时候，增加对 mode 的获取
constructor(options) {
    this.options = options
++  this.mode = options.mode || 'hash'
    // 路由地址：组件
    this.routeMap = {}
    // 响应式的 
    this.data = _Vue.observable({
        current: '/home1'
    })
}
// 修改 router-link 跳转的路由
initComponents(Vue) {
++  let mode = this.mode === 'hash' ? '/#' : ''
    Vue.component('router-link', {
        props: {
            to: String
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: this.to,
                },
                on: {
                    click: this.clickHandler
                }
            }, [this.$slots.default])
        },
        methods: {
            clickHandler(e) {
                e.preventDefault()
++              history.pushState({}, '', mode + this.to)
                this.$router.data.current = this.to;
            } 
        }
    })
    ...
}
...
// 增加对 hashchange 事件的监听
initEvent() {
    // 监听路由变化的时候，把当前的路由赋值给 当前的值
    // 比如点击 浏览器的前进和后退
++  if (this.mode === 'hash') {
++      window.addEventListener('hashchange', () => {
++         this.data.current = window.location.hash.substr(1)
++      })
++  } else {
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname
        })
    }
}
```

### 第二题
> 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

> 加入 v-html 指令 [index.js](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/code/vue-observe/js/index.js) [compiler.js](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/code/vue-observe/js/compiler.js)
```js
// compiler.js
...
// 处理 v-html
++  htmlUpdater(node, value, key) {
++      node.innerHTML = value
++      new Watcher(this.vm, key, (newValue) => {
++          node.innerHTML = newValue
++      })
++  }
...
```
> 加入 v-on 指令
```js
// index.js
    constructor(options) {
        ...
        this._proxyData(this.$data)
++      this._proxyMethods(options.methods)
        // 3、通过调用 observer 对象，监听数据的变化
        new Observer(this.$data)
        // 4、通过compiler对象，解析指令和插值表达式
        new Compiler(this)
    }
++  _proxyMethods(methods) {
++      const _this = this
++     Object.keys(methods).forEach(key => {
++         Object.defineProperty(this, key, {
++              enumerable: true,
++              configurable: true,
++              get() {
++                  return methods[key].bind(_this)
++              }
++          })
++      })
++  }

// compiler.js
update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    updateFn && updateFn.call(this, node, this.vm[key], key)
++  if (attrName.startsWith('on:')) {
++      this.eventHandler(node, key, attrName)
++  }
}
++  eventHandler(node, key, attrName) {
++      const event = attrName.substr(3)
++      node.addEventListener(event, this.vm[key])
++  }
```


### 第三题
> 参考 Snabbdom 提供的电影列表的示例，实现类似的效果，如图：

![image](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/homework2-3.png)

> [代码地址](https://github.com/dongceha/homework/tree/master/fed-e-task-03-01/code/snabbdom-demo) [打包后的地址](https://github.com/dongceha/homework/tree/master/fed-e-task-03-01/code/snabbdom-demo/build)

![image](https://github.com/dongceha/homework/blob/master/fed-e-task-03-01/Snabbdom_gif.gif)