import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './services/firebase'
import fb from 'firebase'

Vue.config.productionTip = false

let app = ''
fb.auth().onAuthStateChanged((user) => {
  // console.log(user)
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
