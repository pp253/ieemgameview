import {router} from './router'

const mainFrame = new Vue({
  el: '#main-frame',
  router: router
})

router.push('/')
