class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb
        // 把 watcher 对象记录到Dep 类的静态属性 target
        Dep.target = this
        // 访问属性的时候，会自动触发 get
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 当数据发生变化的时候，更新视图
    update() {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return 
        }
        this.oldValue = newValue
        this.cb(newValue)
    }
}