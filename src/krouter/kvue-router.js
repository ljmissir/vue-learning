let KVue

class VueRouter {
    constructor (options) {
        this.$options = options

        window.addEventListener('hashchange', this.onHashchange.bind(this))
        window.addEventListener('load', this.onHashchange.bind(this))

        const initial = window.location.hash.slice(1) || '/'

        // 设置响应式数据
        KVue.util.defineReactive(this, 'current', initial)

        // 缓存path和route的映射关系
        this.routeMap = {}
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route
        })
    }

    onHashchange () {
        this.current = window.location.hash.slice(1)
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
            // const current = this.$router.current
            // const route = this.$router.$options.routes.find(route => route.path === current)
            // const comp = route ? route.component : null
            const {routeMap, current} = this.$router
            const comp = routeMap[current] ? routeMap[current].component : null
            return h(comp)
        }
    })
}

export default VueRouter