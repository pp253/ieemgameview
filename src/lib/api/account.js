export function nextGameStage (gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_balance', {
      gameId: gameId,
      teamIndex: teamIndex
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
