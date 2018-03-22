import axios from 'axios'

export function nextGameStage (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/next_game_stage', {
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

export function getGameStage (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_stage', {
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

export function getGameIdTime (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_time', {
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

export function nextDay (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/set_game_next_day', {
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
