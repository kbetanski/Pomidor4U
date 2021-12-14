import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Tasks from '../views/Tasks.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false,
            title: 'Zaloguj się',
            icon: 'mdi-login-variant'
        }

    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            title: 'Czasomierz',
            icon: 'mdi-clock-outline'
        }
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        meta: {
            requiresAuth: true,
            title: 'Zadania',
            icon: 'mdi-clipboard-list-outline'
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: {
            beforeRouteEnter (to, from, next) {
                store.dispatch('logout')
                next('/login')
            }
        },
        meta: {
            requiresAuth: true,
            title: 'Wyloguj',
            icon: 'mdi-logout'
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
