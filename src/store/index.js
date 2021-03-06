import Vue from 'vue'
import Vuex from 'vuex'
import general from './general'
import projects from './projects'
import task from './task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    general,
    projects,
    task
  }

})
