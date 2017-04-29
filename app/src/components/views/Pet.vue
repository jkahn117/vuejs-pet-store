<template>
  <div v-if="pet">
    <div class="page-header">
      <div class="pull-right">
        <button class="btn btn-info">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;
          Edit
        </button>
      </div>

      <h1>{{ pet.name }}</h1>
    </div>

    <div class="row">
      <div class="col-xs-6 col-sm-3">
        <img src="../../assets/logo.png" class="img-responsive"/>
      </div>

      <div class="col-xs-6 col-sm-9" v-if="action != 'edit'">
        <table class="table table-striped table-responsive">
          <tbody>
            <tr>
              <th scope="row">Category</th>
              <td>{{ pet.category }}</td>
            </tr>
            <tr>
              <th scope="row">Breed</th>
              <td>{{ pet.breed || 'unknown' }}</td>
            </tr>
            <tr>
              <th scope="row">Age</th>
              <td>{{ pet.age }} years</td>
            </tr>
            <tr>
              <th scope="row">Available?</th>
              <td>{{ pet.available }}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>{{ pet.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-xs-6 col-sm-9" v-if="action == 'edit'">
        Edit Form
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {

    computed: {
      ...mapGetters({
        pet: 'currentPet'
      }),

      action () {
        return this.$store.state.route.params.action
      }
    },

    created () {
      this.$store.dispatch('updateCurrentPet', this.$store.state.route.params.id)
    }

  }
</script>
