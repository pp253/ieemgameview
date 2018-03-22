import axios from 'axios'

export function getUpdate (gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_update', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    })
      .then(function (res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export function getBalanceByGame (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_balance_by_game', {
      gameId: gameId
    })
      .then(function (res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export function getMarketInfo (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_market_info', {
      gameId: gameId
    })
      .then(function (res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export function getData (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_data', {
      gameId: gameId
    })
      .then(function (res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
