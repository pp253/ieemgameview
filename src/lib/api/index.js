import * as constant from '../constant'
import * as gameApi from './game'
import * as accountApi from './account'

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
    this.account = {
      balance: 0
    }

    this.timer = setInterval(this._update.bind(this), 1000)

    return this
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
        this.dayTime.day = this.getDay()
        this.dayTime.time = this.getTime()
        this.dayTime.isWorking = this.isWorking()
        console.log()

        // update account
        if (!this.isStaffTeam()) {
          this.updateAccount()
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

  getAccount () {
    return this.account
  }

  updateAccount () {
    accountApi.nextGameStage(this.getGameId(), this.getTeam())
      .then((function (res) {
        let data = res.data
        this.getAccount().balance = data.balance
      }).bind(this))
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

  getDayTime () {
    return this.dayTime
  }

  updateTime () {
    gameApi.getGameIdTime(this.getGameId())
      .then((function (res) {
        let data = res.data
        this.day = data.day
        this.dayStartTime = data.dayStartTime
      }).bind(this))
  }
}

export let nowUser = new User()
