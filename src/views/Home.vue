<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model="email">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      email: ''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions(['loadProjects']),
    getProjects() {
      const projects = this.$store.dispatch('loadProjects')
    }
  }
}
</script>
