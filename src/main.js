import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css/animate.min.css'
import 'popmotion/dist/popmotion.global.min.js'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

let app = ''
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created() {
          this.$store.dispatch('projects/loadProjects')
      },
      render: h => h(App)
    }).$mount('#app')
  }
})
