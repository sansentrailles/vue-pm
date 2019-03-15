<template>
  <v-container fluid grid-list-md text-xs-left>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark flat fluid>
          <v-layout row>
            <v-flex md10>
              <v-card-text class="display-1 pa-2">Проект: <span v-if="currentProject">{{ currentProject.name }}</span></v-card-text>
            </v-flex>

            <v-flex md2>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="grey" v-on="on">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Редактировать проект</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="grey" v-on="on">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Удалить проект</span>
                </v-tooltip>
              </v-card-actions>
            </v-flex>
          </v-layout>

        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card dark color="primary" class="text-xs-center">
          <new-task-dialog :id="projectId"/>
        </v-card>
      </v-flex>

      <v-flex xs7>
        <v-card dark color="secondary">
          <v-card-text class="pa-2">
            <v-data-table
              :loading="taskProcessing"
              :hide-actions="true"
              :headers="headers"
              :items="tasks"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td><v-icon>{{ props.item.statusObj.icon }}</v-icon></td>
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.formattedDate }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn flat icon color="grey" v-on="on" :to="{name: 'taskEdit', params: {taskId: props.item.id}}">
                        <v-icon>visibility</v-icon>
                      </v-btn>
                    </template>
                    <span>Посмотреть</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs5>
        <v-card dark color="secondary">
          <v-card-text class="pa-2">
            <router-view/>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import NewTaskDialog from '@/components/task/NewTaskDialog'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {NewTaskDialog},
  data: () => ({
    projectId: null,
    loading: false,
    tasks: [],
    headers: [
      {
        text: 'Статус',
        align: 'left',
        value: 'status',
        width: 5,
        sortabel: false
      },
      {
        text: 'Задача',
        align: 'left',
        value: 'title'
      },
      { text: 'Дата', value: 'date', align: 'right' },
      { text: '', align: 'center', width: '10', sortable: false }
    ],
  }),
  created () {
    // await this.loadModelTasks()
    // await this.loadModelTasksByProject(this.$route.params.id)
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      loadModelTasks: 'task/loadModelTasks',
      loadModelTasksByProject: 'task/loadModelTasksByProject'
    }),
    async fetchData() {
      this.projectId = this.$route.params.id
      await this.loadModelTasksByProject(this.projectId)

      this.tasks = this.$store.getters['task/currentTasks'](this.projectId)
      console.log(this.tasks[0].statusObj)
      // this.tasks = this.$store.getters['task/currentTasks'](this.projectId)
    }
  },
  computed: {
    ...mapGetters({
      taskProcessing: 'task/isProcessing'
    }),
    currentProject () {
      return this.$store.getters.currentProject(this.projectId)
    }
  }
}
</script>

<style scoped>

</style>
