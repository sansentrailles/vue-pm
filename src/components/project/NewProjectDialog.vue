<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Новый проект
      </v-card-title>
      <v-card-text>
        <v-text-field label="Название проекта" v-model="projectName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeForm">Закрыть</v-btn>
        <v-btn flat color="primary" @click="addProject">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['dialog'],
  data: () => ({
    projectName: ''
  }),
  methods: {
    ...mapActions({
      'createProject': 'projects/createProject'
    }),
    addProject() {
      const project = {
        name: this.projectName
      }
      this.createProject(project)
      this.projectName = ''
      this.dialog = false
    },
    closeForm() {
      this.dialog = false
      this.projectName = ''
    }
  }
}
</script>
