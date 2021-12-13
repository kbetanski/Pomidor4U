  <template>
  <v-card class="mx-auto" max-width="500">
    <v-list two-line>
      <v-list-item-group v-model="selected" active-class="green--text" multiple>
        <template v-for="(task, index) in tasks">
          <v-list-item :key="task.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="task.title"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="task.description"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="task.action"
                ></v-list-item-action-text>

                <v-icon v-if="!active" color="grey lighten-1">
                  mdi-star-outline
                </v-icon>

                <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < tasks.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'TaskList',
    data () {
        return {
            tasks: this.$store.getters.tasks
        }
    },
    methods: {
        markItDone (taskId) {
            this.$store.commit('missionCompleted', taskId)
        },
        deleteTask (taskId) {
            this.$store.commit('deleteTask', taskId)
        }
    },
    computed: {
        ...mapGetters(['doneTasks', 'activeTasks'])
    }
}
</script>
