import axios from 'axios'
import * as constant from '../constant'
import * as gameApi from './game'
import * as accountApi from './account'
import * as deliverApi from './deliver'
import * as orderApi from './order'
import * as storageApi from './storage'
import * as newsApi from './news'
import * as dataApi from './data'

export const DEFAULT_STATE = () => {
  return {
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
    news: [],
    color: {
      primary: 'light-blue',
      accent: 'yellow',
      themeColor: '#03a9f4'
    },
    market: {
      orderAmount: 0,
      storageAmount: 0,
      price: 0
    },
    deliveredNumber: 0,
    orderVsStorage: {
      [constant.JOBS.FACTORY]: [],
      [constant.JOBS.WHOLESALER]: [],
      [constant.JOBS.RETAILER]: []
    },
    teamStorageList: {
      [constant.JOBS.FACTORY]: [],
      [constant.JOBS.WHOLESALER]: [],
      [constant.JOBS.RETAILER]: []
    }
  }
}

export function isStaffTeam(team) {
  return team === 0
}

export function isStaffJob(job) {
  return Object.keys(constant.STAFF_JOBS).indexOf(job) !== -1
}

export class User {
  constructor() {
    // these are made for auto-updating time
    this.state = DEFAULT_STATE()

    this.timer = setInterval(this._update.bind(this), 1000)

    return this
  }

  resetState() {
    this.state = Object.assign(this.getState(), DEFAULT_STATE())
  }

  getState() {
    return this.state
  }

  getAccount() {
    return this.getState()
  }

  getDayTime() {
    return this.getState()
  }

  getColor() {
    return this.getState().color
  }

