import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
