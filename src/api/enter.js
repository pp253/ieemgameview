import axios from 'axios'
import { legalRequest } from './'

export function getAvailableList() {
  return legalRequest('/api/enter/get_game_list')
}

export function newGame(gameConfig) {
  return legalRequest('/api/enter/new_game', { gameConfig: gameConfig })
}

export function getCode(gameConfig) {
  return legalRequest('/api/enter/get_code', {
    gameConfig: gameConfig
  })
}

export function getRegist(gameConfig) {
  return legalRequest('/api/enter/get_regist', {
    gameConfig: gameConfig
  })
}

export function regist(nickname, code) {
  return legalRequest('/api/enter/regist', { nickname: nickname, code: code })
}

export function setRegistByCode(code) {
  return legalRequest('/api/enter/set_regist_by_code', { code: code })
}

export function enroll(userId, gameId, teamIndex, job) {
  return legalRequest('/api/enter/enroll', {
    userId: userId,
    gameId: gameId,
    teamIndex: teamIndex,
    job: job
  })
}
