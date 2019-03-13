<template>
  <v-app id="inspire" dark>
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
      <v-subheader>Список проектов</v-subheader>
      <v-list dense>
        <v-list-tile v-for="project in projects" :key="project.id" :to="'/project/'+project.id">
          <v-list-tile-content>
            <v-list-tile-title class="title">{{ project.name }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Project</span>
        <span class="font-weight-light">Manager</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content dark pa-10>
        <router-view/>
    </v-content>
    <v-footer app fixed class="pa-3">
      <span>&copy; 2019</span>
      <v-spacer></v-spacer>
      <v-progress-circular
        class="mx-1"
        :size="16"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <div class="mx-10">Сохранение... </div>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data: () => ({
    drawer: null,
    name: ''
  }),
  methods: {
    addProject () {
      this.$store.dispatch('createProject', {
        name: this.name
      }).then(() => {
        this.name = ''
      })
    }
  },
  computed: {
    ...mapGetters(['projects'])
  }
}
</script>

<style scoped>
.new-project-form {
  padding: 10px;
}
</style>
