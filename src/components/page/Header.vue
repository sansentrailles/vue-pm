<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span>Project</span>
      <span class="font-weight-light">Manager</span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
}
</script>

<style scoped>

</style>
