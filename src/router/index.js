import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Operations from '../views/Operations.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cars',
    name: 'Cars',
    component: Cars
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
