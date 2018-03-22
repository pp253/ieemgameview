import axios from 'axios'

export function setStorage(gameId, teamIndex, job, product, amount) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/storage/set_storage', {
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

export function getStorage(gameId, teamIndex, job) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/storage/get_storage', {
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

export function getHistory(gameId, teamIndex, job) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/storage/get_history', {
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
