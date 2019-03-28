<template>
  <div>
    <v-subheader>Список проектов</v-subheader>

    <v-layout row>
      <v-flex xs12 sm12 ma-0 width-100>
        <v-card>
          <v-btn
              fab
              small
              color="red accent-2"
              top
              right
              absolute
              @click="dialog = !dialog"
            >
              <v-icon>add</v-icon>
            </v-btn>
          <v-list>
            <v-list-tile v-for="project in projects" :key="project.id" :to="'/project/'+project.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ project.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>


          <NewProjectDialog :dialog="dialog" />
          <!-- <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                Новый проект
              </v-card-title>
              <v-card-text>
                <v-text-field label="Название проекта"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dialog = false">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->

        </v-card>
      </v-flex>
    </v-layout>

    <v-list dense>
      <v-list-tile v-for="project in projects" :key="project.id" :to="'/project/'+project.id">
        <v-list-tile-content>
          <v-list-tile-title class="title">{{ project.name }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="'/dev/'">
        <v-list-tile-content>
          <v-list-tile-title class="title">DEV</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </div>
</template>

<script>
import NewProjectDialog from '@/components/project/NewProjectDialog'
import {mapGetters} from 'vuex'
export default {
  components: {
    NewProjectDialog
  },
  data: () =>({
    dialog: false
  }),
  computed: {
    ...mapGetters({
      'projects': 'projects/projects'
    })
  }
}
</script>

<style scoped>

</style>
