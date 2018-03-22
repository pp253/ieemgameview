import axios from 'axios'

export function getNews(gameId) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/news/get_news', {
        gameId: gameId
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

export function setNewsList(gameId, newsList) {
  return new Promise(function(resolve, reject) {
    axios
      .post('/api/news/set_news_list', {
        gameId: gameId,
        newsList: newsList
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
