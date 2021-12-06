import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        todos: [
            { id: 1, title: 'Collect packages', done: false },
            { id: 2, title: 'Workout', done: false },
            { id: 3, title: 'Read one chapter', done: false },
            { id: 4, title: 'Buy socks', done: true }
        ]
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        missionCompleted: function (state, todoId) {
            const todo = store.getters.thisTodo(todoId)
            todo.done = !todo.done
        },
        addTodo: function (state, todoText) {
            state.todos.push({
                id: state.todos.slice(-1)[0].id + 1,
                text: todoText,
                done: false
            })
            console.log(state.todos)
        },
        deleteTodo: function (state, todoId) {
            const todoIndex = state.todos.indexOf(
                store.getters.thisTodo(todoId)
            )
            state.todos.splice(todoIndex, 1)
            delete state.todos[todoIndex].text
            console.log(state.todos[todoIndex])
        }
    },
    getters: {
        thisTodo: state => todoId => {
            return state.todos.find(todo => todo.id === todoId)
        },
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        activeTodos: state => {
            return state.todos.filter(todo => !todo.done)
        },
        activeTodosCount: (state, getters) => {
            return getters.activeTodos.length
        }
    },
    actions: {
        incrementAsync ({ commit }) {
            console.log('go')
            setTimeout(() => {
                commit('increment')
            }, 1000)
        }
    }
})

export default store
