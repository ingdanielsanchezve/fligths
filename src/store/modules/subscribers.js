import { SubscribersService } from '@/api/subscribers.service'

const subscriberObj = new SubscribersService()

export default {
  namespaced: true,
  state: {
    subscribersData: [],
  },
  getters: {
    getSubscribersData: state => () => {
      return state.subscribersData
    },
    getSubscribersQty: state => () => {
      return state.subscribersData?.length
    }
  },
  actions: {
    async GET_SUBSCRIBERS ({ commit, dispatch}) {
      try{
        const response = await subscriberObj.getSubscribers()
        if(response?.error) {
          dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
          return
        }
        commit('setSubscribersData', response);
      } catch(err) {
        console.log(err)
      }
    },
  },
  mutations: {
    setSubscribersData(state, data) {
      state.subscribersData = data;
    }
  }
}