import Vue from 'vue'
import Router from 'vue-router'

import RouterGuard from './router-guard'

// Import Views -- Layout / Common
import AuthLayout from '@/components/AuthLayout'
// import NoAuthLayout from '@/components/NoAuthLayout'
import NotFoundPage from '@/components/NotFound'
import LoginPage from '@/components/Login'

// Import Views -- Pages
import PetView from '@/components/views/Pet'
import PetListView from '@/components/views/PetList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: LoginPage
      // TODO: add children routes for new password, etc.
    },
    {
      path: '/',
      component: AuthLayout,
      beforeEnter: RouterGuard.isLoggedIn,
      children: [
        {
          path: '/',
          name: 'pets',
          component: PetListView
        },
        {
          path: 'pet/:id',
          name: 'pet',
          component: PetView,
          beforeEnter: RouterGuard.petExists
        },
        {
          path: 'pet/:id/:action',
          name: 'petEdit',
          component: PetView,
          beforeEnter: RouterGuard.petExists
        }
      ]
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})

/**
 * routes: [
    { path: '/user/:id', component: User, props: true }

    // for routes with named views, you have to define the props option for each named view:
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
 */
