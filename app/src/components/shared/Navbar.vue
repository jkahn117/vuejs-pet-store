<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">My Pet Shop</a>
      </div>

      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Help</a></li>
          <li v-if="isLoggedIn"><a v-on:click="logout">Logout</a></li>
        </ul>
        <p v-if="isLoggedIn" class="navbar-text navbar-right">
          Welcome, {{ currentUser.username }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',

    computed: {
      ...mapGetters([
        'currentUser',
        'isLoggedIn'
      ])
    },

    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
</script>
