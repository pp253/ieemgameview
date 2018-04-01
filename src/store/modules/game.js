import api from '@/api'

export default {
  namespaced: true,
  state: {
    session: {},
    time: 0,
    timeCorrection: 0,
    availableList: []
  },
  mutations: {
    ADD_GAME_SESSION(state, options) {
      state.session[options.gameId] = options.session
    },
    SET_STORAGE(state, options) {},
    SET_ORDER(state, options) {},
    SET_NEWS(state, options) {
      state.session[options.gameId].news = options.news
    },
    ADD_NEWS_REPORT(state, options) {
      state.session[options.gameId].news.push(options.report)
    },
    SET_DELIVER(state, options) {},
    SET_TIME(state, options) {},
    SET_TIME_CORRECTION(state, options) {},
    SET_AVAILABLE_LIST(state, options) {
      state.availableList = options.availableList
    }
  },
  actions: {
    timing(context, options) {},
    setStorage(context, { gameId }) {},
    getAvailableList(context) {
      api.enter.getAvailableList().then(data => {
        let availableList = []
        for (let game of data.gameList) {
          availableList.unshift({
            index: game.gameId,
            text: game.gameConfig.title,
            describe: game.gameConfig.describe,
            gameConfig: game.gameConfig
          })
        }
        context.commit('SET_AVAILABLE_LIST', {
          availableList: availableList
        })
      })
    },
    newGame(context, options) {
      return new Promise((resolve, reject) => {
        api.enter.newGame(options.gameConfig).then(data => {
          resolve(data)
        })
      })
    }
  }
}
