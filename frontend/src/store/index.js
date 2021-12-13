import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        status: '',
        id: localStorage.getItem('id') || '',
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        accessToken: localStorage.getItem('accessToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        user: {},
        count: 0,
        tasks: [
            { id: 1, title: 'Collect packages', finished: false },
            { id: 2, title: 'Workout', finished: false },
            { id: 3, title: 'Read one chapter', finished: false },
            { id: 4, title: 'Buy socks', finished: true }
        ],
        drawer: null
    },
    mutations: {
        auth_request (state) {
            state.status = 'loading'
        },
        auth_success (state, { accessToken, refreshToken }) {
            state.status = 'success'
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        },
        auth_error (state) {
            state.status = 'error'
        },
        logout (state) {
            state.status = ''
            state.accessToken = ''
            state.refreshToken = ''
            state.id = ''
            state.email = ''
            state.name = ''
        },
        profile (state, { id, email, name }) {
            state.id = id
            state.email = email
            state.name = name
        },
        increment: state => state.count++,
        decrement: state => state.count--,
        taskCompleted: async function (state, taskId) {
            const item = state.getters.tasks.thisTodo(taskId)

            item.finished = true
        },
        addTask: function (state, task) {
            state.tasks.push(task)
        },
        deleteTodo: function (state, taskId) {
            const taskIndex = state.tasks.indexOf(
                store.getters.thisTodo(taskId)
            )
            state.tasks.splice(taskIndex, 1)
            delete state.tasks[taskIndex].text
        }
    },
    getters: {
        name: state => state.name,
        isLoggedIn: state => !!state.accessToken,
        authStatus: state => state.status,
        thisTask: state => taskId => state.tasks.find(task => task.id === taskId),
        doneTasks: state => state.tasks.filter(task => task.finished),
        activeTasks: state => state.tasks.filter(task => !task.finished),
        activeTasksCount: state => state.tasks.length
    },
    actions: {
        incrementAsync ({ commit }) {
            console.log('go')
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        async login ({ commit, dispatch }, authData) {
            try {
                commit('auth_request')

                const { data } = await axios({
                    url: 'https://pomidor4u.betanski.dev/api/login',
                    method: 'post',
                    data: authData
                })

                const { accessToken, refreshToken } = data

                commit('auth_success', { accessToken, refreshToken })

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                axios.defaults.headers.common.Authorization = accessToken

                dispatch('profile')

                return data
            } catch (error) {
                commit('auth_error')

                localStorage.removeItem('accessToken')

                throw new Error(`Authentication failed: ${error}`)
            }
        },
        async register ({ commit }, authData) {
            try {
                commit('auth_request')

                const { data } = await axios({
                    url: 'https://pomidor4u.betanski.dev/api/register',
                    method: 'post',
                    data: authData
                })

                const { accessToken, refreshToken } = data

                commit('auth_success', { accessToken, refreshToken })

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                axios.defaults.headers.common.Authorization = accessToken

                return data
            } catch (error) {
                commit('auth_error')

                localStorage.removeItem('accessToken')

                throw new Error(`Authentication failed: ${error}`)
            }
        },
        async profile ({ commit }) {
            try {
                const { data } = await axios({
                    url: 'https://pomidor4u.betanski.dev/api/profile',
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${this.state.accessToken}`
                    }
                })

                const { id, email, name } = data

                commit('profile', { id, email, name })

                localStorage.setItem('id', id)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)

                return data
            } catch (error) {
                commit('auth_error')

                throw new Error(`Request failed: ${error}`)
            }
        },
        logout ({ commit }) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            commit('logout')
        }
    }
})

export default store
