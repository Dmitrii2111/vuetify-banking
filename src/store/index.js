import Vue from 'vue'
import Vuex from 'vuex'
import {createLogger} from "vuex"
import auth from './modules/auth.module'
import request from './modules/request.module'
Vue.use(Vuex)

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}
export default new Vuex.Store({
  plugins,
  state: {
    message: null
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    showMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth,
    request
  }
})
