

export const ZERO_DAYTIME = {
  DAY: -1,
  TIME: -1
}

export const GAMES = {
  UNKNOWN: -1
}

export const READABLE_GAMES = {
  [GAMES.UNKNOWN]: '未知遊戲'
}

export const TEAMS = {
  UNKNOWN: -1,
  STAFF: 0
}

export const READABLE_TEAMS = {
  [TEAMS.UNKNOWN]: '未知組別',
  [TEAMS.STAFF]: '工作人員'
}

export const PRODUCTS = {
  UNKNOWN: 0,
  CAR: 1,
  WHEEL: 2,
  BODY: 3,
  ENGINE: 4,
  WAREHOUSE: 5,
  WAGE: 6,
  TRANSPORT: 7
}

export const READABLE_PRODUCTS = {
  UNKNOWN: '未知產品',
  CAR: '車子',
  WHEEL: '輪胎',
  BODY: '車身',
  ENGINE: '引擎',
  WAREHOUSE: '倉庫',
  WAGE: '工人薪水',
  TRANSPORT: '貨車'
}

export const JOBS = {
  UNKNOWN: 0,
  FACTORY: 1,
  WHOLESALER: 2,
  RETAILER: 3
}

export const STAFF_JOBS = {
  UNKNOWN_STAFF: 4,
  GUERRILLA: 5,
  KEEPER: 6,
  EXCHANGER: 7,
  TRANSPORTER: 8,
  MARKET: 9,
  CONFIRMER: 10,
  CONSOLER: 11
}

export const READABLE_JOBS = {
  UNKNOWN: '未知',
  FACTORY: '工廠',
  WHOLESALER: '批發商',
  RETAILER: '零售商',
  UNKNOWN_STAFF: '未知工作人員',
  KEEPER: '關主',
  EXCHANGER: '交換處',
  TRANSPORTER: '運輸者',
  MARKET: '市場代表者',
  GUERRILLA: '游擊者、工人',
  CONFIRMER: '資料確認者',
  CONSOLER: '後臺控制者'
}
/*
export const READABLE_JOBS = {
  [JOBS.UNKNOWN]: '未知',
  [JOBS.FACTORY]: '工廠',
  [JOBS.WHOLESALER]: '批發商',
  [JOBS.RETAILER]: '零售商',
  [STAFF_JOBS.UNKNOWN_STAFF]: '未知工作人員',
  [STAFF_JOBS.KEEPER]: '關主',
  [STAFF_JOBS.EXCHANGER]: '交換處',
  [STAFF_JOBS.TRANSPORTER]: '運輸者',
  [STAFF_JOBS.MARKET]: '市場代表者',
  [STAFF_JOBS.GUERRILLA]: '游擊者',
  [STAFF_JOBS.CONFIRMER]: '資料確認者',
  [STAFF_JOBS.CONSOLER]: '後臺控制者'
}
*/
export class TimeType {
  constructor (day, time) {
    this.day = day || ZERO_DAYTIME.DAY
    this.time = time || ZERO_DAYTIME.TIME
  }

  setDay (day) {
    this.day = day
    return this
  }

  setTime (time) {
    this.time = time
    return this
  }

  getDay () {
    return this.day
  }

  getTime () {
    return this.time
  }

  isWorking () {
    return this.time > 0
  }
}

export class Storages {
  constructor (gameId = GAMES.UNKNOWN, teamIndex = TEAMS.UNKNOWN, job = JOBS.UNKNOWN) {

  }

  load () {

  }

  save () {

  }

  update () {

  }
}


export class Account {
  constructor (gameId, teamIndex) {

  }

  load () {

  }

  save () {

  }

  update () {

  }

  insert () {

  }

  getBalance () {

  }
}

export class Order {
  constructor (gameId = GAMES.UNKNOWN, teamIndex = TEAMS.UNKNOWN) {
    this.gameId = gameId
    this.teamIndex = teamIndex

    
  }
}

export class Orders {

}

export class Team {
  constructor (gameId, teamIndex) {
    this.gameId = gameId
    this.teamIndex = teamIndex
    
    this.account = new Account(this.gameId, this.teamIndex)
    this.balance = this.account.getBalance()

    this.storage = new Storages(this.gameId, this.teamIndex)

    this.orders = new Orders(this.gameId, this.teamIndex)
  }

  load () {

  }

  save () {

  }

  update () {
    
  }

  getReceivedOrders (fromTime = ZERO_DAYTIME) {
    this.orders // ...
  }

  setOrder (order) {

  }
}


export class Game {
  constructor () {
    
  }

  load () {

  }

  save () {

  }

  update () {
    
  }
}
