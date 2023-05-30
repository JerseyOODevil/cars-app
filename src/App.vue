<template>
  <nav v-if="isAuth">
    <router-link to="/home">Главная</router-link> |
    <router-link to="/cars">Авто</router-link> |
    <router-link to="/operations">Прочие операции</router-link> | 
    <router-link to="/login" @click="logout">{{ `Выход: ${userName}` }}</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { computed, watch } from 'vue';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  el: '#app',
  name: 'App',
  setup(){
    const store = useStore()
    const router = useRouter()

    const isAuth = computed(function(){
      return store.getters['auth/isAuth']
    })
    const userName = computed(function(){
      return store.getters['auth/getUserInfo'].userName
    })

    store.dispatch('auth/tryLogin')

    watch(isAuth,function(){
      if (!isAuth.value)
        router.replace('/login')
    })

    function logout(){
      store.dispatch('auth/logout')
    }

    return {
      isAuth,
      userName,
      logout
    }
  }
} 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
