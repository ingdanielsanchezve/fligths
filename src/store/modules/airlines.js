import { airlinesService } from '@/api/airlines.service'

const airlineObj = new airlinesService()

export default {
  namespaced: true,
  state: {
    airlinesData: [],
  },
  getters: {
    getAirlinesData: state => () => {
      return state.airlinesData
    },
    getAirlinesQty: state => () => {
      return state.airlinesData?.length
    },
    getAirline: state => (airlineId) => {
      return state.airlinesData.find(airline => airline.id === airlineId)
    }
  },
  actions: {
    async GET_AIRLINES ({ commit, dispatch}) {
      const response = await airlineObj.getAirlines()

      if(response?.error) {
        dispatch('general/HANDLE_ERROR_RESPONSE', response?.error, { root: true })
        return
      }

      commit('setAirlinesData', response);
    },
  },
  mutations: {
    setAirlinesData(state, data) {
      state.airlinesData = data;
    }
  }
}