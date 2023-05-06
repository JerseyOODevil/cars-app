import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Thanks from '../views/Thanks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
