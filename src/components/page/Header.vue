<template>
  <v-toolbar app fixed clipped-left>

    <v-btn
        fab
        small
        color="cyan accent-2"
        top
        left
        absolute
        @click="dialog = !dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>

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
    dialog: false
  }),
}
</script>

<style scoped>

</style>
