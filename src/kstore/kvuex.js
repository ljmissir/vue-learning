let KVue

class Store {
    constructor (options) {
        this._mutations = options.mutations
        this._actions = options.actions

        // this指向绑定
        const store = this
        const {commit, action} = this
        this.commit = function boundCommit (type, payload) {
            commit.call(store, type, payload)
        }
        this.action = function boundAction (type, payload) {
            return action.call(store, type, payload)
        }
        // 初始化当前getters
        let curGetters = {}
        // 从Store中取gettes进行遍历
        Object.keys(options.getters).forEach(key => { 
            curGetters[key] = () => {
                return options.getters[key](options.state)
            }       
        })

        // 设置我响应式数据
        this._vm = new KVue({
            data: {
                $$state: options.state
            },
            computed: curGetters
        })
        console.log('天王盖地虎', '学习使我快乐')
    }

    // 取state
    get state () {
        return this._vm._data.$$state
    }

    // 取gettes
    get getters() {
        return this._vm
    }

    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            console.log('unknow mutation type')
            return
        }
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.log('unknow action type')
            return
        }
        return entry(this, payload)
    }

}

function install (Vue) {
    KVue = Vue
    KVue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                KVue.prototype.$store = this.$options.store
            }
        },
    })
}

export default {Store, install}