<template>
  <div v-if="pet">
    <div class="page-header">
      <div class="pull-right" v-if="action != 'edit'">
        <router-link :to="{ name: 'petEdit', params: { id: pet.uuid, action: 'edit' }}" class="btn btn-info">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          Edit
        </router-link>
      </div>

      <h1><span v-if="action == 'edit'">Editing:</span> {{ pet.name }}</h1>
    </div>

    <div class="row">
      <div class="col-xs-6 col-sm-3">
        <img :src="pet.imageUrl || defaultImage()" class="img-responsive"/>
        <div v-if="action == 'edit'">
          <button class="btn btn-info btn-xs pull-left" v-on:click="editImage" v-if="action == 'edit'">
            Edit
          </button>
          <span class="small" id="image-upload-status"></span>
          <form enctype="multipart/form-data" novalidate>
            <input type="file" id="petImageFile" accept="image/*" required />
          </form>
        </div>
      </div>

      <!-- details -->
      <div class="col-xs-5 col-sm-8" v-if="action != 'edit'">
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
      </div> <!-- end pet detail -->

      <!-- edit -->
      <div class="col-xs-5 col-sm-8" v-else>
        <div v-if="errorMessage" class="alert alert-danger">
          {{errorMessage}}
        </div>

        <form v-on:submit.prevent="onSubmit" id="petForm" name="petForm">
          <div class="form-group">
            <label for="petName">Name</label>
            <input :value="pet.name" placeholder="name" id="petName" name="name" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="petCategory">Category</label>
            <select :value="pet.category" id="petCategory" name="category" class="form-control">
              <option disabled value="">Please select one</option>
              <option>Bird</option>
              <option>Cat</option>
              <option>Dog</option>
              <option>Fish</option>
              <option>Reptile</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="petBreed">Breed</label>
            <input :value="pet.breed" placeholder="breed" id="petBreed" name="breed" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="petGender">Gender</label>
            <select :value="pet.gender" id="petGender" name="gender" class="form-control">
              <option disabled value="">Please select one</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div class="form-group">
            <label for="petAge">Age</label>
            <input :value.number="pet.age" placeholder="age" id="petAge" name="age" class="form-control"/>
          </div>

          <div class="form-group">
            <label for="petAvailable">Available?</label>
            <select :value="pet.available" id="petAvailable" name="available" class="form-control">
              <option disabled value="">Please select one</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div class="form-group">
            <label for="petDescription">Description</label>
            <textarea :value.trim="pet.description" placeholder="description" id="petDescription" class="form-control" rows="3" name="description"></textarea>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <router-link :to="{ name: 'pet', params: { id: pet.uuid }}" class="btn btn-default">
              Cancel
            </router-link>
            <loader id="loader"></loader>
          </div>
        </form>
      </div> <!-- end edit form -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Loader from '../shared/Loader'
  import UploadService from '../../api/fileupload.service'
  
  export default {
    components: { Loader },

    computed: {
      ...mapGetters({
        pet: 'currentPet'
      }),

      action () {
        return this.$store.state.route.params.action
      }
    },

    data () {
      return {
        errorMessage: null
      }
    },

    created () {
      this.$store.dispatch('updateCurrentPet', this.$store.state.route.params.id)
    },

    methods: {
      serializeFormData: function (formId) {
        var o = {}
        var a = $(`#${formId}`).serializeArray()

        $.each(a, function () {
          if (o[this.name]) {
            if (!o[this.name].push) {
              o[this.name] = [o[this.name]]
            }
            o[this.name].push(this.value || null)
          } else {
            o[this.name] = this.value || null
          }
        })

        return o
      },

      onSubmit: function (e) {
        $('.btn').prop('disabled', true)
        $('#loader').show()

        let pet = this.serializeFormData('petForm')
        pet['uuid'] = this.$store.state.route.params.id
        this.$store.dispatch('updatePet', pet)
          .then((updatedPet) => this.$router.push(`/pet/${updatedPet.uuid}`))
          .catch((error) => {
            this.errorMessage = error.message
          })
      },

      defaultImage: function () {
        return require('../../assets/logo.png')
      },

      editImage: function () {
        $('#petImageFile').trigger('click').change(function () {
          $('#image-upload-status').html('Uploading...')
          UploadService.upload($(this).prop('files')[0])
            .then(() => {
              console.log('photo uploaded successfully')
              $('#image-upload-status').html('Success!')
            })
            .catch(() => {
              this.errorMessage = 'An error occured uploading the photo'
              $('#image-upload-status').html('Error has occurred')
            })
        })
      }
    }

  }
</script>

<style>
  input[type='file'] {
    visibility: hidden;
  }
</style>

