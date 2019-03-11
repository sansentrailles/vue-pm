import status from './statuses'
import fb from '@/services/firebase'
const db = fb.firestore()

export default {
  state: {
    tasks: [],
    statuses: [
      {
        id: status.STATUS_NEW,
        title: 'Новая'
      },
      {
        id: status.STATUS_IN_PROGRESS,
        title: 'В работе'
      },
      {
        id: status.STATUS_FINISHED,
        title: 'Завершена'
      },
      {
        id: status.STATUS_CANCELLED,
        title: 'Отменена'
      }
    ]
  },
  mutations: {
    setTasks(state, payload) {
      return state.tasks = payload
    },
    addTask(state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    async loadTasks({commit}, payload) {
      try {
        const snapshot = await db.collection('tasks').where('projectId', '==', payload ).get()
        let list = [];
        snapshot.forEach(item => {
          const data = item.data()
          let task = {
            id: item.id,
            title: data.title,
            text: data.text,
            status: data.status,
            date: data.date,
            projectId: data.projectId
          }

          list.push(task)
        })

        commit('setTasks', list)
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async addTask({commit}, payload) {
      try {
        commit('setProcessing', true)
        commit('clearErrors')
        const ref = await db.collection('tasks').add(payload);
        payload.id = ref.id;
        commit('addTask', payload)
        commit('setProcessing', false)
      } catch (error) {
        commit('setProcessing', false)
        commit('setError', error.message)
      }
    }
  },
  getters: {
    statuses(state) {
      return state.statuses
    },
    defaultStatus(state) {
      return state.statuses.find(status => status.id == status.DEFAULT_STATUS)
    },
    tasks(state) {
      return state.tasks
    },
    // projectTasks: (state) => (projectId) => state.tasks.filter(task => task.projectId == projectId),
    currentTasks(state) {
      return (projectId) => state.tasks.filter(task => task.projectId == projectId)
    }
  }
}