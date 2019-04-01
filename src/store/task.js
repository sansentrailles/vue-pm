import Vue from 'vue'
import fb from '@/services/firebase'
import TaskModel from '@/models/TaskModel'
import {statuses, statusConst} from './statuses'
import DateTimeHelper from '@/helpers/DateTimeHelper'

import firebase from 'firebase'

const db = fb.firestore()

export default {
  namespaced: true,
  state: {
    // currentProjectId: null,
    tasks: [],
    // tasks: {},
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
    updateTask(state, taskModel) {
      const index = state.tasks.findIndex(item => item.id == taskModel.id)

      // eslint-disable-next-line no-console
      console.log('index', index)
      // eslint-disable-next-line no-console
      console.log('index', taskModel)

      if(index !== -1) {
        state.tasks.splice(index, 1, taskModel)
      }
      // Object.assign(this.tasks[projectId][index], taskModel)
      // Object.assign(this.desserts[this.editedIndex], this.editedItem)
    }
  },
  actions: {
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
              isCompleted: data.isCompleted,
              projectId: data.projectId
            }

            const taskModel = new TaskModel(task)

            list.push(taskModel)
          })

          // commit('setCurrentProjectId', projectId)
          commit('setTasks', list)
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
            isComplete: data.isComplete,
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
      const origDate = payload.date
      const timestamp = new firebase.firestore.Timestamp.fromDate(new Date(payload.date))
      payload.isCompleted = false
      payload.date = timestamp

      commit('setProcessing', true)
      commit('clearErrors', null, {root: true})
      try {
        const ref = await db.collection('tasks').add(payload);

        payload.id = ref.id
        payload.date = origDate
        // eslint-disable-next-line no-console
        console.log(payload)
        let taskModel = new TaskModel(payload)
        taskModel.isComplete = false

        commit('addTask', taskModel)
        commit('setProcessing', false)
      } catch (error) {
        commit('setProcessing', false)
        commit('setError', error.message, {root: true})
      }
    },
    async updateTask({commit}, task) {
      try {
        let taskRef = await db.collection('tasks').doc(task.id)
        let taskDoc = await taskRef.get()
        if(taskDoc.exists) {
          taskRef.update(task)

          const data = taskDoc.data()
          // eslint-disable-next-line no-console
          // console.log(data.date, data.formattedDate)
          const isCompleted = task.isCompleted ? task.isCompleted : data.isCompleted
          let taskModel = new TaskModel({
            id: task.id,
            title: task.title,
            text: task.text,
            date: DateTimeHelper.timestampToRawDate(data.date.seconds),
            status: data.status,
            isCompleted: isCompleted,
            projectId: data.projectId
          })

          commit('updateTask', taskModel)
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
    activeTasks(state) {
      return state.tasks
        .filter(task => task.isCompleted == false)
        .sort((task1, task2) => task2.timestamp - task1.timestamp)
    },
    isProcessing(state) {
      return state.processing
    }
  }
}
