import petApi from '../../api/pets.service'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  currentPet: null
}

// getters
const getters = {
  allPets: state => state.all,
  currentPet: state => state.currentPet
}

// utility functions to look for pet in local store
const indexOfPetInStore = (pet) => {
  return state.all.findIndex((p) => p.uuid === pet.uuid)
}

const findPetInLocalStore = (id) => {
  return state.all.find(p => p.uuid === id)
}

// actions
const actions = {
  /**
   * Retrieve all pets from the API.
   */
  async getAllPets ({ commit }) {
    try {
      let pets = await petApi.getPets()
      commit(types.PETS_LOADED, { pets })
      return Promise.resolve(pets)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  /**
   * Update the pet currently being displayed in the UI.
   */
  async updateCurrentPet ({ commit }, id) {
    try {
      let pet = findPetInLocalStore(id)
      if (!pet) {
        pet = await petApi.getPetById(id)
      }
      commit(types.PET_LOADED, { pet })
      return Promise.resolve(pet)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },

  /**
   * Update pet object in API and then local store.
   */
  async updatePet ({ commit }, pet) {
    return petApi.updatePet(pet)
      .then(() => {
        return petApi.getPetById(pet.uuid)
      })
      .then((updatedPet) => {
        commit(types.PET_UPDATED, { pet: updatedPet })
        return Promise.resolve(updatedPet)
      })
  }
}

// mutations
const mutations = {
  [types.PETS_LOADED] (state, { pets }) {
    state.all = pets
  },

  [types.PET_LOADED] (state, { pet }) {
    state.currentPet = pet

    let index = indexOfPetInStore(pet)
    if (index === -1) {  // pet not in array
      state.all.push(pet)
    } else {
      // need to use .splice() for vuex to detect changes
      state.all.splice(index, 1, pet)
    }
  },

  [types.PET_UPDATED] (state, { pet }) {
    state.currentPet = pet

    let index = indexOfPetInStore(pet)
    state.all.splice(index, 1, pet)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
