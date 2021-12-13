import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

const instance = axios.create({
    baseURL: 'https://pomidor4u.betanski.dev/api/'
})

const accessToken = localStorage.getItem('accessToken')

if (!accessToken) {
    instance.defaults.headers.common.Authorization = accessToken
}

Vue.prototype.$http = instance

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')
