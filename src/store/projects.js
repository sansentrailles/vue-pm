export default {
  state: {
    projects: []
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload
    }
  },
  actions: {
    loadProjects({commit}) {
      const projects = []
      commit('setProjects', projects)
    }
  },
  getters: {

  }
}