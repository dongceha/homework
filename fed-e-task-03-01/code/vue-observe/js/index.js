class Vue {
    constructor(options) {
        // 1、通过属性保存选项的数据
        this.$oprtions = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2、把data 中的成员转换成getter 和 setter，注入到 vue 实例中
        this._proxyData(this.$data)
        this._proxyMethods(options.methods)
        // 3、通过调用 observer 对象，监听数据的变化
        new Observer(this.$data)
        // 4、通过compiler对象，解析指令和插值表达式
        new Compiler(this)
    }
    _proxyMethods(methods) {
        const _this = this
        Object.keys(methods).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return methods[key].bind(_this)
                }
            })
        })
    }
    _proxyData(data) {
        // 遍历data 中的所有属性
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set (newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
 
}