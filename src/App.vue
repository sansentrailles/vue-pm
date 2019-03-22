<template>
  <v-app id="inspire" dark>
    <sidebar :drawer="drawer" />

    <!-- <header /> -->
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Project</span>
        <span class="font-weight-light">Manager</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content dark pa-10>
        <router-view/>
    </v-content>

    <footer />

  </v-app>
</template>

<script>
import Footer from '@/components/page/Footer'
import Sidebar from '@/components/page/Sidebar'
// import Header from '@/components/page/Header'
export default {
  components: {
    // Header,
    Footer,
    Sidebar
  },
  data: () => ({
    drawer: null,
    name: ''
  }),
}
</script>

<style scoped>
.new-project-form {
  padding: 10px;
}
</style>
