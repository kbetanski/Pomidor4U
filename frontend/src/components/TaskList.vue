  <template>
  <v-row justify="center" align="stretch">
    <v-col cols="auto">
      <v-card
        v-for="task in tasks"
        :key="task.id"
        class="my-4"
        hover
        max-width="600"
      >
        <v-list-item-content>
          <v-card-title class="text-h5 mb-1">
            {{ task.title }}
          </v-card-title>
          <v-card-text v-if="task.content">{{ task.content }}</v-card-text>
        </v-list-item-content>
        <v-card-actions class="justify-end">
          <v-btn
            text
            color="secondary"
            class="px-5"
            v-if="task.finished"
            @click="deleteTask(task.id)"
          >
            Usuń</v-btn
          >
          <v-btn
            text
            color="primary"
            class="px-5"
            v-else
            @click="markItDone(task)"
            >Wykonane</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
    name: 'TaskList',
    data: function () {
        return {
            tasks: this.$store.getters.tasks
        }
    },
    mounted: async function () {
        await this.$store.dispatch('getTasks')
    },

    methods: {
        async markItDone (task) {
            await this.$store.dispatch('updateTask', {
                id: task.id,
                title: task.title,
                content: task.content,
                finished: !task.finished
            })
        },
        async deleteTask (taskId) {
            await this.$store.dispatch('deleteTask', taskId)
        }
    }
}
</script>
