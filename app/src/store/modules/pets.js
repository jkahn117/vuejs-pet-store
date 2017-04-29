import shop from '../../api/shop'
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

// Utility function to look for pet in local store
const findPetInLocalStore = (id) => {
  return state.all.find(p => p.id === id)
}

// actions
const actions = {
  async getAllPets ({ commit }) {
    try {
      let pets = await shop.getPets()
      commit(types.PETS_LOADED, { pets })
    } catch (error) {
      console.error(error)
    }
  },

  async updateCurrentPet ({ commit }, id) {
    try {
      let pet = findPetInLocalStore(id)
      if (!pet) {
        console.log('pet not in local store, trying api')
        pet = await shop.getPetById(id)
      }
      commit(types.PET_LOADED, { pet })
      return Promise.resolve(pet)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }
}

// mutations
const mutations = {
  [types.PETS_LOADED] (state, { pets }) {
    state.all = pets
  },

  [types.PET_LOADED] (state, { pet }) {
    state.currentPet = pet

    // check if pet is already in state.all, if not add it (e.g. if loaded from API)
    if (!state.all.find((p) => p.id === pet.id)) {
      state.all.push(pet)
    }
  },

  [types.PET_SOLD] (state, { id }) {
    state.all.find(p => p.id === id).available = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
