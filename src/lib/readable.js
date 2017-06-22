import * as api from './api'

export const PRODUCTS = {
  999: '未知',
  0: '車子',
  1: '物料A',
  2: '物料B',
  3: '物料C',
  4: '倉庫',
  5: '工人薪水',
  6: '貨車'
}

export function toReadableDays (days) {
  return '第' + days + '天'
}

export function toReadableTimes (times) {
  var s = times % 60
  var m = (times - s) / 60
  return s + ':' + (m < 10 ? '0' : '') + m
}

export function toReadableGameTime (days, times) {
  return toReadableDays(days) + ' ' + toReadableTimes(times)
}

export function toReadableTeam (team) {
  return '第' + team + '組'
}

export function toReadableDollar (dollar) {
  return '$' + dollar
}

export function readableJobList () {
  let indexList = [
    api.Jobs.factory,
    api.Jobs.retailer,
    api.Jobs.wholeseller,
    api.Jobs.teamleader
  ]
  let list = []
  for (let i of indexList) {
    list.push({
      index: i,
      title: toReadableJob(i)
    })
  }
  return list
}

export function readableStaffJobList () {
  let indexList = [
    api.StaffJobs.exchange,
    api.StaffJobs.market
  ]
  let list = []
  for (let i of indexList) {
    list.push({
      index: i,
      title: toReadableJob(i)
    })
  }
  return list
}

export function toReadableJob (job) {
  let JobsString = {
    0: '未知',
    1: '製造商',
    2: '批發商',
    3: '零售商',
    4: '隊輔',
    5: '未知',
    6: '交換處',
    7: '市場'
  }

  return JobsString[job]
}

export function toReadablePosition (position) {
  return toReadableTeam(position.team) + ' ' + toReadableJob(position.job)
}

export function toReadableProduct (product) {
  return PRODUCTS[product]
}

export function toReadableOrderList (list) {
  let readableList = []
  list.forEach(function (item) {
    let it = {
      readableDayTime: toReadableGameTime(item.gameTime),
      readableBuyer: toReadablePosition(item.buyer),
      readableProduct: toReadableProduct(item.product),
      quantity: item.quantity,
      delivered: item.delivered
    }
    readableList.push(it)
  })
  return readableList
}
