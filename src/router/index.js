import home from '../page/home/index.vue'
import chooseTeam from '../page/choose-team/index.vue'
import chooseJob from '../page/choose-job/index.vue'
//import gameend from '../page/gameend'
//import roundExchange from '../page/round-exchange/index.vue'
import roundFactory from '../page/round-factory/index.vue'
//import roundMarket from '../page/round-market/index.vue'
//import roundRetailer from '../page/round-retailer/index.vue'
//import roundTeamleader from '../page/round-teamleader/index.vue'
//import roundWholeseller from '../page/round-wholeseller/index.vue'

const routes = [
  { path: '/', component: home },
  { path: '/home', component: home },
  { path: '/choose', component: chooseTeam },
  { path: '/choose/team', component: chooseTeam },
  { path: '/choose/job', component: chooseJob },
  { path: '/round/factory', component: roundFactory }/*,
  { path: '/gameend', component: gameend },
  { path: '/round/exchange', component: roundExchange },
  { path: '/round/market', component: roundMarket },
  { path: '/round/retailer', component: roundRetailer },
  { path: '/round/teamleader', component: roundTeamleader },
  { path: '/round/wholeseller', component: roundWholeseller }*/
]

export const router = new VueRouter({
  routes: routes
})
