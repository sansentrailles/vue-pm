import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { ru },
    current: 'ru'
  },
})
