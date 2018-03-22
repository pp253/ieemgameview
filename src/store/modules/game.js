export default {
  namespaced: true,
  state: {
    session: {},
    time: 0,
    timeCorrection: 0
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
    SET_TIME_CORRECTION(state, options) {}
  },
  actions: {
    timing(context, options) {},
    setStorage(context, {gameId, }) {

    },
  }
}
