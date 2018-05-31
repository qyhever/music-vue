// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick'
fastclick.attach(document.body)

import './assets/stylus/index.styl'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/images/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
