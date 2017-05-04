<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 error">
        
        <form class="form-signin">
          <h2 class="form-signin-heading">Please sign in</h2>

          <div v-if="message" class="alert alert-danger">
            {{message}}
          </div>

          <label for="username" class="sr-only">Username</label>
          <input type="text" placeholder="username" class="form-control"
            required="required" autofocus name="username" v-model="username" />
          
          <label for="password" class="sr-only">Password</label>
          <input type="password" placeholder="password" class="form-control"
            required="required" name="password" v-model="password" />
          
          <a class="btn btn-lg btn-primary btn-block" v-on:click="signin">
            Sign in
          </a>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',

    data () {
      return {
        username: null,
        password: null
      }
    },

    mounted () {
      $(document).ready(function () {
        $('form input[name="username"]').focus()
      })
    },

    computed: mapGetters([
      'message'
    ]),

    methods: {
      signin () {
        this.$store.dispatch('login', { username: this.username, password: this.password })
          .then(() => {
            if (this.$store.getters.isLoggedIn) {
              this.$router.push('/')
            } else {
              this.message = this.message()
            }
          })
      }
    }
  }
</script>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input {
    margin-bottom: 5px;
  }

  .form-signin button {
    margin-top: 10px;
  }
</style>
