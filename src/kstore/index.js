import Vue from "vue"
import KVuex from "./kvuex"

Vue.use(KVuex)

export default new KVuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add (state) {
      state.counter++
    },
    reduce (state) {
      state.counter--
    }
  },
  actions: {
    reduce ({commit}) {
      setTimeout(() => {
        commit('reduce')
      }, 100)
    }
  },
  getters: {
    doubleCount: state => {
      return state.counter * 2
    }
  },
  modules: {}
})
