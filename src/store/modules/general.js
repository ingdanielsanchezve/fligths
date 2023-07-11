export default {
  namespaced: true,
  state: {
    errorResponse: {}
  },
  getters: {
    getErrorResponse: state => () => {
      return state.errorResponse
    }
  },
  actions: {
    // eslint-disable-next-line
    async LOAD_DATA ({ commit, dispatch}) {
      try{
        await Promise.all([
          dispatch('subscribers/GET_SUBSCRIBERS', '', { root: true }),
          dispatch('airlines/GET_AIRLINES', '', { root: true }),
          dispatch('subscriptions/GET_SUBSCRIPTIONS', '', { root: true }),
          dispatch('exceptions/GET_EXCEPTIONS', '', { root: true })
        ])
      }catch(err) {
        console.log(err)
      }
    },
    HANDLE_ERROR_RESPONSE ({ commit }, error) {
      commit('setErrorResponse', error)
    }
  },
  mutations: {
    setErrorResponse (state, error) {
      state.errorResponse = {...error };
    }
  }
}