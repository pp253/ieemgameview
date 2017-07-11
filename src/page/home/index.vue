<template>
  <div id="home" class="home">
    <v-card>
      <v-card-text class="text-xs-center head">
        <div class="logo"></div>
        <!--<h3>REDRO產銷遊戲</h3>-->
        <h5>2017 工工營 PRE-ALPHA</h5>
      </v-card-text>
      <v-layout row wrap>
        <v-flex v-for="(item, index) in gameList" :key="index" xs12>
          <v-card class="cyan darken-2 white--text">
            <v-card-title primary-title>
              <div class="headline">{{ item.text }}</div>
              <div>{{ item.describe }}</div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat dark v-on:click.native="intoGame(item.index, item.gameConfig)">進入遊戲</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import * as api from '../../lib/api'
import * as enterApi from '../../lib/api/enter'
import {router} from '../../router'

export default {
  data () {
    return {
      gameList: []
    }
  },
  methods: {
    intoGame (gameId, gameConfig) {
      console.log('User Game:', gameId)
      api.nowUser.setGameId(gameId)
      api.nowUser.setGameConfig(gameConfig)
      router.push('/choose')
    }
  },
  created: function () {
    // load gameList and use promise to change the gameList
    enterApi.getGameIdList()
      .then((function (res) {
        for (let game of res.data.gameList) {
          this.gameList.push({
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
.home .head {
  padding-top: 60px;
  padding-bottom: 60px;
}

.home .layout {
  padding-left: 14px;
  padding-right: 14px;
}

.home .card {
  height: 100% !important;
}

.home .headline {
  display: block;
  width: 100%;
}

.home .card__text {
  padding-right: 0;
  padding-left: 0;
}

.home .list__tile__title {
  color: rgba(0, 0, 0, 0.87);
}

.home .flex {
  margin-bottom: 8px;
}
</style>
