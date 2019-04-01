<template>
  <v-card dark color="secondary">
    <v-card-text class="pa-2">
      <v-data-table
        :disable-initial-sort="true"
        :loading="taskProcessing"
        :hide-actions="true"
        no-data-text="Пока задач нет"
        :headers="headers"
        :items="tasks"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <tr @click="showTask(props.item.id)">
            <!-- <td><v-icon>{{ props.item.statusObj.icon }}</v-icon></td> -->
            <td class="px-2 py-0">{{ props.item.title }}</td>
            <td class="text-xs-center px-0 py-0">{{ props.item.formattedDate }}</td>
            <td class="px-0">
              <v-btn flat icon color="grey" @click="completeTask(props.item)">
                <v-icon small>done</v-icon>
              </v-btn>

              <!-- <v-btn flat icon color="grey" :to="{name: 'taskEdit', params: {taskId: props.item.id}}">
                <v-icon small>visibility</v-icon>
              </v-btn> -->
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  props: ['tasks'],
  data: () => ({
    headers: [
      // {
      //   text: 'Статус',
      //   align: 'left',
      //   value: 'status',
      //   width: 1,
      //   sortabel: false
      // },
      {
        text: 'Задача',
        align: 'left',
        value: 'title'
      },
      { text: 'Дата', value: 'date', align: 'center' },
      { text: '', align: 'left', width: '120px', sortable: false }
    ]
  }),
  methods: {
    ...mapActions({
      updateTask: 'task/updateTask'
    }),
    showTask(taskId) {
      this.$router.push({name: 'taskEdit', params: {taskId: taskId}})
    },
    completeTask(taskModel) {
      let task = {
        id: taskModel.id,
        title: taskModel.title,
        text: taskModel.text,
        date: taskModel.date,
        status: taskModel.status,
        projectId:taskModel.projectId,
        isCompleted: true
      }
      this.updateTask(task)
    }
  },
  computed: {
    ...mapGetters({
      taskProcessing: 'task/isProcessing'
    })
  }
}
</script>

<style scoped>

</style>
