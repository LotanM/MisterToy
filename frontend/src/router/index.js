import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import misterToyApp from '../views/misterToy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import signUp from '../views/sign-up.vue'
import login  from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/misterToy-app',
    name: 'misterToyApp',
    component: misterToyApp
  },
  {
    path: '/misterToy-app/edit/:toyId',
    component: toyEdit
  },
  {
    path: '/misterToy-app/:toyId',
    component: toyDetails
  },
  {
    path: '/sign-up',
    component: signUp
  },
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
