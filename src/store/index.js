import { createStore } from 'vuex'
import general from './modules/general'
import subscribers from './modules/subscribers'
import airlines from './modules/airlines'
import subscriptions from './modules/subscriptions'
import exceptions from './modules/exceptions'

export default createStore({
  modules: {
    general,
    subscribers,
    airlines,
    subscriptions,
    exceptions
  }
})