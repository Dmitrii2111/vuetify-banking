import axios from '../../axios/request'
import {error} from "@/utils/error";

const AUTH_TOKEN = 'jwt-token'

export default {
  namespaced: true,
  state: {
    requests: []
  },
  mutation: {
    setRequest(state, requests) {
      state.requests = requests
    },
    addRequest(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({commit, dispatch, rootGetters}, payload) {
      try {
        const token = rootGetters["auth/token"]
        const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
        dispatch('showMessage', {
          value: 'Заявка успешно создана',
          type: 'success'
        }, {root: true})
        return data.name
      } catch (e) {
        dispatch('showMessage', {
          value: error(e.response.data.error.message),
          type: 'warning'
        }, {root: true})
      }
    },
    async load({ dispatch, rootGetters }) {
      try{
        const token = rootGetters["auth/token"]
        const {data} = await axios.get(`/requests.json?auth=${token}`)
        if (!data) {
          return []
        }
        const requests = Object.keys(data).map(id => ({...data[id], id})) || []
        return requests
      }catch (e) {
        dispatch('showMessage', {
          value: e.message,
          type: 'warning'
        }, {root: true})
      }
    },
    async remove({ dispatch, rootGetters }, id) {
      try{
        const token = rootGetters["auth/token"]
        await axios.delete(`/requests/${id}.json?auth=${token}`, id)
        dispatch('showMessage', {
          value: 'Заявка удалена',
          type: 'success'
        }, {root: true})
      }catch (e) {
        dispatch('showMessage', {
          value: e.message,
          type: 'warning'
        }, {root: true})
      }
    },
    async update({dispatch, rootGetters}, item) {
      try {
        const token = rootGetters["auth/token"]
        await axios.put(`/requests/${item.id}.json?auth=${token}`, item)
        dispatch('showMessage', {
          value: 'Заявка обновлена',
          type: 'success'
        }, {root: true})
      } catch (e) {
        dispatch('showMessage', {
          value: e.message,
          type: 'warning'
        }, {root: true})
      }
    }
  },
  getters: {
    requests(state) {
      return state.requests
    }
  }
}
