export default {
  state: {
    processing: false,
    error: null
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    setProcessing(state, payload) {
      state.error = payload
    },
    clearErrors(state) {
      state.error = null
    }
  },
  actions: {},
  getters: {}
}