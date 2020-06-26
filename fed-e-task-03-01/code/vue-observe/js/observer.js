class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1、判断data是否是对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2、判断data 对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        this.walk(val)
        const _this = this
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue) {
                if (newValue === val) {
                    return
                }
                val = newValue
                _this.walk(newValue)
                dep.notify()
            }
        })
    }
}
