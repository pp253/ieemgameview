import axios from 'axios'

export function getGameIdList () {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_game_list')
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

export function newGame (gameConfig) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/new_game', {
      gameConfig: gameConfig
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

export function getCode () {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_code', {
      gameConfig: gameConfig
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

export function getRegist () {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_regist', {
      gameConfig: gameConfig
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

export function regist (nickname, code) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/regist', {
      nickname: nickname,
      code: code
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

export function setRegistByCode (code) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/set_regist_by_code', {
      code: code
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

export function enroll (userId, gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/enroll', {
      userId: userId,
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


