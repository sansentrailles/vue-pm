import Vue from 'vue'
import fb from '@/services/firebase'
import TaskModel from '@/models/TaskModel'
import {statuses, statusConst} from './statuses'

import firebase from 'firebase'

const db = fb.firestore()

export default {
  namespaced: true,
  state: {
    // tasks: [],
    tasks: {},
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
    },
    setTasksForProject(state, {projectId, tasks}) {
      Vue.set(state.tasks, projectId, tasks)
    },
    updateTask(state, {projectId, task}) {
      const index = state.tasks[projectId].findIndex(item => item.id == task.id)
      state.tasks[projectId].splice(index, 1, task)
      // create TaskModel
      // Object.assign(this.tasks[projectId], taskModel)
      // Object.assign(this.desserts[this.editedIndex], this.editedItem)
    }
  },
  actions: {
    // async loadTasks({commit}) {
    //   try {
    //     const snapshot = await db.collection('tasks')
    //       // .where('projectId', '==', payload )
    //       .get()
    //     let list = [];
    //     snapshot.forEach(item => {
    //       const data = item.data()

    //       let task = {
    //         id: item.id,
    //         title: data.title,
    //         text: data.text,
    //         status: data.status,
    //         date: data.date,
    //         projectId: data.projectId
    //       }

    //       list.push(task)
    //     })

    //     commit('setTasks', list)
    //   } catch (error) {
    //     commit('setError', error.message)
    //   }
    // },
    async loadModelTasksByProject({commit}, projectId) {
      commit('setProcessing', true)

      try {
        const snapshot = await db.collection('tasks')
          .where('projectId', '==', projectId)
          .get()

          let list = [];
          snapshot.forEach(item => {
            const data = item.data()
            const dateField = item.get('date').toDate()

            let task = {
              id: item.id,
              title: data.title,
              text: data.text,
              status: data.status,
              date: dateField,
              projectId: data.projectId
            }

            const taskModel = new TaskModel(task)
            list.push(taskModel)
          })

          commit('setTasksForProject', {projectId, tasks: list})
          commit('setProcessing', false)
      } catch(error) {
        commit('setError', error.message, {root: true})
      }
    },
    async loadModelTasks({commit}) {
      commit('clearErrors', null, {root: true})
      commit('setProcessing', true)
      try {
        const snapshot = await db.collection('tasks')
          .orderBy('date', 'desc')
          .get()
        let list = [];

        snapshot.forEach(item => {
          const data = item.data()
          const dateField = item.get('date').toDate()
// console.log(dateField.getFullYear())
// console.log('data', new Date(data.date.seconds * 1000))
// const date = new firebase.firestore.Timestamp.toDate(data.date);
// console.log('date', date)
          let task = {
            id: item.id,
            title: data.title,
            text: data.text,
            status: data.status,
            date: dateField,
            projectId: data.projectId
          }

          const taskModel = new TaskModel(task)

          list.push(taskModel)
        })

        commit('setTasks', list)
        commit('setProcessing', false)
      } catch (error) {
        commit('setError', error.message, { root: true })
      }
    },
    async addTask({commit}, payload) {
      const timestamp = new firebase.firestore.Timestamp.fromDate(new Date(payload.date));
      payload.date = timestamp

      commit('setProcessing', true)
      commit('clearErrors', null, {root: true})
      try {
        const ref = await db.collection('tasks').add(payload);
        payload.id = ref.id;
        commit('addTask', payload)
        commit('setProcessing', false)
      } catch (error) {
        commit('setProcessing', false)
        commit('setError', error.message, {root: true})
      }
    },
    async updateTask({commit}, payload) {
      // const taskModel = new TaskModel()
      try {
        let taskRef = await db.collection('tasks').doc(payload.task.id)
        let taskDoc = await taskRef.get()
        if(taskDoc.exists) {
          taskRef.update(payload.task)
          // add commit
          commit('updateTask', payload)
        } else {
          // eslint-disable-next-line no-console
          console.log('no exists')
        }

        commit('clearErrors', null, {root: true})

      } catch (error) {
        commit('setError', error.message, {root: true})
      }
    }
  },
  getters: {
    statuses(state) {
      return state.statuses
    },
    defaultStatus(state) {
      return state.statuses.find(status => status.id == statusConst.DEFAULT_STATUS)
    },
    tasks(state) {
      return state.tasks
    },
    currentTasks(state) {
      return (projectId) => state.tasks[projectId]
    },
    taskById(state) {
      return (projectId, taskId) => {
        return state.tasks[projectId].find(task => task.id == taskId)
      }
    },
    isProcessing(state) {
      return state.processing
    }
  }
}
