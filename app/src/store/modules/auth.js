import AuthService from '../../api/auth.service'
import * as types from '../mutation-types'

// initial state
const state = {
  currentUser: null,
  isLoggedIn: false,
  message: null
}

// getters
const getters = {
  currentUser: state => state.currentUser,
  isLoggedIn: state => state.isLoggedIn,
  message: state => state.message
}

// actions
const actions = {
  async login ({ commit }, { username, password }) {
    return AuthService.authenticate(username, password)
      .then((result) => {
        if (result.code === AuthService.SUCCESS) {
          let user = result.payload
          commit(types.AUTH_LOGIN_SUCCESS, { user })
        } else if (result.code === AuthService.NEW_PASSWORD) {
          // TODO: route to change password page
        }
      })
      .catch((error) => {
        console.error(error)
        let message = error.payload
        commit(types.AUTH_LOGIN_FAILURE, { message })
      })
  },

  logout ({ commit }) {
    AuthService.logout()
    commit(types.AUTH_LOGOUT)
  }
}

// mutations
const mutations = {
  [types.AUTH_LOGIN_SUCCESS] (state, { user }) {
    console.log('*** LOGIN SUCCESS ***')
    state.currentUser = user
    state.isLoggedIn = true
    state.message = null
  },

  [types.AUTH_LOGIN_FAILURE] (state, { message }) {
    state.currentUser = null
    state.isLoggedIn = false
    state.message = message
  },

  [types.AUTH_LOGOUT] (state) {
    state.currentUser = null
    state.isLoggedIn = false
    state.message = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
