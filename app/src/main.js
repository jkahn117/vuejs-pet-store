// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import { sync } from 'vuex-router-sync'

import store from './store'
import router from './router'

// CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/css/app.css'

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
