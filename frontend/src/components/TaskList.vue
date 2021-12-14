  <template>
  <v-row justify="center" align="stretch">
    <v-col cols="auto">
      <v-card class="px-4">
        <v-card-text>
          <v-form ref="registerForm" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  :rules="[rules.required, rules.min]"
                  label="Tytuł"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="content" label="Opis"></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  color="success"
                  @click="addTask"
                  >Dodaj</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
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
import { mapGetters } from 'vuex'

export default {
    name: 'TaskList',
    data: function () {
        return {
            title: '',
            content: '',
            tasks: this.$store.getters.tasks,
            valid: true,
            rules: {
                required: (value) => !!value || 'Wymagane pole',
                min: (v) => (v && v.length >= 10) || 'Minimum 10 znaków'
            }
        }
    },
    mounted: async function () {
        await this.$store.dispatch('getTasks')
    },
    computed: {
        ...mapGetters(['doneTodos', 'activeTodos'])
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
        },
        async addTask () {
            await this.$store.dispatch('addTask', {
                title: this.title,
                content: this.content
            })
        }
    }
}
</script>
