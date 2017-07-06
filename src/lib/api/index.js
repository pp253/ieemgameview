import * as constant from '../constant'

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

export class Position {
  constructor (gameid = constant.GAMES.UNKNOWN,
               team = constant.TEAMS.UNKNOWN,
               job = constant.JOBS.UNKNOWN) {
    this.gameid = gameid
    this.team = team
    this.job = job
    return this
  }

  setGame (gameid) {
    this.gameid = gameid
    return this
  }

  setTeam (team) {
    this.team = team
    return this
  }

  setJob (job) {
    this.job = job
    return this
  }

  getGame () {
    return this.gameid
  }

  getTeam () {
    return this.team
  }

  getJob () {
    return this.job
  }

  isStaffTeam () {
    return isStaffTeam(this.team)
  }
}

export class User {
  constructor () {
    this.position = new Position()
    this.daytime = new constant.TimeType(3, 44)
    return this
  }

  setGame (gameid) {
    this.position.setGame(gameid)
    return this
  }

  setTeam (team) {
    this.position.setTeam(team)
    return this
  }

  setJob (job) {
    this.position.setJob(job)
    return this
  }

  getGame () {
    return this.position.getGame()
  }

  getTeam () {
    return this.position.getTeam()
  }

  getJob () {
    return this.position.getJob()
  }

  isStaffTeam () {
    return this.position.isStaffTeam()
  }

  getDayTime () {
    return this.daytime
  }
}

export let nowUser = new User()
