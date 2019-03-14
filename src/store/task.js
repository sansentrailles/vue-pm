import fb from '@/services/firebase'
import TaskModel from '@/models/TaskModel'
import {statuses, statusConst} from './statuses'

import firebase from 'firebase'

const db = fb.firestore()

export default {
  namespaced: true,
  state: {
    tasks: [],
    statuses,
    processing: false,
  },
  mutations: {
    setTasks(state, payload) {
      return state.tasks = payload
    },
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    setProcessing(state, payload) {
      state.processing = payload
    }
  },
  actions: {
    async loadTasks({commit}) {
      try {
        const snapshot = await db.collection('tasks')
          // .where('projectId', '==', payload )
          .get()
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
    async loadModelTasks({commit}) {
      // commit('clearError')
      commit('setProcessing', true)
      try {
        const snapshot = await db.collection('tasks')
          .get()
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

          const taskModel = new TaskModel(task)

          list.push(taskModel)
        })

        commit('setTasks', list)
        commit('setProcessing', false)
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async addTask({commit}, payload) {
      const timestamp = new firebase.firestore.Timestamp.fromDate(new Date(payload.date));
      payload.date = timestamp

      commit('setProcessing', true)
      // commit('clearErrors')
      try {
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
    defaultStatus() {
      return this.statuses.find(status => status.id == statusConst.DEFAULT_STATUS)
    },
    tasks(state) {
      return state.tasks
    },
    currentTasks(state) {
      return (projectId) => state.tasks.filter(task => task.projectId == projectId)
    },
    taskById(state) {
      return (taskId) => state.tasks.find(task => task.id == taskId)
    },
    isProcessing(state) {
      return state.processing
    }
  }
}