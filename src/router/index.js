import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Trunc from '../views/Trunc.vue'
import Car from '../views/Car.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/trunc',
    name: 'Trunc',
    component: Trunc
  },
  {
    path: '/car',
    name: 'Car',
    component: Car
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
