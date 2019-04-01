import Vue from 'vue'
global.Vue = window.Vue = Vue;

import $ from 'jquery'
global.$ = window.$ = $

import axios from 'axios'
global.axios = window.axios = axios

import App from './App.vue'

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
