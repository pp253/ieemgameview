export function getNews (gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/news/get_news', {
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