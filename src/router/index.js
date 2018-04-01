import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/page/Home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home, alias: ['/home'] },

    {
      path: '/admin/construct',
      component: () => import('@/page/Admin/Construct'),
      alias: ['/admin']
    },

    {
      path: '/boardcast/scoreboard',
      component: () => import('@/page/Boardcast/Scoreboard'),
      alias: ['/boardcast']
    },

    {
      path: '/regist/new',
      component: () => import('@/page/Regist/new'),
      alias: ['/regist']
    },
    { path: '/regist/old', component: () => import('@/page/Regist/old') },
    { path: '/regist/player', component: () => import('@/page/Regist/player') },

    {
      path: '/choose',
      component: () => import('@/page/Choose'),
      children: [
        {
          path: '',
          component: () => import('@/page/Choose/Game'),
          alias: ['game']
        },
        { path: ':gameId/team', component: () => import('@/page/Choose/Team') },
        {
          path: ':gameId/:teamIndex/job',
          component: () => import('@/page/Choose/Job')
        },
        {
          path: ':gameId/:teamIndex/:job/ready',
          component: () => import('@/page/Choose/Ready')
        }
      ]
    },

    {
      path: '/round/:gameId/:teamIndex/',

      component: () => import('@/page/Round'),
      children: [
        { path: 'factory', component: () => import('@/page/Round/Factory') },
        {
          path: 'wholesaler',
          component: () => import('@/page/Round/Wholesaler')
        },
        { path: 'retailer', component: () => import('@/page/Round/Retailer') },
        {
          path: 'guerrilla',
          component: () => import('@/page/Round/Guerrilla'),
          alias: ['keeper']
        },
        {
          path: 'exchanger',
          component: () => import('@/page/Round/Exchanger')
        },
        {
          path: 'transporter',
          component: () => import('@/page/Round/Transporter')
        },
        { path: 'market', component: () => import('@/page/Round/Market') },
        { path: 'consoler', component: () => import('@/page/Round/Consoler') }
      ]
    },

    { path: '/end', component: import('@/page/End') }
  ]
})
