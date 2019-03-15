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
                <v-btn v-if="!disabled" @click="disabled = false">
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
// import status from '@/store/statuses'
export default {
  data: () => ({
    taskId: null,
    tasks: [],
    title: '',
    text: '',
    status: '',
    projectId: null,
    disabled: true,
    mode: 1
  }),
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.taskId = this.$route.params.taskId

      this.taskId = this.$route.params.taskId
      this.title = this.currentTask.title
      this.title = this.currentTask.title
      this.text = this.currentTask.text
      this.projectId = this.currentTask.projectId
    }
  },
  computed: {
    currentTask () {
      return this.$store.getters['task/taskById'](this.propjecId, this.taskId)
    }
  }
}
</script>
