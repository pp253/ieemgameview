<template>
  <div>
    <main>
      <v-tabs
        v-model="activeTab"
        dark fixed centered
      >
        <v-toolbar dark class="cyan elevation-0">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <span>{{ toolbarInfo }}</span>
        </v-toolbar>
        <v-tabs-bar
          slot="activators"
          class="cyan"
        >
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.index"
            :href="'#' + tab.id"
          >
            {{ tab.title }}
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content
          :key="0"
          id="online-status"
        >
          <online-status></online-status>
        </v-tabs-content>
        <v-tabs-content
          :key="1"
          id="dynamic-log"
        >
          <v-card>
            <v-card-title>階段管理</v-card-title>
            <v-card-text>
              <ul>
                <li>確定list</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary v-on:click.native="nextGameStage">下一階段</v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title>下一天</v-card-title>
            <v-card-text>
              <ul>
                <li>確定list</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary v-on:click.native="nextDay">下一天</v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title>特別功能</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <account-dialog :announce="announce"></account-dialog>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title>處理速度測試</v-card-title>
            <v-card-text>
              <ul>
                <li>確定list</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary v-on:click.native="test">測試</v-btn>
            </v-card-actions>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :key="2"
          id="game-info"
        >
          <info-panel :game-config="gameConfig"></info-panel>
        </v-tabs-content>
      </v-tabs>
    </main>
    <v-snackbar
      :timeout="6000"
      secondary
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">知道了</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as constant from '../../../lib/constant'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'
import * as gameApi from '../../../lib/api/game'

export default {
  data () {
    return {
      title: readable.toReadableJob(api.nowUser.getJob()),
      state: api.nowUser.getState(),
      tabs: [
        { index: 0, id: 'online-status', title: '連線狀況' },
        { index: 1, id: 'dynamic-log', title: '即時動態' },
        { index: 2, id: 'game-info', title: '遊戲資訊' }
      ],
      activeTab: null,
      snackbar: false,
      snackbarText: '',
      gameConfig: api.nowUser.getGameConfig()
    }
  },
  computed: {
    toolbarInfo () {
      return readable.toReadableGameTime(this.state)
    }
  },
  methods: {
    intoBoardCast () {
      router.push('/boardcast')
    },
    nextGameStage () {
      gameApi.nextGameStage(api.nowUser.getGameId())
        .then((function (res) {
          let data = res.data
          let gameId = data.gameId
          let stage = data.stage
          this.announce(`GameId='${gameId}' Stage has been set to ${stage}`)
        }).bind(this))
        .catch(function (err) {
          console.error(err)
        })
    },
    nextDay () {
      gameApi.nextDay(api.nowUser.getGameId())
        .then((function (res) {
          let data = res.data
          let gameId = data.gameId
          let day = data.day
          this.announce(`GameId='${gameId}' Stage has been set to day ${day}`)
        }).bind(this))
        .catch(function (err) {
          console.error(err)
        })
    },
    test () {
      api.nowUser.test()
    },
    announce (msg) {
      this.snackbarText = msg
      this.snackbar = true
    }
  }
}
</script>

<style>
</style>
