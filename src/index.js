import home from './page/home/index.vue'
import choose from './page/choose/index.vue'
//import gameend from './page/gameend'
//import roundExchange from './page/round-exchange'
//import roundFactory from './page/round-factory'
//import roundMarket from './page/round-market'
//import roundRetailer from './page/round-retailer'
//import roundTeamleader from './page/round-teamleader'
//import roundWholeseller from './page/round-wholeseller'

const routes = [
  { path: '/', component: home },
  { path: '/home', component: home },
  { path: '/choose', component: choose }/*,
  { path: '/gameend', component: gameend },
  { path: '/round/exchange', component: roundExchange },
  { path: '/round/factory', component: roundFactory },
  { path: '/round/market', component: roundMarket },
  { path: '/round/retailer', component: roundRetailer },
  { path: '/round/teamleader', component: roundTeamleader },
  { path: '/round/wholeseller', component: roundWholeseller }*/
]

const router = new VueRouter({
  routes: routes
})

const mainFrame = new Vue({
  el: '#main-frame',
  router: router
})

router.push('/')
