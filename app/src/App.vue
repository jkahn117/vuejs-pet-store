<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/shared/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar }
}
</script>
