<template>
  <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <project-list />
    </v-navigation-drawer>
</template>
<script>
import ProjectList from '@/components/project/ProjectList'
export default {
  props: ['drawer'],
  components: {
    ProjectList
  },
  data: () => ({
    // drawer: null,
  }),
}
</script>

<style scoped>

</style>
