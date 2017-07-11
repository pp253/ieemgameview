import * as api from './api'
import * as constant from './constant'

export function toReadableDay (day) {
  return '第' + day + '天'
}

export function toReadableTime (time) {
  if (time === constant.UNKNOWN_TIME) {
    return constant.READABLE_GAME_WORK.OFF_WORK
  }
  let t = parseInt(time / 1000)
  let s = t % 60
  let m = (t - s) / 60
  return constant.READABLE_GAME_WORK.WORKING + ' ' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s
}

export function toReadableGameTime (dayTime) {
  return toReadableDay(dayTime.day) + ' ' + toReadableTime(dayTime.time)
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
  let readableList = []
  list.forEach(function (item) {
    let it = {
      readableDayTime: toReadableGameTime(item.gameTime),
      readableBuyer: toReadablePosition(item.buyer),
      readableProduct: toReadableProduct(item.product),
      amount: item.amount,
      delivered: item.delivered
    }
    readableList.push(it)
  })
  return readableList
}

export function toReadableProduct (product) {
  return constant.PRODUCTS[product]
}

export function toReadableDeliverList (list) {
  return []
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
  let readableList = []
  list.forEach(function (item) {
    let it = {
      readableDayTime: toReadableGameTime(item.gameTime),
      readableBuyer: toReadablePosition(item.buyer),
      readableProduct: toReadableProduct(item.product),
      amount: item.amount,
      delivered: item.delivered
    }
    readableList.push(it)
  })
  return readableList
}
