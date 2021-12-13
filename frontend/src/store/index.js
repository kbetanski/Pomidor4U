import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        status: '',
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
        },
        increment: state => state.count++,
        decrement: state => state.count--
        // taskCompleted: async function (state, taskId) {
        //     const task = await apiClient.updateTask({ finished: true, id: taskId })

        //     const item = state.getters.tasks.thisTodo(task.id)

        //     item.finished = task.finished
        // },
        // addTask: function (state, taskTitle) {
        //     const todo = apiClient.createTask(taskTitle).then()

        //     state.tasks.push({
        //         id: todo.id,
        //         title: taskTitle,
        //         done: false
        //     })
        // },
        // deleteTodo: function (state, todoId) {
        //     const todoIndex = state.todos.indexOf(
        //         store.getters.thisTodo(todoId)
        //     )
        //     state.todos.splice(todoIndex, 1)
        //     delete state.todos[todoIndex].text
        //     console.log(state.todos[todoIndex])
        // }
    },
    getters: {
        isLoggedIn: state => !!state.accessToken,
        authStatus: state => state.status,
        thisTodo: state => todoId => state.tasks.find(todo => todo.id === todoId),
        doneTodos: state => state.tasks.filter(todo => todo.finished),
        activeTodos: state => state.tasks.filter(todo => !todo.finished),
        activeTodosCount: state => state.tasks.length
    },
    actions: {
        incrementAsync ({ commit }) {
            console.log('go')
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        async login ({ commit }, authData) {
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

                return data
            } catch (error) {
                commit('auth_error')

                localStorage.removeItem('accessToken')

                throw new Error(`Authentication failed: ${error}`)
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
