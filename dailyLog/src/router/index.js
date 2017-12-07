import Vue from 'vue'
import Router from 'vue-router'
import history from '@/components/history'
import logger from '@/components/logger'
import login from '@/components/login'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logger',
      component: logger
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
