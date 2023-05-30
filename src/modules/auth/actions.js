import axios from 'axios'
import Buffer from 'vue-buffer'

function getUserInfoFromToken(token){
    const hashPayload = token.split('.')[1]
    const userInfo = Buffer.from(hashPayload, 'Base64').toString()

    return JSON.parse(userInfo)
}

export default {
    async tryLogin(context, payload){
        const userId = localStorage.getItem('userId')
        
        if (!userId){
            context.dispatch('logout')
            return
        }
        const validation = await axios({
            url: '/api/auth/check',
            method: 'post',
            data: {
                userId: userId
            }
        })

        if (validation.status !== 200){
            context.dispatch('logout')
            return
        }

        const userInfo = getUserInfoFromToken(userId)
        const remainingTime = userInfo.expirationDate - new Date().getTime()

        if (remainingTime < 0){
            context.dispatch('logout')
            return
        }

        context.commit('setUserId', userId)
        context.commit('setUserInfo', userInfo)

        setTimeout(()=>{
            context.dispatch('logout')
        },remainingTime)
    },

    async login(context, payload){
        const res = await axios({
            url: '/api/auth/login',
            method: 'post',
            data: {
                login: payload.login,
                password: payload.password
            }
        })
        
        if (res.status === 200){
            context.commit('setUserId', res.data.userId)
            context.commit('setUserInfo', res.data.userInfo)

            localStorage.setItem('userId', res.data.userId)

            setTimeout(()=>{
                context.dispatch('logout')
            },res.data.userInfo.expirationDate - new Date().getTime())
        }
    },

    async logout({commit},payload){
        commit('setUserId',null)
        commit('setUserInfo',null)

        localStorage.clear()
    }
}