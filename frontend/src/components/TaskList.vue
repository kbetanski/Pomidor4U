<template>
  <v-container class="justify-center">
    <ul class="task-list">
      <li class="task-item" v-for="task in tasks" :key="task.id">
        <span
          class="task-content"
          :class="{ done: task.finished }"
          @click="markItDone(task)"
          >{{ task.title }}</span
        >
        <span class="del-todo" @click="deleteTask(task)">Delete</span>
      </li>
    </ul>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'TaskList',
    data () {
        return {
            tasks: this.$store.tasks
        }
    },
    methods: {
        markItDone (task) {
            this.$store.commit('missionCompleted', task.id)
        },
        deleteTask (task) {
            this.$store.commit('deleteTask', task.id)
        }
    },
    computed: {
        ...mapGetters(['doneTasks', 'activeTasks'])
    }
}
</script>
