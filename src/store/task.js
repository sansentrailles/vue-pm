export default {
  state: {
    statuses: [
      {
        id: 1,
        title: 'Новая'
      },
      {
        id: 2,
        title: 'В работе'
      },
      {
        id: 3,
        title: 'Завершена'
      },
      {
        id: 4,
        title: 'Отменена'
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    statuses(state) {
      return state.statuses
    }
  }
}