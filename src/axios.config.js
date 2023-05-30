import axios from 'axios'

const $api = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

$api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('userId')
    if (token)
        config.headers.Authorization = localStorage.getItem('userId')
    return config
})

$api.interceptors.response.use((config)=>{
    return config
},(error)=>{
    if (error.response.status === 401)
        error.message = 'Пользователь не авторизован'
    return error
})

export default $api