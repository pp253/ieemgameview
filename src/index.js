import {router} from './router'
import './components'

const mainFrame = new Vue({
  el: '#main-frame',
  router: router
})

router.push('/')
