import * as constant from './constant'

export function toReadableDay (day) {
  if (day <= 0) {
    return '已結束'
  }
  return '第' + day + '天'
}

export function toReadableTime (time, showWorking = true) {
  if (time > 36000000 || time === constant.UNKNOWN_TIME) {
    return constant.READABLE_GAME_WORK.OFF_WORK
  }
  let t = parseInt(time / 1000)
  let s = t % 60
  let m = (t - s) / 60
  return (showWorking ? constant.READABLE_GAME_WORK.WORKING + ' ' : '') + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s
}

export function toReadableGameTime (dayTime, showWorking = true) {
  switch (dayTime.stage) {
    case constant.GAME_STAGE.UNKNOWN:
    case constant.GAME_STAGE.PREPARE:
    case constant.GAME_STAGE.READY:
      return '尚未開始'
    case constant.GAME_STAGE.START:
      return toReadableDay(dayTime.day) + ' ' + toReadableTime(dayTime.time, showWorking)
    case constant.GAME_STAGE.FINAL:
      return '結算中'
    case constant.GAME_STAGE.END:
      return '已結束'
  }
}

export function toReadableTeam (team) {
  if (team === constant.TEAMS.STAFF) {
    return constant.READABLE_TEAMS.STAFF
  }
  return '第' + team + '組'
}

export function toReadableDollar (dollar) {
  return '$' + dollar
}

export function toReadableTeamList (teamNumber) {
  let list = []
  for (let i = 1; i <= teamNumber; i++) {
    list.push({
      index: i,
      text: toReadableTeam(i)
    })
  }
  return list
}

export function toReadableTeamListWithStaff (teamNumber) {
  let list = toReadableTeamList(teamNumber)
  list.push({
    index: constant.TEAMS.STAFF,
    text: '工作人員'
  })
  return list
}

export function readableJobList () {
  let list = []
  for (let idx in constant.JOBS) {
    if (idx === 'UNKNOWN') {
      continue
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    })
  }
  return list
}

export function readableStaffJobList () {
  let list = []
  for (let idx in constant.STAFF_JOBS) {
    if (idx === 'UNKNOWN_STAFF') {
      continue
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    })
  }
  return list
}

export function toReadableJob (job) {
  return constant.READABLE_JOBS[job]
}

export function toReadablePosition (position) {
  return toReadableTeam(position.team) + ' ' + toReadableJob(position.job)
}

// list as StorageList
export function toReadableStorageList (list) {
  let result = []
  for (let item of list) {
    result.push({
      readableProduct: toReadableProduct(item.product),
      amount: item.amount
    })
  }
  return result
}

export function toReadableProduct (product) {
  return constant.READABLE_PRODUCTS[product]
}

export function toReadableDeliverList (list) {
  let result = []
  let realAmount = 0
  for (let item of list) {
    realAmount = parseInt(item.amount) - realAmount
    result.push({
      readableGameTime: toReadableGameTime(item),
      amount: realAmount
    })
  }
  return result
}

export function readableProductList () {
  let list = []
  for (let key in constant.PRODUCTS) {
    if (key === 'UNKNOWN') {
      continue
    } else if (key === 'WAREHOUSE') {
      break
    }
    list.push({
      index: key,
      text: constant.READABLE_PRODUCTS[key]
    })
  }
  return list
}

export function toReadableOrderList (list) {
  let result = []
  let realAmount = 0
  for (let item of list) {
    realAmount = parseInt(item.amount) - realAmount
    result.push({
      readableGameTime: toReadableGameTime(item, false),
      amount: realAmount,
      delivered: 0
    })
  }
  return result
}
