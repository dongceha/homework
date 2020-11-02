## 简答题
### 第一题
> 请简述 React 16 版本中初始渲染的流程

> 1. 通过babel将jsx转换为React.createElement函数
> 2. 清空container节点的所有子节点
> 3. 生成对应的FiberRoot
> 4. 创建根节点对应的rootFiber
> 5. 强制同步渲染这一次的 Fiber 节点
> 6. 调用对应的生命周期以及useEffect hook

### 第二题
> 为什么 React 16 版本中 render 阶段放弃了使用递归

> 使用递归来render的话，无法在对比的过程中停止下来，会对页面造成卡顿
> 在React 16中使用了循环来模拟递归，可以在浏览器空闲时间来进行Fiber的比对


### 第三题
> 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

> 1. 循环执行类组件的 getSnapShotBeforeUpdate 生命周期
> 2. 将对应的fibernode 插入真实的父dom节点中
> 3. 循环执行hooks 钩子函数，以及componentDidMount

### 第四题
> 请简述 workInProgress Fiber 树存在的意义是什么

> 这个是双缓存，workInProgress Fiber 是在缓存中的 Fiber 树，先在缓存中构建好需要的Fiber树，在真正需要渲染的时候再直接使用缓存中的 树渲染，加快渲染速度