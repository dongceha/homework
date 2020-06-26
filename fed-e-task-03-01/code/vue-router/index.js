let _Vue
export default class VueRouter {
    static install(Vue) {
        // 1、判断当前插件是否已经被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        // 2、把Vue 构造函数记录到全局变量
        _Vue = Vue
        // 3、把创建Vue 实例的时候传入 router 对象
        // 混入。
        _Vue.mixin({
            // 只在Vue 的实例之中安装，不在组件内安装
            // 这样每个组件都能有 这个样一个东西了
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router =  this.$options.router
                    this.$options.router.init()
                    if (!window.location.hash && this.$options.router.mode === 'hash') {
                        history.replaceState({}, '', '#/')
                    }
                }
            }
        })
    }
    constructor(options) {
        this.options = options
        this.mode = options.mode || 'hash'
        // 路由地址：组件
        this.routeMap = {}
        // 响应式的 
        this.data = _Vue.observable({
            current: '/home1'
        })
    }
    init() {
        this.initRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    initRouteMap() {
        // 遍历所有的路由规则，然后放到 routeMap 中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }
    // 初始化 router-link
    initComponents(Vue) {
        let mode = this.mode === 'hash' ? '/#' : ''
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
                    history.pushState({}, '', mode + this.to)
                    this.$router.data.current = this.to;
                } 
            }
            // tempalet: '<a :href="to"><slot></slot></a>'
        })
        const _this = this
        Vue.component('router-view', {
            render(h) {
                const component = _this.routeMap[_this.data.current]
                return h(component)
            }
        })
    }
    initEvent() {
        // 监听路由变化的时候，把当前的路由赋值给 当前的值
        // 比如点击 浏览器的前进和后退
        if (this.mode === 'hash') {
            window.addEventListener('hashchange', () => {
                this.data.current = window.location.hash.substr(1)
            })
        } else {
            window.addEventListener('popstate', () => {
                this.data.current = window.location.pathname
            })
        }
    }
}