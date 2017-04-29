<template>
  <div>
    <h1 class="page-header">Our Pets</h1>

    <div class="row highlights">

      <div class="col-xs-6 col-sm-3 highlight" v-for="n in 4" v-if="pets[n]">
        <img src="../../assets/logo.png" class="img-responsive"/>
        <h4>{{ pets[n].name }}</h4>
        <span class="text-muted">{{ pets[n].breed || 'unknown' }} | {{ pets[n].age }} years</span>
      </div>

    </div>

    <h2 class="sub-header">Inventory</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pet in pets">
            <td>{{ pet.id }}</td>
            <td><router-link :to="{ name: 'pet', params: { id: pet.id } }">{{ pet.name }}</router-link></td>
            <td>{{ pet.category }}</td>
            <td>{{ pet.breed || 'unknown' }}</td>
            <td>{{ pet.gender }}</td>
            <td>{{ pet.age }} years</td>
            <td>{{ pet.available }}</td>
            <td>
              <router-link :to="{ name: 'petEdit', params: { id: pet.id, action: 'edit' } }">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                <span class="sr-only">Edit</span>
              </router-link>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {

    computed: mapGetters({
      pets: 'allPets'
    }),

    methods: mapActions([
      'sellPet'
    ]),

    created () {
      this.$store.dispatch('getAllPets')
    }

  }
</script>

<style scoped>
  .highlights {
    margin-bottom: 30px;
    text-align: center;
  }
  .highlights h4 {
    margin-bottom: 0;
  }
  .highlight {
    margin-bottom: 20px;
  }
  .highlight img {
    display: inline-block;
    border-radius: 50%;
    height: 200px;
    width: 200px;
  }
</style>

