import { exceptionsService } from '@/api/exceptions.service'

const exceptionObj = new exceptionsService()

export default {
  namespaced: true,
  state: {
    exceptionsData: [],
    exceptions: [],
  },
  getters: {
    getExceptionsData: state => () => {
      return state.exceptionsData
    },
    getExceptionsQty: state => () => {
      return state.exceptionsData?.length
    },
    getExceptions: state => {
      return state.exceptions
    },
  },
  actions: {
    async GET_EXCEPTIONS ({ commit, dispatch}) {
      const response = await exceptionObj.getExceptions()
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setExceptionsData', response)
    },
    async CREATE_EXCEPTION ({ commit, dispatch}, exceptionData) {
      const response = await exceptionObj.createException(exceptionData)
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setExceptionsData', response)
    },
    async GET_EXCEPTIONS_BY_SUBSCRIPTION ({ commit, dispatch}, subscriptionId) {
      const response = await exceptionObj.getExceptionsBySubscriptionId(subscriptionId)
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setExceptions', response)
    },
  },
  mutations: {
    setExceptionsData(state, data) {
      state.exceptionsData = data
    },
    setExceptions(state, data) {
      state.exceptions = data
    }
  }
}