import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Logs from '../views/Log'
import Users from '../views/Users'
import Register from '../views/Register-RFID'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
