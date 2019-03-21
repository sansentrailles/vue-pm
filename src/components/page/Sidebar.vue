<template>
  <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <!-- <v-form class="new-project-form text-xs-center" style="border: #f00 1px solid">
        <v-text-field
          class="pa-10 ma-10"
          v-model="name"
          label="Название проекта"
        ></v-text-field>

        <v-btn @click="addProject">
          <v-icon dark left>add</v-icon>Добавить проект
        </v-btn>
      </v-form> -->
      <project-list />
    </v-navigation-drawer>
</template>
<script>
import ProjectList from '@/components/project/ProjectList'
export default {
  props: ['drawer'],
  components: {
    ProjectList
  },
  data: () => ({
    // drawer: null,
  }),
}
</script>

<style scoped>

</style>
