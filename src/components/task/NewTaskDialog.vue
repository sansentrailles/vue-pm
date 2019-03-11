<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Добавить задачу</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Новая задача по проекту</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md py-0 px-0>
          <v-layout wrap>
            <v-flex xs12 sm12 md12 color="white">
              <v-text-field
                label="Название проекта*"
                hint="example of persistent helper text"
                  required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field label="Email*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="statuses"
                label="Age*"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        <small class="white--text">*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters(['statuses'])
  }
}
</script>

<style scoped>

</style>