  _update() {
    if (
      this.getGameId() === constant.GAMES.UNKNOWN ||
      this.getGameStage() === constant.GAME_STAGE.END
    ) {
      return
    }

    if (
      this.getTeam() === constant.TEAMS.UNKNOWN ||
      this.getJob() === constant.JOBS.UNKNOWN ||
      this.getGameStage() === constant.GAME_STAGE.PREPARE ||
      this.getGameStage() === constant.GAME_STAGE.READY
    ) {
      gameApi
        .getGameStage(this.getGameId())
        .then(
          function(res) {
            let data = res.data
            if (this.getGameStage() !== data.stage) {
              this.getState().stage = data.stage
              console.log('Game Stage has been set to', data.stage)
            }
          }.bind(this)
        )
        .catch(function(err) {
          console.error(err)
        })
      return
    }

    dataApi
      .getUpdate(this.getGameId(), this.getTeam(), this.getJob())
      .then(
        function(res) {
          let data = res.data

          // update stage
          if (this.getGameStage() !== data.stage) {
            this.getState().stage = data.stage
            console.log('Game Stage has been set to', data.stage)
          }

          // update time
          if (this.getDay() !== data.day) {
            this.getState().day = parseInt(data.day)
            this.getState().dayStartTime = parseInt(data.dayStartTime)
            console.log('Game Day has been set to', data.day)
          }
          if (this.getTime() >= this.getGameConfig().dayLong * 1000) {
            this.getState().time = this.getGameConfig().dayLong * 1000
            this.dayStartTime = constant.UNKNOWN_TIME
            this.getState().isWorking = false
            if (this.day === this.getGameConfig().days) {
              this.getState().state = constant.GAME_STAGE.FINAL
              this.isWorking = false
            }
          } else {
            this.getState().time = this.getTime()
            this.getState().isWorking = true
          }

          // update state
          if (this.getJob() !== constant.JOBS.UNKNOWN && !this.isStaffTeam()) {
            // update account
            if (this.getState().balance !== data.balance) {
              this.getState().balance = data.balance
              console.log('Balance has been set to', data.balance)
            }

            // update storage
            this.getState().storage.splice(0, this.getState().storage.length)
            for (let key in data.storage) {
              this.getState().storage.push(data.storage[key])
            }

            let updateDeliverHistoryFromRes = deliverHistory => {
              if (
                this.getState().deliverHistory.length !== deliverHistory.length
              ) {
                this.getState().deliverHistory.splice(
                  0,
                  this.getState().deliverHistory.length
                )
                for (let key in deliverHistory) {
                  this.getState().deliverHistory.push(deliverHistory[key])
                }
                console.log('Deliver History has been set to', deliverHistory)
              }
            }

            let updateReceivedOrderFromRes = receivedOrder => {
              if (
                this.getState().receivedOrder.length !== receivedOrder.length
              ) {
                this.getState().receivedOrder.splice(
                  0,
                  this.getState().receivedOrder.length
                )
                for (let key in receivedOrder) {
                  this.getState().receivedOrder.push(receivedOrder[key])
                }
                console.log('Received Order has been set to', receivedOrder)
              }
            }

            let updateOrderHistoryFromRes = orderHistory => {
              if (this.getState().orderHistory.length !== orderHistory.length) {
                this.getState().orderHistory.splice(
                  0,
                  this.getState().orderHistory.length
                )
                for (let key in orderHistory) {
                  this.getState().orderHistory.push(orderHistory[key])
                }
                console.log('Received Order has been set to', orderHistory)
              }
            }

            let updateNewsFromRes = news => {
              if (this.getState().news.length !== news.length) {
                this.getState().news.splice(0, this.getState().news.length)
                for (let key in news) {
                  this.getState().news.unshift(news[key])
                }
                console.log('News has been set to', news)
              }
            }

            let updateDeliveredNumberFromRes = deliveredNumber => {
              if (this.getState().deliveredNumber !== deliveredNumber) {
                this.getState().deliveredNumber = deliveredNumber
                console.log('DeliveredNumber has been set to', deliveredNumber)
              }
            }

            switch (this.getJob()) {
              case constant.JOBS.FACTORY:
                // update deliver history
                updateDeliverHistoryFromRes(data.deliverHistory)
                updateReceivedOrderFromRes(data.receivedOrder)
                break

              case constant.JOBS.WHOLESALER:
                updateDeliverHistoryFromRes(data.deliverHistory)
                updateReceivedOrderFromRes(data.receivedOrder)
                updateOrderHistoryFromRes(data.orderHistory)
                updateDeliveredNumberFromRes(data.deliveredNumber)
                break

              case constant.JOBS.RETAILER:
                updateDeliverHistoryFromRes(data.deliverHistory)
                updateReceivedOrderFromRes(data.receivedOrder)
                updateOrderHistoryFromRes(data.orderHistory)
                updateNewsFromRes(data.news)
                updateDeliveredNumberFromRes(data.deliveredNumber)
                break
            }
          } else if (this.isStaffTeam()) {
            let updateMarketFromRes = market => {
              this.getState().market.orderAmount = market.orderAmount
              this.getState().market.storageAmount = market.storageAmount
              this.getState().market.price = market.price
            }

            let updateOrderVsStorageFromRes = orderVsStorage => {
              Object.assign(this.state.orderVsStorage, orderVsStorage)
            }

            let updateTeamStorageListFromRes = teamStorageList => {
              Object.assign(this.state.teamStorageList, teamStorageList)
            }

            switch (this.getJob()) {
              case constant.STAFF_JOBS.CONSOLER:
                updateMarketFromRes(data.market)
                updateOrderVsStorageFromRes(data.orderVsStorage)
                updateTeamStorageListFromRes(data.teamStorageList)
                break

              case constant.STAFF_JOBS.MARKET:
                updateMarketFromRes(data.market)
                updateOrderVsStorageFromRes(data.orderVsStorage)
                break

              case constant.STAFF_JOBS.TRANSPORTER:
                updateOrderVsStorageFromRes(data.orderVsStorage)
                break

              case constant.STAFF_JOBS.EXCHANGER:
                updateTeamStorageListFromRes(data.teamStorageList)
                break
            }
          }
        }.bind(this)
      )
      .catch(
        function(err) {
          console.error(err)
        }.bind(this)
      )
  }

  setGameId(gameId) {
    this.getState().gameId = gameId
    return this
  }

  setGameConfig(config) {
    this.getState().gameConfig = Object.assign(this.getGameConfig(), config)
  }

  setTeam(team) {
    this.getState().teamIndex = team
    return this
  }

