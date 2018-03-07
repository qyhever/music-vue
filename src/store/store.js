import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// Vuex 自带一个日志插件用于调试
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 启动严格模式，状态变更若不是有mutation函数引起的，将会抛出错误
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()]
});