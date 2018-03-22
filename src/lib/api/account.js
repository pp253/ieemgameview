import axios from 'axios'

export function getBalance(gameId, teamIndex) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/account/get_balance', {
        gameId: gameId,
        teamIndex: teamIndex
      })
      .then(res => {
        res.data.err ? reject(res) : resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getHistory(gameId, teamIndex) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/account/get_history', {
        gameId: gameId,
        teamIndex: teamIndex
      })
      .then(res => {
        res.data.err ? reject(res) : resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function give(gameId, teamIndex, balance) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/account/give', {
        gameId: gameId,
        teamIndex: teamIndex,
        balance: balance
      })
      .then(res => {
        res.data.err ? reject(res) : resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function take(gameId, teamIndex, balance) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/account/take', {
        gameId: gameId,
        teamIndex: teamIndex,
        balance: balance
      })
      .then(res => {
        res.data.err ? reject(res) : resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
