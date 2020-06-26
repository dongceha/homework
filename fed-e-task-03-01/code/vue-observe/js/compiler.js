class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                this.compileElement(node)
            }
            // node 节点是否有子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node) {
        const attrs = node.attributes
        // 遍历所有的属性节点，判断是否是智指令
        Array.from(attrs).forEach(attr => {
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    update(node, key, attrName) {
        let updateFn = this[`${attrName}Updater`]
        updateFn && updateFn.call(this, node, this.vm[key], key)
        if (attrName.startsWith('on:')) {
            this.eventHandler(node, key, attrName)
        }
    }
    eventHandler(node, key, attrName) {
        const event = attrName.substr(3)
        node.addEventListener(event, this.vm[key])
    }
    // 处理 v-text
    textUpdater(node, value, key) {
        node.textContent = value
        // 当数据改变的时候，创建Watcher 对象
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // 处理 v-html
    htmlUpdater(node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    modelUpdater(node, value, key) {
        node.value = value
        // 当数据改变的时候，创建Watcher 对象
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }
    // 编译文本节点，处理插值表达式
    compileText(node) {
        // {{text}}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
            // 当数据改变的时候，创建Watcher 对象
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是问文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}