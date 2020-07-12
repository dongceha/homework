### 第一题
> 请简述 Vue 首次渲染的过程。

  1. 首先 执行 vue 实例的 _init 函数
  2. _init 函数给当前实例 注入 父子关系、响应事件、h 函数、执行 钩子函数、设置数据的响应式、注入provide
  3. 挂载 整个页面，如果传入 render 函数的话，获取 render 函数，如果没有的话，就 将 template 或者 el 的outerHTML 编译成 render 函数，同时 **生成 当前组件的 渲染 Watcher ，将 render 函数作为回调函数 传入**
  4. 渲染 Watcher 被创建的时候，就会开始执行 对应的 get ，也就是 render 函数
  5. 在 render 函数中，会获取当前 data 中的数据，这样就会触发 数据响应式中的 getter 函数，进行依赖收集
  6. 这样在以后的数据更新中，就会执行 对应的 渲染watcher 了 
  7. 然后 将render 生成 的 **vnode 生成对应的 dom 节点挂载到 页面上**
  8. 移除 el 节点

### 第二题
> 请简述 Vue 响应式原理。

  1. 使用了 defineProperty 的 get set 参数来对数据进行响应式的绑定
  2. 当前 **数据为 数组的时候** ，就修改 数组的 __proto__ 的指向，指向自定义的 函数集，其主要还是在执行完毕之后，执行了 ob.dep.notify() 函数，通知渲染watcher 进行改变
  3. 当前 **数据为 对象时** ，遍历对象的每一个值，进行 响应式处理
  4. 当前 **数据为 computed 时** ，设置当前的 lazy 和 dirty 为 true，只有当依赖的数据改变了之后，才会改变 dirty 为 true，这样在执行 当前 computed 的 getter 的时候会 调用 当前依赖的 watcher evaluate，获取当前 computed 的值的同时，将 dirty 置为 false，让下次 获取从缓存中拿
  5. 当前 **数据为 watch 侦听器的时候** ，调用 $watch ，然后创建 用户 watcher，将 传入的 handler 传入作为 cb
  6. 然后 在 渲染 watch 初始化的时候，就会执行一遍  cb，执行 render 函数
  7.  **render 函数 会获取 当前实例的 data ，然后就会触发 响应式定义的 getter**
  8. 这个时候就会 **进行响应式依赖的收集**
  9. 这样在以后的 set 之后，就会执行 对应的渲染 watcher 了，执行 更新操作


### 第三题
> 请简述虚拟 DOM 中 Key 的作用和好处。

> 作用: 可以 让 vnode 在 diff 的过程中找到对应的节点，然后成功复用
> 好处: 减少 dom 的操作，减少 diff 和渲染所需要的时间

### 第四题
> 请简述 Vue 中模板编译的过程。

  1. 缓存 公共的 mount 函数，并重写 浏览器平台的 mount
  2. 判断 是否传入了 render 函数，没有的话，是否传入了 template ，没有的话，则获取 el 节点的 outerHTML 作为 template
  3. 调用 baseCompile 函数
  4. 将 **模板编译成 AST 抽象语法树**
  5.  **优化抽象语法树，设置 静态节点和静态根节点**
  6. 通过 generate **将 AST 抽象语法树转换为 render 函数的 js 字符串**
  7. 将 render 函数 通过 createFunction 函数 **转换为 一个可以执行的函数**
  8. 将 最后的 **render 函数 挂载到 option 中**
  9. 执行 公共的 mount 函数