import * as constant from '../constant'
import * as gameApi from './game'
import * as accountApi from './account'
import * as deliverApi from './deliver'
import * as orderApi from './order'
import * as storageApi from './storage'
import * as newsApi from './news'

export function isStaffTeam (team) {
  return team === 0
}

export function isStaffJob (job) {
  return Object.keys(constant.STAFF_JOBS).indexOf(job) !== -1
}

export class User {
  constructor () {
    // these are made for auto-updating time
    this.state = {
      gameId: constant.GAMES.UNKNOWN,
      teamIndex: constant.TEAMS.UNKNOWN,
      job: constant.JOBS.UNKNOWN,
      gameConfig: {},
      stage: constant.GAME_STAGE.UNKNOWN,
      day: constant.ZERO_DAYTIME.DAY,
      time: constant.ZERO_DAYTIME.TIME,
      isWorking: false,
      dayStartTime: constant.UNKNOWN_TIME,
      balance: 0,
      storage: [],
      receivedOrder: [],
      orderHistory: [],
      deliverHistory: [],
      news: []
    }

    this.timer = setInterval(this._update.bind(this), 1000)

    return this
  }

  resetState () {
    this.state = Object.assign(this.getState(), {
      gameId: constant.GAMES.UNKNOWN,
      teamIndex: constant.TEAMS.UNKNOWN,
      job: constant.JOBS.UNKNOWN,
      gameConfig: {},
      stage: constant.GAME_STAGE.UNKNOWN,
      day: constant.ZERO_DAYTIME.DAY,
      time: constant.ZERO_DAYTIME.TIME,
      isWorking: false,
      dayStartTime: constant.UNKNOWN_TIME,
      balance: 0,
      storage: [],
      receivedOrder: [],
      orderHistory: [],
      deliverHistory: [],
      news: []
    })
  }

  getState () {
    return this.state
  }

  getAccount () {
    return this.getState()
  }

  getDayTime () {
    return this.getState()
  }

  _update () {
    switch (this.getGameStage()) {
      case constant.GAME_STAGE.UNKNOWN:
      case constant.GAME_STAGE.PREPARE:
      case constant.GAME_STAGE.READY:
      case constant.GAME_STAGE.FINAL:
        // update game stage
        if (this.getGameId() !== constant.GAMES.UNKNOWN) {
          gameApi.getGameStage(this.getGameId())
            .then((function (res) {
              let stage = res.data.stage
              this.getState().stage = stage
              if (stage === constant.GAME_STAGE.START) {
                this.updateTime()
              }
              console.log('Game Stage has been set to', stage)
            }).bind(this))
            .catch(function (err) {
              console.error(err)
            })
        }
        break

      case constant.GAME_STAGE.START:
        // update time
        if (this.isOffWork() || (this.getTime() > this.getGameConfig().dayLong * 1000)) {
          this.getState().dayStartTime = constant.UNKNOWN_TIME
          this.updateTime()
          if (this.getDay() === this.getGameConfig().days) {
            this.getState().stage = constant.GAME_STAGE.FINAL
            console.log('Game Stage has been set to', this.getGameStage())
          }
        }
        this.getState().day = this.getDay()
        this.getState().time = this.getTime()
        this.getState().isWorking = this.isWorking()

        // update state
        if ((this.getJob() !== constant.JOBS.UNKNOWN) && !this.isStaffTeam()) {
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
              this.updateDeliverHistory()
              this.updateReceivedOrder()
              this.updateOrderHistory()
              this.updateNews()
              break
          }
        }
        break
        
      case constant.GAME_STAGE.END:
        break
    }
  }

  setGameId (gameId) {
    this.getState().gameId = gameId
    return this
  }

  setGameConfig (config) {
    this.getState().gameConfig = Object.assign(this.getGameConfig(), config)
  }

  setTeam (team) {
    this.getState().teamIndex = team
    return this
  }

  setJob (job) {
    this.getState().job = job
    return this
  }

  getGameId () {
    return this.getState().gameId
  }

  getGameConfig () {
    return this.getState().gameConfig
  }

  getTeamNumber () {
    return this.getGameConfig().teamNumber
  }

  getTeam () {
    return this.getState().teamIndex
  }

  getJob () {
    return this.getState().job
  }

  isStaffTeam () {
    return isStaffTeam(this.getTeam())
  }

  getGameStage () {
    return this.getState().stage
  }

  getDayStartTime () {
    return this.getState().dayStartTime
  }

  isWorking () {
    return this.getDayStartTime() !== constant.UNKNOWN_TIME
  }

  isOffWork () {
    return (this.getGameStage() === constant.GAME_STAGE.START) && !this.isWorking()
  }

  getDay () {
    return this.getState().day
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
        this.getState().day = parseInt(data.day)
        this.getState().dayStartTime = parseInt(data.dayStartTime)
      }).bind(this))
  }

  updateAccount () {
    accountApi.getBalance(this.getGameId(), this.getTeam())
      .then((function (res) {
        let data = res.data
        this.getAccount().balance = data.balance
      }).bind(this))
  }

  updateStorage () {
    storageApi.getStorage(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.getState().storage.splice(0,this.getState().storage.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().storage.push(list[key])
        }
      }).bind(this))
  }

  updateReceivedOrder () {
    orderApi.getReceived(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.getState().receivedOrder.splice(0,this.getState().receivedOrder.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().receivedOrder.push(list[key])
        }
      }).bind(this))
  }

  updateOrderHistory () {
    orderApi.getHistory(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.getState().orderHistory.splice(0,this.getState().orderHistory.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().orderHistory.push(list[key])
        }
      }).bind(this))
  }

  updateDeliverHistory () {
    deliverApi.getHistory(this.getGameId(), this.getTeam(), this.getJob())
      .then((function (res) {
        this.getState().deliverHistory.splice(0,this.getState().deliverHistory.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().deliverHistory.push(list[key])
        }
      }).bind(this))
  }

  updateNews () {
    newsApi.getNews(this.getGameId())
      .then((function (res) {
        this.getState().news.splice(0,this.getState().news.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().news.unshift(list[key])
        }
      }).bind(this))
  }
}

export let nowUser = new User()
