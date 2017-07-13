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
