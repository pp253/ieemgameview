import {router} from './router'
import * as components from './components'

const mainFrame = new Vue({
  el: '#main-frame',
  router: router
})

router.push('/')
