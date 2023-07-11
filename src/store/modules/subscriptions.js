import { subscriptionsService } from '@/api/subscriptions.service'

const subscriberObj = new subscriptionsService()

export default {
  namespaced: true,
  state: {
    subscriptionsData: [],
    subscription: {},
    reasons: []
  },
  getters: {
    getSubscriptionsData: state => () => {
      return state.subscriptionsData
    },
    getSubscriptionsQty: state => () => {
      return state.subscriptionsData?.length
    },
    getSubscription: state => () => {
      return state.subscription
    },
    getReasons: state => () => {
      return state.reasons
    },
    getAdditionReasons: state => () => {
      return state.reasons.filter(reason => reason.type === 'addition' || reason.type === 'other')
    },
    getDeductionReasons: state => () => {
      return state.reasons.filter(reason => reason.type === 'deduction' || reason.type === 'other')
    },
  },
  actions: {
    async GET_SUBSCRIPTIONS ({ commit, dispatch}) {
      const response = await subscriberObj.getSubscriptions()
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setSubscriptionsData', response)
    },
    async GET_SUBSCRIPTION ({ commit, dispatch}, subscriptionsId) {
      const response = await subscriberObj.getSubscriptionsById(subscriptionsId)
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setSubscription', response)
    },
    async GET_EXCEPTION_REASONS ({ commit, dispatch}) {
      const response = await subscriberObj.getReasons()
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      commit('setReasons', response)
    },
    // eslint-disable-next-line
    async UPDATE_SUBSCRIPTION ({ commit, dispatch}, subscriptionData) {
      const response = await subscriberObj.updateSubscription(subscriptionData)
      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }
      dispatch('GET_SUBSCRIPTION', response.id)
    },
  },
  mutations: {
    setSubscriptionsData(state, data) {
      state.subscriptionsData = data;
    },
    setSubscription (state, data) {
      state.subscription = data;
    },
    setReasons (state, data) {
      state.reasons = data;
    },
  }
}