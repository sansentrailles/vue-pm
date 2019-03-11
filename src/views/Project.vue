<template>
  <v-container fluid grid-list-md text-xs-left>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark flat fluid>
          <v-layout row>
            <v-flex md10>
              <v-card-text class="display-1 pa-2">Проект: %PROJECT_NAME%</v-card-text>
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
          <new-task-dialog :id="id"/>
        </v-card>
      </v-flex>

      <v-flex xs7>
        <v-card dark color="secondary">
          <v-card-text class="pa-2">
            <v-data-table
              :headers="headers"
              :items="tasks"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn flat icon color="grey" v-on="on" :to="'/task/'+props.item.id">
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
  props: ['id'],
  components: {NewTaskDialog},
  data: () => ({
    headers: [
      {
        text: 'Задача',
        align: 'left',
        value: 'title'
      },
      { text: 'Дата', value: 'date', align: 'right' },
      { text: '', align: 'center', width: '10', sortable: false }
    ],
  }),
  created() {
    this.loadTasks(this.id)
    // console.log(this.currentTasks)
    // this.$store.dispatch('loadTasks', this.id)
  },
  methods: {
    ...mapActions(['loadTasks']),
    sendMessage() {
      alert('hello')
    }
  },
  computed: {
    ...mapGetters(['tasks']),
    // currentTasks () {
    //   console.log(this.$store.getters.currentTasks(this.id))
    //   return this.$store.getters.currentTasks(this.id)
    // },
    currentProject () {
      const id = this.id
      return this.$store.getters.currentProject(id)
    }
    // tasks () {
    //   const id = this.id
    //   return this.$store.getters.tasks(id)
    // }
  }
}
</script>

<style scoped>

</style>