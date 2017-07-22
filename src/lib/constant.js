export const UNKNOWN_TIME = -1

export const ZERO_DAYTIME = {
  DAY: -1,
  TIME: -1
}

export const GAMES = {
  UNKNOWN: 'UNKNOWN'
}

export const GAME_STAGE = {
  UNKNOWN: 'UNKNOWN',
  // PREPARE STAGE: 開放登記進入遊戲
  PREPARE: 'PREPARE',
  // READY STAGE: 人員不可再變動
  READY: 'READY',
  // START STAGE: 遊戲進行中
  START: 'START',
  // FINAL STAGE: 進行結算
  FINAL: 'FINAL',
  // END STAGE: 遊戲封存，不可再更動，但可以讀取資料
  END: 'END'
}

export const GAME_WORK = {
  UNKNOWN: 'UNKNOWN',
  WORKING: 'WORKING',
  OFF_WORK: 'OFF_WORK'
}

export const READABLE_GAME_WORK = {
  UNKNOWN: '未知階段',
  WORKING: '上班',
  OFF_WORK: '下班'
}

export const READABLE_GAMES = {
  UNKNOWN: '未知遊戲'
}

export const TEAMS = {
  UNKNOWN: 'UNKNOWN',
  STAFF: 0
}

export const READABLE_TEAMS = {
  UNKNOWN: '未知組別',
  STAFF: '工作人員'
}

export const PRODUCTS = {
  UNKNOWN: 'UNKNOWN',
  CAR: 'CAR',
  WHEEL: 'WHEEL',
  BODY: 'BODY',
  ENGINE: 'ENGINE',
  WAREHOUSE: 'WAREHOUSE',
  WAGE: 'WAGE',
  TRANSPORT: 'TRANSPORT'
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
  UNKNOWN: 'UNKNOWN',
  FACTORY: 'FACTORY',
  WHOLESALER: 'WHOLESALER',
  RETAILER: 'RETAILER'
}

export const STAFF_JOBS = {
  UNKNOWN_STAFF: 'UNKNOWN_STAFF',
  GUERRILLA: 'GUERRILLA',
  KEEPER: 'KEEPER',
  EXCHANGER: 'EXCHANGER',
  TRANSPORTER: 'TRANSPORTER',
  MARKET: 'MARKET',
  CONFIRMER: 'CONFIRMER',
  CONSOLER: 'CONSOLER'
}

export const READABLE_JOBS = {
  UNKNOWN: '未知',
  FACTORY: '工廠',
  WHOLESALER: '批發商',
  RETAILER: '零售商',
  UNKNOWN_STAFF: '未知工作人員',
  KEEPER: '關主',
  EXCHANGER: '製造部',
  TRANSPORTER: '物流士',
  MARKET: '市場代表者',
  GUERRILLA: '游擊者、工人',
  CONFIRMER: '資料確認者',
  CONSOLER: '後臺控制者'
}
