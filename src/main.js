import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import './services/firebase'
import fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

// const config = {
//   apiKey: "AIzaSyBNMnCw4Jhp_y9w31nm1KYgUl6SjBXTgbU",
//   authDomain: "project-manager-e2a01.firebaseapp.com",
//   databaseURL: "https://project-manager-e2a01.firebaseio.com",
//   projectId: "project-manager-e2a01",
//   storageBucket: "project-manager-e2a01.appspot.com",
//   messagingSenderId: "152804312983"
// };
// fb.initializeApp(config);
import {mapActions} from 'vuex'
let app = ''
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      methods: {
        ...mapActions({
          'loadProjects' : 'projects/loadProjects'
        }),
      },
      created() {
        this.loadProjects()
          // this.$store.dispatch('loadProjects')
      },
      render: h => h(App)
    }).$mount('#app')
  }
})
