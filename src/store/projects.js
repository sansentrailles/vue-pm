import fb from '@/services/firebase'
const db = fb.firestore()

export default {
  namespaced: true,
  state: {
    currentProjectId: null,
    projects: []
  },
  mutations: {
    setCurrentProjectId(state, projectId) {
      state.currentProjectId = projectId
    },
    setProjects(state, payload) {
      state.projects = payload
    },
    addProject(state, payload) {
      // Vue.set(state.projects, payload.id, payload)
      state.projects.push(payload)
    }
  },
  actions: {
    async loadProjects({commit}) {
      try {
        const snapshot = await db.collection('projects').get()
        let list = [];
        snapshot.forEach(item => {
          const data = item.data()
          let project = {
            id: item.id,
            name: data.name
          }

          list.push(project)
        })

        commit('setProjects', list)
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async createProject({commit}, payload) {
      const project = {
        name: payload.name
      }

      const ref = await db.collection('projects').add(project)
      project.id = ref.id
      commit('addProject', project)
      // .then(ref => {
      //   project.id = ref.id
      //   commit('setProject', project);
      // });
    },
  },
  getters: {
    projects(state) {
      return state.projects
    },
    currentProject: (state) => state.projects.find(project => project.id === state.currentProjectId)
  }
}
