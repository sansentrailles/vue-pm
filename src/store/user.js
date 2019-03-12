// import fb from '@/services/firebase'
import fb from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async loginUser({commit}, {email, password}) {
      commit('clearError')
      commit('setProcessing', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', user.id)
        commit('setProcessing', false)
      } catch(error) {
        commit('setProcessing', false)
        commit('setError', error.message)
      }
    }
  },
  getters: {}
}