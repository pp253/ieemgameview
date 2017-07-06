import {TimeType} from '../constant'

export class Time {
  constructor (position) {
    this.position = position
    this.time = new TimeType()
    reload()
  }

  reload (callback) {
    axios.post('/api/time/get', {
        position: this.position
      })
      .then(function (response) {
        console.log(response)

        if (callback) {
          callback(response)
        }
      })
      .catch(function (error) {
        console.log(error)

        if (callback) {
          callback(error)
        }
      })
  }

  now () {
    return this.time
  }

  nextday () {
    // axios
  }

  isWorking () {
    return this.time.isWorking
  }
}
