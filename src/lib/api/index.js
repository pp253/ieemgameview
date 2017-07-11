import * as constant from '../constant'
import * as gameApi from './game'
import * as accountApi from './account'
import * as deliverApi from './deliver'
import * as orderApi from './order'
import * as storageApi from './storage'

export const Products = {
  unknown: '未知',
  0: '車子',
  1: '輪胎',
  2: '車身',
  3: '引擎',
  4: '倉庫',
  5: '工人薪水',
  6: '貨車'
}

export let Team = {
  unknown: -1,
  staff: 0
}

export const Jobs = {
  unknown: 0,
  factory: 1,
  wholeseller: 2,
  retailer: 3,
  teamleader: 4
}

export const StaffJobs = {
  unknown: 5,
  exchange: 6,
  market: 7
}

export function isStaffTeam (team) {
  return team === 0
}

export function isStaffJob (job) {
  return Object.keys(constant.STAFF_JOBS).indexOf(job) !== -1
}

export class User {
  constructor () {
    this.gameId = null
    this.teamIndex = null
    this.job = null
    this.gameConfig = null
    this.stage = constant.GAME_STAGE.UNKNOWN
    this.day = 0
    this.dayStartTime = -1
    this.time = -1
    
    // these are made for auto-updating time
    this.dayTime = {
      day: 0,
      time: -1,
      isWorking: false
    }

    this.state = {
      dayTime: {
        day: 0,
        time: -1,
        isWorking: false
      },
      account: {
        balance: 0
      },
      storage: [],
      receivedOrder: [],
      orderHistory: [],
      deliverHistory: []
    }

    this.timer = setInterval(this._update.bind(this), 1000)

    return this
  }

  getState () {
    return this.state
  }

  getAccount () {
    return this.getState().account
  }

  getDayTime () {
    return this.getState().dayTime
  }

  _update () {
    switch (this.getGameStage()) {
      case constant.GAME_STAGE.UNKNOWN:
      case constant.GAME_STAGE.PREPARE:
      case constant.GAME_STAGE.READY:
        // update game stage
        if (this.getGameId()) {
          gameApi.getGameStage(this.getGameId())
            .then((function (res) {
              let stage = res.data.stage
              if (stage === constant.GAME_STAGE.START) {
                this.stage = stage
                this.updateTime()
              }
            }).bind(this))
            .catch(function (err) {
              console.error(err)
            })
        }
        break

      case constant.GAME_STAGE.START:
        // update time
        if (this.isOffWork() || (this.getTime() > this.getGameConfig().dayLong * 1000)) {
          this.dayStartTime = constant.UNKNOWN_TIME
          this.updateTime()
          if (this.day === this.getGameConfig().days) {
            this.stage = constant.GAME_STAGE.FINAL
          }
        }
        this.getState().dayTime.day = this.getDay()
        this.getState().dayTime.time = this.getTime()
        this.getState().dayTime.isWorking = this.isWorking()
        console.log()

        // update state
        if (!this.isStaffTeam()) {
          this.updateAccount()
          this.updateStorage()

          switch (this.getJob()) {
            case constant.JOBS.FACTORY:
              this.updateDeliverHistory()
              this.updateReceivedOrder()
              break

            case constant.JOBS.WHOLESALER:
              this.updateDeliverHistory()
              this.updateReceivedOrder()
              this.updateOrderHistory()
              break

            case constant.JOBS.RETAILER:
              // this.updateDeliverHistory()
              this.updateReceivedOrder()
              this.updateOrderHistory()
              break
          }
        }
        break

      case constant.GAME_STAGE.FINAL:
        break
        
      case constant.GAME_STAGE.END:
        break
    }
  }

  setGameId (gameId) {
    this.gameId = gameId
    return this
  }

  setGameConfig (config) {
    this.gameConfig = config
  }

  setTeam (team) {
    this.teamIndex = team
    return this
  }

  setJob (job) {
    this.job = job
    return this
  }

  getGameId () {
    return this.gameId
  }

  getGameConfig () {
    return this.gameConfig
  }

  getTeamNumber () {
    return this.getGameConfig().teamNumber
  }

  getTeam () {
    return this.teamIndex
  }

  getJob () {
    return this.job
  }

  isStaffTeam () {
    return isStaffTeam(this.getTeam())
  }

  getGameStage () {
    return this.stage
  }

  getDayStartTime () {
    return this.dayStartTime
  }

  isWorking () {
    return this.getDayStartTime() !== constant.UNKNOWN_TIME
  }

  isOffWork () {
    return (this.getGameStage() === constant.GAME_STAGE.START) && !this.isWorking()
  }

  getDay () {
    return this.day
  }

  getTime () {
    if (this.getDayStartTime() === constant.UNKNOWN_TIME) {
      return constant.UNKNOWN_TIME
    } else {
      return Date.now() - this.getDayStartTime()
    }
  }

  updateTime () {
    gameApi.getGameIdTime(this.getGameId())
      .then((function (res) {
        let data = res.data
        this.day = data.day
        this.dayStartTime = data.dayStartTime
      }).bind(this))
  }

  updateAccount () {
    accountApi.nextGameStage(this.getGameId(), this.getTeam())
      .then((function (res) {
        let data = res.data
        this.getAccount().balance = data.balance
      }).bind(this))
  }

  updateStorage () {
    storageApi.getStorage(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.state.storage.splice(0,this.state.storage.length)
        let list = res.data.list
        for (let key in list) {
          this.state.storage.push(list[key])
        }
      }).bind(this))
  }

  updateReceivedOrder () {
    orderApi.getReceived(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.state.receivedOrder.splice(0,this.state.receivedOrder.length)
        let list = res.data.list
        for (let key in list) {
          this.state.receivedOrder.push(list[key])
        }
      }).bind(this))
  }

  updateOrderHistory () {
    orderApi.getHistory(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.state.orderHistory.splice(0,this.state.orderHistory.length)
        let list = res.data.list
        for (let key in list) {
          this.state.orderHistory.push(list[key])
        }
      }).bind(this))
  }

  updateDeliverHistory () {
    deliverApi.getHistory(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.state.deliverHistory.splice(0,this.state.deliverHistory.length)
        let list = res.data.list
        for (let key in list) {
          this.state.deliverHistory.push(list[key])
        }
      }).bind(this))
  }
}

export let nowUser = new User()
