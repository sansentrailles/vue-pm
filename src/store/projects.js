import fb from '@/services/firebase'
const db = fb.firestore()

export default {
  state: {
    projects: []
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload
    },
    setProject(state, payload) {
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
    createProject({commit}, payload) {
      const project = {
        name: payload.name
      }

      db.collection('projects').add(project).then(ref => {
        project.id = ref.id
        commit('setProject', project);
      });
    },
  },
  getters: {
    projects(state) {
      return state.projects
    }
  }
}