export function getGameIdList () {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_game_list')
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

export function newGame (gameConfig) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/new_game', {
      gameConfig: gameConfig
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
