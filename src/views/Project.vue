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
        <TasksList :tasks="tasks" />
      </v-flex>

      <v-flex xs5>
        <v-card dark color="secondary" v-show="isShowEditor">
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
import TasksList from '@/components/task/TasksList'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  components: {NewTaskDialog, TasksList},
  data: () => ({
    projectId: null,
    loading: false,
  }),
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      loadModelTasksByProject: 'task/loadModelTasksByProject'
    }),
    ...mapMutations({
      setCurrentProjectId: 'projects/setCurrentProjectId'
    }),
    async fetchData() {
      this.projectId = this.$route.params.id
      this.setCurrentProjectId(this.projectId)
      await this.loadModelTasksByProject(this.projectId)
    }
  },
  computed: {
    ...mapGetters({
      taskProcessing: 'task/isProcessing',
      tasks: 'task/activeTasks',
      currentProject: 'projects/currentProject',
    }),
    isShowEditor() {
      return !!this.$route.params.taskId
    }
  }
}
</script>

<style scoped>

</style>
