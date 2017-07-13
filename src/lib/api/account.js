export function getBalance (gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_balance', {
      gameId: gameId,
      teamIndex: teamIndex
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

export function getHistory (gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_history', {
      gameId: gameId,
      teamIndex: teamIndex
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
