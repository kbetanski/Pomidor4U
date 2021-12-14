import Vue from 'vue'
import Vuex from 'vuex'
import ApiClient from '../services/api'

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
        tasks: [],
        drawer: null,
        url: 'https://pomidor4u.betanski.dev/api'
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

            localStorage.removeItem('accessToken')
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
        update_task: async function (state, task) {
            const index = state.tasks.findIndex(el => el.id === task.id)

            state.tasks[index] = task
        },
        add_task: function (state, task) {
            state.tasks.push(task)
        },
        replace_tasks: function (state, tasks) {
            state.tasks = tasks
        },
        delete_task: function (state, { taskId }) {
            const taskIndex = state.tasks.indexOf(
                store.getters.thisTask(taskId)
            )
            state.tasks.splice(taskIndex, 1)
            delete state.tasks[taskIndex].text
        }
    },
    getters: {
        name: state => state.name,
        isLoggedIn: state => !!state.accessToken,
        authStatus: state => state.status,
        activeTasks: state => state.tasks.filter(task => !task.finished),
        activeTasksCount: state => state.tasks.length,
        doneTasks: state => state.tasks.filter(task => task.finished),
        tasks: state => state.tasks,
        thisTask: state => taskId => state.tasks.find(task => task.id === taskId)
    },
    actions: {
        incrementAsync ({ commit }) {
            console.log('go')
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        async login ({ commit, dispatch }, { email, password }) {
            try {
                commit('auth_request')

                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { accessToken, refreshToken } = await client.login({
                    email,
                    password
                })

                commit('auth_success', { accessToken, refreshToken })

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                dispatch('profile')

                return { accessToken, refreshToken }
            } catch (error) {
                commit('auth_error')

                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')

                throw new Error(`Authentication failed: ${error}`)
            }
        },
        async register ({ commit }, authData) {
            try {
                commit('auth_request')

                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { data } = await client.register(authData)

                const { accessToken, refreshToken } = data

                commit('auth_success', { accessToken, refreshToken })

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                return data
            } catch (error) {
                commit('auth_error')

                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')

                throw new Error(`Authentication failed: ${error}`)
            }
        },
        async profile ({ commit }) {
            try {
                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { auth, data } = await client.getProfile()

                if (auth) {
                    commit('auth_success', auth)
                }

                const { id, email, name } = data

                commit('profile', { id, email, name })

                return data
            } catch (error) {
                commit('auth_error')

                throw new Error(`Request failed: ${error}`)
            }
        },
        logout ({ commit }) {
            commit('logout')
        },
        async updateTask ({ commit }, task) {
            try {
                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { auth, data } = await client.updateTask(task)

                if (auth) {
                    commit('auth_success', auth)
                }

                commit('update_task', task)

                return data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteTask ({ commit }, taskId) {
            try {
                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { auth, data } = await client.deleteTask(taskId)

                if (auth) {
                    commit('auth_succes', auth)
                }

                commit('delete_task', { taskId })

                return data
            } catch (error) {
                console.error(error)
            }
        },
        async getTasks ({ commit }) {
            try {
                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { auth, data } = await client.getTasks()

                if (auth) {
                    commit('auth_success', auth)
                }

                commit('replace_tasks', data)

                return data
            } catch (error) {
                console.error(error)
            }
        },
        async addTask ({ commit }, task) {
            try {
                const client = new ApiClient({
                    url: this.state.url,
                    accessToken: this.state.accessToken,
                    refreshToken: this.state.refreshToken
                })

                const { auth, data } = await client.createTask(task)

                if (auth) {
                    commit('auth_success', auth)
                }

                commit('add_task', data)

                return data
            } catch (error) {
                console.error(error)
            }
        }
    }
})

export default store
