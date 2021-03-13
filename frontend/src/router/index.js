import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import misterToyApp from '../views/misterToy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
