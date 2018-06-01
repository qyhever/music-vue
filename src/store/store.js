import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import * as getters from './getters'
// import * as actions from './actions'
import mutations from './mutations'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  // actions
})