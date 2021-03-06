## 简答题
### 第一题
> Webpack 的构建流程主要有哪些环境？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

> 解

  1. 先是在 node_modules 里的 .bin 目录中寻找 webpack.cmd
  2. 开始查找 对应的配置文件，首先找到配置中的 entry
  3. 找到 entry 之后对这个模块的位置进行解析
  4. 使用 loader 对匹配的代码进行编译
  5. 生成 AST 语法树，对对应的依赖进行收集
  6. 对收集到的依赖 对依赖文件重新从 第三步 开始解析以及依赖收集
  7. 对 entry 配置中的文件生成一个 chunk 文件
  8. 对之前收集的依赖表进行遍历，然后分别注入 chunk 文件中
  9. 如果对应的依赖是使用 动态导入的，那么生成单独的chunk ，并将对应的导入方式写入之前的chunk 中
  10. 将对应打包好的文件写入 output 对应的文件夹中

### 第二题
> Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

> 解

> 不同

> loader 主要是处理 不同的静态资源文件的，如导入图片、字体、转换less文件等。
plugin 是 webpack 的扩展，可以用来在webpack 对应的生命周期中对当前找到的所有依赖文件进行不同的处理，如监听开始的时候，运行多进程打包

> 开发思路

> 1. loader 首先确定当前需要处理的文件类型，然后导出 接受 对应文件内容的函数，然后 在函数体中 对这个内容进行处理，
  2. 接着需要导出一段可以运行的js代码，或者可以让接下里loader处理的文件内容

> 1. pugin 导出的对象，或者函数中 需要包含一个 apply 函数
  2. 在这个函数中接收 当前 webpack 生命周期的对象，接着可以选择监听什么阶段的生命周期的钩子，
  3. 最后在这个注册的函数里 对接收到的文件内容处理，并重新导出 文件内容的对象 和文件长度的 size


## 编程题
### 使用 Webpack 实现 Vue 项目打包任务

> 具体任务及说明：
先下载任务的基础代码：https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip
这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
尽可能的使用上所有你了解到的功能和特性

> 本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。

解：
> [视屏百度云链接](https://pan.baidu.com/s/1mY4FygE9Hy38OVDI7qHWng) 密码: ks4f

> [视屏 github 地址](https://github.com/dongceha/homework/blob/master/fed-e-task-02-02/webpack%E4%BD%9C%E4%B8%9A%E5%BD%95%E5%B1%8F.mov)

> [webpack.common.js](https://github.com/dongceha/homework/blob/master/fed-e-task-02-02/code/vue-app-base/webpack.common.js) [webpack.dev.js](https://github.com/dongceha/homework/blob/master/fed-e-task-02-02/code/vue-app-base/webpack.dev.js) [webpack.prod.js](https://github.com/dongceha/homework/blob/master/fed-e-task-02-02/code/vue-app-base/webpack.prod.js)