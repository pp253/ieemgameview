import axios from 'axios'

export function getHistory(gameId, teamIndex, job) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/order/get_history', {
        gameId: gameId,
        teamIndex: teamIndex,
        job: job
      })
      .then(function(res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

export function getReceived(gameId, teamIndex, job) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/order/get_received', {
        gameId: gameId,
        teamIndex: teamIndex,
        job: job
      })
      .then(function(res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

export function setOrder(gameId, teamIndex, job, product, amount) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/order/set_order', {
        gameId: gameId,
        teamIndex: teamIndex,
        job: job,
        product: product,
        amount: amount
      })
      .then(function(res) {
        if (res.data.err) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}
