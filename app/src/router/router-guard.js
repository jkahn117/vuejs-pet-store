// Navigation Guards
// @see https://router.vuejs.org/en/advanced/navigation-guards.html

import store from '../store'

const guard = {

  petExists: function (to, from, next) {
    store.dispatch('updateCurrentPet', to.params.id)
      .then(pet => {
        if (pet) {
          next()
        } else {
          next({ path: '/404' })
        }
      })
  },

  isLoggedIn: function (to, from, next) {
    next(store.getters.isLoggedIn ? true : { path: '/login' })
  }
}

export default guard
