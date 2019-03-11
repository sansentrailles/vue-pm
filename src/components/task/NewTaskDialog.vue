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
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs12 sm12 md12 color="white">
                <v-text-field
                  v-model="title"
                  label="Задача*"
                  hint="Краткое описание задачи"
                    required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-textarea label="Описание*" :no-resize="true" v-model="text" counter required></v-textarea>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  :items="statuses"
                  item-text="title"
                  item-value="id"
                  label="Статус*"
                  v-model="status"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Дата"
                      hint="ДД.MM.ГГГГ формат"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    locale="ru-ru"
                    @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small class="white--text">*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeForm">Закрыть</v-btn>
        <v-btn color="blue darken-1" flat @click="submit">Добавить задачу</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import status from '@/store/statuses'

export default {
  props: ['id'],
  data: vm => ({
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dialog: false,
    title: '',
    text: '',
    status: status.DEFAULT_STATUS
  }),
  computed: {
    ...mapGetters(['statuses', 'defaultStatus']),
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
  },

  methods: {
    ...mapActions(['addTask']),
    closeForm() {
      this.dialog = false
      this.reset()
    },
    submit() {
      const task = {
        projectId: this.id,
        title: this.title,
        text: this.text,
        status: this.status,
        date: this.date
      }

      this.addTask(task)
      this.reset()
      this.dialog = false
    },
    reset () {
      this.$refs.form.reset()
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('.')

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
  }
}
</script>

<style scoped>

</style>