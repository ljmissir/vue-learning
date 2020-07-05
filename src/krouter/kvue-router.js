let KVue

class VueRouter {
    constructor (options) {
        this.$options = options

        window.addEventListener('hashchange', this.onHashchange.bind(this))
        window.addEventListener('load', this.onHashchange.bind(this))

        // 设置响应式数据
        // const initial = window.location.hash.slice(1) || '/'
        // KVue.util.defineReactive(this, 'current', initial)

        // 设置响应式数据
        this.current = window.location.hash.slice(1) || '/'
        KVue.util.defineReactive(this, 'matched', [])

        // 缓存path和route的映射关系
        // this.routeMap = {}
        // this.$options.routes.forEach(route => {
        //     this.routeMap[route.path] = route
        // })
        // 递归遍历路由表，获取匹配关系
        this.match()
    }

    onHashchange () {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }

    // 递归匹配路由表
    match (routes) {
        routes = routes || this.$options.routes
        for (const route of routes) {
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }
            if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                if (route.children) {
                    this.match(route.children)
                }
                this.matched.push(route)
                return
            }
        }
    }
}

VueRouter.install = function (Vue) {
    KVue = Vue
    KVue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                KVue.prototype.$router = this.$options.router
            }
        }
    })

    // 实现router-link组件
    KVue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render (h) {
            return h(
                'a',
                {
                    attrs: {
                        href: '#' + this.to
                    }
                },
                this.$slots.default
            )
        }
    })

    // 实现router-view组件
    KVue.component('router-view', {
        render (h) {
            // this.$vnode为当前组件实例的虚拟dom
            // 对当前router-view进行深度标记
            this.$vnode.data.routerView = true
            let depth = 0
            let parent = this.$parent
            while(parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData) {
                    if (vnodeData.routerView) {
                        depth++
                    }
                }
                parent = parent.$parent
            }
            // const current = this.$router.current
            // const route = this.$router.$options.routes.find(route => route.path === current)
            // const comp = route ? route.component : null

            // const {routeMap, current} = this.$router
            // const comp = routeMap[current] ? routeMap[current].component : null

            // 根据当前router-view深度depth，从this.matched数组里找到对应的挂在组件，并渲染该组件
            let comp = null
            const route = this.$router.matched[depth]
            if (route) {
                comp = route.component
            }
            return h(comp)
        }
    })
}

export default VueRouter