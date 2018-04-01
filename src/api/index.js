import axios from 'axios'
import store from '@/store'
import { htmlEncode } from '@/lib/utils'
import * as enter from './enter'

export const SERVER_BASE = 'http://localhost' // 'http://localhost/'
export const ERR_MSG = {
  20: {
    title: 'entry.UserInfoNotCorrectTitle',
    text: 'entry.UserInfoNotCorrectText'
  }
}

export function legalRequest(apiPath, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(SERVER_BASE + apiPath, data)
      .then(res => {
        if (res.data.error || res.data.err) {
          let err = res.data
          if (err.id) {
            store.commit('ui/OPEN_DIALOG', {
              title:
                err.id in ERR_MSG
                  ? ERR_MSG[err.id].title
                  : '對不起，系統發生錯誤了！',
              text:
                err.id in ERR_MSG && ERR_MSG[err.id].text.length !== 0
                  ? ERR_MSG[err.id].text + '<br>'
                  : '',
              more:
                '如果你覺得這不應該發生，請試著向主辦方反映。' +
                (err.more ? '<br>' + htmlEncode(err.more) : '')
            })
          }
          reject(res.data)
          return
        }
        resolve(res.data)
      })
      .catch(function(err) {
        store.commit('ui/OPEN_DIALOG', {
          title: err.name,
          text: err.message
        })
        reject(err)
      })
  })
}

export default {
  enter
}
