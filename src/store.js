import { createStore } from 'vuex'

import authModule from '@/modules/auth/store.js'

const store = createStore({
    modules: {
        auth: authModule
    }
})

export default store