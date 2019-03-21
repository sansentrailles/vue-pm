<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-form>
          <v-layout wrap>
            <v-flex xs12 sm12 md12 color="white">
              <v-card-actions class="pa-0">
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="mode">
                  <v-btn flat @click="disabled = false">
                    <v-icon small>edit</v-icon>
                  </v-btn>
                  <v-btn flat @click="disabled = true"  class="ma-0">
                    <v-icon small>visibility</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-card-actions>
            </v-flex>

            <v-flex xs12 sm12 md12 color="white">
              <v-text-field
                v-model="title"
                :disabled="disabled"
                label="Задача*"
                :loading="false"
                hint="Краткое описание задачи"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-textarea
              label="Описание*"
              :no-resize="true"
              v-model="text"
              :disabled="disabled"
              counter
              required></v-textarea>
            </v-flex>

            <v-flex xs12>
              <v-card-actions class="pa-0">
                <v-spacer></v-spacer>
                <v-btn v-if="!disabled" @click="submit">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data: () => ({
    taskId: null,
    title: '',
    text: '',
    status: '',
    projectId: null,
    disabled: false,
    mode: 0
  }),
  async created() {
    this.projectId = this.$route.params.id
    if(this.tasks.length === 0) {
      await this.loadModelTasksByProject(this.projectId)
    }
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      updateTask: 'task/updateTask',
      loadModelTasksByProject: 'task/loadModelTasksByProject'
    }),
    fetchData() {
      this.taskId = this.$route.params.taskId
      let task = this.tasks.find(item => item.id === this.taskId)

      this.title = task.title
      this.text = task.text
    },
    async submit() {
      let task = {
        id: this.taskId,
        title: this.title,
        text: this.text
      }

      await this.updateTask(task)
      disabled = false
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'task/tasks'
    })
  }
}
</script>
