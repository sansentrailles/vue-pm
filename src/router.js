import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects'
import Project from './views/Project'
import Dev from './views/Dev'
import TaskEditor from './components/task/TaskEditor'
import Login from './components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/project/:id',
    name: 'project',
    component: Project,
    // props: true
    children: [
      {
        name: 'taskEdit',
        path: 'task/:taskId',
        component: TaskEditor
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dev',
    name: 'dev',
    component: Dev
  },
  {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
