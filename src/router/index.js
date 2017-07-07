import home from '../page/home/index.vue'
import chooseTeam from '../page/choose/team/index.vue'
import chooseJob from '../page/choose/job/index.vue'
import roundFactory from '../page/round/factory/index.vue'
import roundRetailer from '../page/round/retailer/index.vue'
import roundWholesaler from '../page/round/wholesaler/index.vue'
import roundGuerrilla from '../page/round/guerrilla/index.vue'
import roundExchanger from '../page/round/exchanger/index.vue'
import roundTransporter from '../page/round/transporter/index.vue'
import roundMarket from '../page/round/market/index.vue'
//import gameend from '../page/gameend'

const routes = [
  { path: '/', component: home },
  { path: '/home', component: home },
  { path: '/choose', component: chooseTeam },
  { path: '/choose/team', component: chooseTeam },
  { path: '/choose/job', component: chooseJob },
  { path: '/round/factory', component: roundFactory },
  { path: '/round/retailer', component: roundRetailer },
  { path: '/round/wholesaler', component: roundWholesaler },
  { path: '/round/guerrilla', component: roundGuerrilla },
  { path: '/round/keeper', component: roundGuerrilla },
  { path: '/round/exchanger', component: roundExchanger },
  { path: '/round/transporter', component: roundTransporter },
  { path: '/round/market', component: roundMarket }/*,
  { path: '/gameend', component: gameend },
  { path: '/round/exchange', component: roundExchange },
  { path: '/round/market', component: roundMarket },
  { path: '/round/teamleader', component: roundTeamleader }*/
]

export const router = new VueRouter({
  routes: routes
})
