import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cars from '../views/Cars.vue'
import Operations from '../views/Operations.vue'
import Login from '../views/Login.vue'

import {useStore} from 'vuex'

const store = useStore()

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path !== '/login' && !localStorage.getItem('userId'))
    next('/login')
  else
    next()
})

export default router
