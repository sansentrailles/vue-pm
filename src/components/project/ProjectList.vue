<template>
  <div>
    <v-subheader>Список проектов</v-subheader>
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
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['projects'])
  }
}
</script>

<style scoped>

</style>
