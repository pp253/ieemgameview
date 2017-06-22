export const Products = {
  unknown: '未知',
  0: '車子',
  1: '物料A',
  2: '物料B',
  3: '物料C',
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

export class Position {
  constructor (team = Team.unknown, job = Jobs.unknown) {
    this.team = team
    this.job = job
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

  getTeam () {
    return this.team
  }

  getJob () {
    return this.job
  }
}

export class User {
  constructor () {
    this.position = new Position()
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

  getTeam () {
    return this.position.getTeam()
  }

  getJob () {
    return this.position.getJob()
  }
}

export let nowUser = new User()
