<template>
  <div class="choose">
    <v-toolbar class="light-blue white--text">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="(item, index) in gameList" :key="index" xs12>
            <v-card class="blue darken-2 white--text">
              <v-card-title primary-title>
                <div class="headline">{{ item.text }}</div><br />
                <div>{{ item.describe }}</div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline flat dark @click.native="intoGame(item.index, item.gameConfig)">進入遊戲</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <div v-show="gameList.length === 0" style="text-align: center; width: 100%;">
            <br /><br /><br /><br /><br /><br />
            <p>尚無進行中的遊戲</p>
          </div>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
import * as api from '../../../lib/api'
import * as enterApi from '../../../lib/api/enter'
import {router} from '../../../router'

export default {
  data () {
    return {
      title: '選擇遊戲',
      gameList: []
    }
  },
  methods: {
    intoGame (gameId, gameConfig) {
      console.log('User Game:', gameId)
      api.nowUser.setGameId(gameId)
      api.nowUser.setGameConfig(gameConfig)
      router.push('/choose/team')
    }
  },
  created () {
    // load gameList and use promise to change the gameList
    api.nowUser.resetState()
    enterApi.getGameIdList()
      .then((function (res) {
        for (let game of res.data.gameList) {
          this.gameList.unshift({
            index: game.gameId,
            text: game.gameConfig.title,
            describe: game.gameConfig.describe,
            gameConfig: game.gameConfig
          })
        }
      }).bind(this))
      .catch(function (err) {
        console.error(err)
      })
  }
}
</script>

<style>
</style>
