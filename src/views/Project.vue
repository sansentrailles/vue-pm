<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark>
          <v-card-text class="pa-10 display-1">Проект: Берко</v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card dark color="primary">
          <new-task-dialog />
        </v-card>
      </v-flex>

      <v-flex xs7>
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs5>
        <v-card dark color="secondary">
          <v-card-text class="px-0">60</v-card-text>
        </v-card>
      </v-flex>

      <!-- <v-flex v-for="i in 3" :key="`4${i}`" xs4>
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import NewTaskDialog from '@/components/task/NewTaskDialog'
export default {
  components: {NewTaskDialog},
  methods: {
    sendMessage() {
      alert('hello')
    }
  }
}
</script>

<style scoped>

</style>