  setJob(job) {
    this.getState().job = job
    switch (job) {
      case constant.JOBS.RETAILER:
        this.getColor().primary = 'blue-grey'
        this.getColor().accent = 'light-blue'
        this.getColor().themeColor = '#607d8b'
        break
      case constant.JOBS.WHOLESALER:
        this.getColor().primary = 'teal'
        this.getColor().accent = 'lime'
        this.getColor().themeColor = '#009688'
        break
      case constant.JOBS.FACTORY:
        this.getColor().primary = 'amber'
        this.getColor().accent = 'indigo'
        this.getColor().themeColor = '#ffc107'
        break
    }
    // let metaThemeColor = document.querySelector('meta[name=theme-color]')
    // metaThemeColor.setAttribute('content', this.getColor().themeColor)
    return this
  }

  getGameId() {
    return this.getState().gameId
  }

  getGameConfig() {
    return this.getState().gameConfig
  }

  getTeamNumber() {
    return this.getGameConfig().teamNumber
  }

  getTeam() {
    return this.getState().teamIndex
  }

  getJob() {
    return this.getState().job
  }

  isStaffTeam() {
    return isStaffTeam(this.getTeam())
  }

  getGameStage() {
    return this.getState().stage
  }

  getDayStartTime() {
    return this.getState().dayStartTime
  }

  isWorking() {
    return this.getState().isWorking
  }

  isOffWork() {
    return (
      this.getGameStage() === constant.GAME_STAGE.START && !this.isWorking()
    )
  }

  getDay() {
    return this.getState().day
  }

  getTime() {
    if (this.getGameStage() !== constant.GAME_STAGE.START) {
      return constant.UNKNOWN_TIME
    } else if (this.getDayStartTime() === constant.UNKNOWN_TIME) {
      return this.getGameConfig().dayLong * 1000
    } else {
      return Date.now() - this.getDayStartTime()
    }
  }

  updateTime() {
    gameApi.getGameIdTime(this.getGameId()).then(
      function(res) {
        let data = res.data
        this.getState().day = parseInt(data.day)
        this.getState().dayStartTime = parseInt(data.dayStartTime)
      }.bind(this)
    )
  }

  updateAccount() {
    accountApi.getBalance(this.getGameId(), this.getTeam()).then(
      function(res) {
        let data = res.data
        this.getAccount().balance = data.balance
      }.bind(this)
    )
  }

  updateStorage() {
    storageApi.getStorage(this.getGameId(), this.getTeam(), this.getJob()).then(
      function(res) {
        this.getState().storage.splice(0, this.getState().storage.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().storage.push(list[key])
        }
      }.bind(this)
    )
  }

  updateReceivedOrder() {
    orderApi.getReceived(this.getGameId(), this.getTeam(), this.getJob()).then(
      function(res) {
        this.getState().receivedOrder.splice(
          0,
          this.getState().receivedOrder.length
        )
        let list = res.data.list
        for (let key in list) {
          this.getState().receivedOrder.push(list[key])
        }
      }.bind(this)
    )
  }

  updateOrderHistory() {
    orderApi.getHistory(this.getGameId(), this.getTeam(), this.getJob()).then(
      function(res) {
        this.getState().orderHistory.splice(
          0,
          this.getState().orderHistory.length
        )
        let list = res.data.list
        for (let key in list) {
          this.getState().orderHistory.push(list[key])
        }
      }.bind(this)
    )
  }

  updateDeliverHistory() {
    deliverApi.getHistory(this.getGameId(), this.getTeam(), this.getJob()).then(
      function(res) {
        this.getState().deliverHistory.splice(
          0,
          this.getState().deliverHistory.length
        )
        let list = res.data.list
        for (let key in list) {
          this.getState().deliverHistory.push(list[key])
        }
      }.bind(this)
    )
  }

  updateNews() {
    newsApi.getNews(this.getGameId()).then(
      function(res) {
        this.getState().news.splice(0, this.getState().news.length)
        let list = res.data.list
        for (let key in list) {
          this.getState().news.unshift(list[key])
        }
      }.bind(this)
    )
  }

  test() {
    this.setTeam(1)
    this.setJob(constant.JOBS.RETAILER)
    let interval = 10
    let times = 1000
    let t = 0
    let a = setInterval(
      function() {
        console.log('test', t)
        this._update()
        if (t++ === times) {
          console.log('done')
          clearInterval(a)
        }
      }.bind(this),
      interval
    )
  }
}

export let nowUser = new User()
