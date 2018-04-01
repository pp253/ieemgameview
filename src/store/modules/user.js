import api from '@/api'

export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: '',
    sessionToken: '',
    authCode: '',
    gameId: null,
    teamIndex: null,
    job: null
  },
  mutations: {
    SET_GAME_ID(state, options) {},
    SET_TEAM_INDEX(state, options) {},
    SET_JOB(state, options) {},
    RESET(state, options) {}
  },
  getters: {},
  actions: {}
}
