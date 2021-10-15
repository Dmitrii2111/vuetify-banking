
import axios from 'axios'
import {error} from "@/utils/error";

const AUTH_TOKEN = 'jwt-token'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(AUTH_TOKEN)
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(AUTH_TOKEN, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(AUTH_TOKEN)
    }
  },
  actions: {
    async login({commit, dispatch}, userData) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...userData, returnSecureToken: true})
        commit('setToken', data.idToken)
      } catch (e) {
        dispatch('showMessage', {
          value: error(e.response.data.error.message),
          type: 'error'
        }, {root: true})
        throw new Error(e)
      }
    },
    async registration({commit, dispatch}, userData) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...userData, returnSecureToken: true})
        commit('setToken', data.idToken)
        dispatch('showMessage', {
          value: 'Регистрация прошла успешно',
          type: 'success'
        }, {root: true})
      } catch (e) {
        dispatch('showMessage', {
          value: error(e.response.data.error.message),
          type: 'warning'
        }, {root: true})
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    }
  }
}
