<template>
  <div class="container">
    <ul class="todos-list">
      <li class="todo-item" v-for="todo in todos" :key="todo.id">
        <span
          class="todo-content"
          :class="{ done: todo.done }"
          @click="markItDone(todo)"
          >{{ todo.title }}</span
        >
        <span class="del-todo" @click="deleteTodo(todo)">Delete</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Todos',
    data () {
        return {
            todos: this.$store.state.todos
        }
    },
    methods: {
        markItDone (todo) {
            this.$store.commit('missionCompleted', todo.id)
        },
        deleteTodo (todo) {
            this.$store.commit('deleteTodo', todo.id)
        }
    },
    computed: {
        ...mapGetters(['doneTodos', 'activeTodos'])
    }
}
</script>
