function defineReactive (obj, key, val) {
    // val可能是对象
    observe(val)

    // 每执行一次，创建一个Dep的实例
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get () {
            // console.log('get', val)
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set (newVal) {
            if (newVal !== val) {
                // 值改变，进行update更新
                // console.log('set', newVal)
                observe(newVal)
                // 通知更新
                val = newVal
                dep.notify()
            }
        }
    })
}

// 处理响应式数据
function observe (obj) {
    // 判断obj类型，必须为对象
    if (typeof obj !== 'object' || obj === null) return
    new Observer(obj)
}

// 实现一个KVue类
class KVue {
    constructor (options) {
        // 保存数据
        this.$options = options;
        this.$data = this.$options.data
        this.$metheds = this.$options.methods

        // 响应化处理
        observe(this.$data)

        // 代理
        this.proxy(this)

        // 编译
        new Compile('#app', this)
    }

    // 将$data中的key代理到KVue的实例上
    proxy (vm) {
        Object.keys(vm.$data).forEach(key => {
            Object.defineProperty(vm, key, {
                get () {
                    return vm.$data[key]
                },
                set (v) {
                    vm.$data[key] = v
                }
            })
        })
    }
}

// 每一个响应式对象，伴生一个Observer实例
class Observer {
    constructor (value) {
        this.value = value
        // 判断对象是obj还是数组
        this.walk(value)
    }

    walk (obj) {
        Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
    }
}

// 编译过程，new Compile(el, vm)
class Compile {
    constructor (el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if (this.$el) {
            this.compile(this.$el)
        }
    }

    compile (el) {
        // 递归遍历el，判断其类型
        el.childNodes.forEach(node => {
            // 判断其类型
            if (this.isElement(node)) {
                console.log('编译元素', node.nodeName)
                this.compileElement(node)
            } else if (this.isText(node)) {
                console.log('编译插值表达式', node.textContent)
                this.compileText(node)
            }

            // 递归调用子节点
            node.childNodes && this.compile(node)
        })
    }

    // 是否为元素
    isElement (node) {
        return node.nodeType === 1
    }

    // 判断是否是插值表达式
    isText (node) {
        // debugger
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 插值文本编译
    compileText (node) {
        // 获取匹配表达式
        // node.textContent = this.$vm[RegExp.$1]
        this.update (node, RegExp.$1, 'text')
    }

    // 编译元素
    compileElement (node) {
        // 获取节点属性
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            // k-xxx='aaa'
            const attrName = attr.name // k-xxx
            const exp = attr.value // aaa
            // 判断这个属性类型
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            } else if (attrName.startsWith('@')) {
                // 事件名称
                const eventName = attrName.substring(1)
                this.compileMetheds(node, eventName, exp)
            }
        })
    }

    // 处理绑定的事件
    compileMetheds (node, eventName, methodName) {
        // console.log(this.$vm.$options.methods[exp](), 777)
        node.addEventListener(eventName, () => {
            this.$vm.$options.methods[methodName].call(this.$vm)
        })
    }

    // 是否是指令
    isDirective (attrName) {
        return attrName.indexOf('k-') === 0
    }

    // 文本指令
    text (node, exp) {
        // node.textContent = this.$vm[exp]
        this.update (node, exp, 'text')
    }

    // html指令
    html (node, exp) {
        // node.innerHTML = this.$vm[exp]
        this.update (node, exp, 'html')
    }

    htmlUpdater (node, value) {
        node.innerHTML = value
    }

    textUpdater (node, value) {
        // debugger
        node.textContent = value
    }

    // 更新函数，所有的动态绑定都需要创建更新函数以及对应的Watcher实例
    update (node, exp, dir) {
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        // 更新
        new Watcher(this.$vm, exp, val => {
            fn && fn(node, val)
        })
    }
}

// Watcher：依赖
class Watcher {
    constructor (vm, key, updateFn) {
        this.$vm = vm
        this.key = key
        this.updateFn = updateFn

        // 读一次数据，触发defineReactive里面的get
        Dep.target = this
        this.$vm[this.key]
        Dep.target = null
    }

    // 更新函数
    update () {
        // 传入当前最新值给更新函数
        this.updateFn.call(this.$vm, this.$vm[this.key])
    }
}

//
class Dep {
    constructor () {
        this.deps = []
    }

    // 收集依赖
    addDep (watcher) {
        this.deps.push(watcher)
    }

    // 通知对应的watcher去执行更新操作
    notify () {
        this.deps.forEach(watcher => watcher.update())
    }
}