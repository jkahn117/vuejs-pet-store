<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import AuthLayout from './components/AuthLayout.vue'

import Navbar from './components/shared/Navbar.vue'

export default {
  name: 'app',
  components: { Login, AuthLayout, Navbar }
}

/**
 * // Check local storage to handle refreshes
  if (window.localStorage) {
    var localUserString = window.localStorage.getItem('user') || 'null'
    var localUser = JSON.parse(localUserString)

    if (localUser && store.state.user !== localUser) {
      store.commit('SET_USER', localUser)
      store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    }
  }
 */
</script>
