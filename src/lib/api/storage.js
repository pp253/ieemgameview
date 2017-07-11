export function setStorage (gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/set_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    })
      .then(function (res) {
        if (res.error) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

export function getStorage (gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/get_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    })
      .then(function (res) {
        if (res.error) {
          reject(res)
        }
        resolve(res)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}


