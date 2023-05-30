<template>
    <div class="login-form" @keyup.enter="sendLogin(login,password)">
        <input-component 
            v-bind="{
                id: 'login',
                name: 'Имя пользователя',
                value: login,
                type: 'text'
            }"
            @edit="login=$event"
        />
        <input-component 
            v-bind="{
                id: 'password',
                name: 'Пароль',
                value: password,
                type: 'password'
            }"
            @edit="password=$event"
        />
        <div>
            <input type="button" value="Авторизоваться" @click="sendLogin(login,password)">
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/input-component.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
    name: 'Login',
    components:{
        InputComponent
    },
    setup(){
        const login = ref('')
        const password = ref('')
        const store = useStore()
        const router = useRouter()

        async function sendLogin(login, password){
            await store.dispatch('auth/login',{
                login,
                password
            })
            router.replace('/home')
        }

        return {
            login,
            password,
            sendLogin
        }
    }
}
</script>

<style>
    .login-form{
        display: grid;
        grid-template-columns: 300px;
        place-content: center;
        row-gap: 30px;
    }
</style>