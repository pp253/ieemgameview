<template>
  <div class="home choose">
    <v-toolbar class="orange elevation-5">
      <v-toolbar-title>首頁</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate v-bind:size="25" class="white--text"></v-progress-circular>
    </v-toolbar>
    <main>
      <div class="head text-xs-center">
        <div class="logo"></div>
        <h5 class="headline">請稍後，遊戲即將開始</h5>
        如果剛剛的講解有任何不清楚的地方，你現在可以向旁邊的隊輔們提出疑問，他們會為你解答。
      </div>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as constant from '../../../lib/constant'
import * as api from '../../../lib/api'
import * as gameApi from '../../../lib/api/game'

export default {
  data () {
    return {
      timer: null
    }
  },
  computed: {
    readableTeam () {
      return readable.toReadableTeam(api.nowUser.getTeam())
    },
    readableJob () {
      return readable.toReadableJob(api.nowUser.getJob())
    }
  },
  methods: {
    checkStageUpdate () {
      gameApi.getGameStage(api.nowUser.getGameId())
        .then((function (res) {
          let stage = res.data.stage
          if (stage === constant.GAME_STAGE.START) {
            clearInterval(this.timer)
            this.intoBelong()
          }
        }).bind(this))
        .catch(function (err) {
          console.error(err)
        })
    },
    intoBelong () {
      router.push('/round/' + api.nowUser.getJob().toLowerCase())
    }
  },
  mounted () {
    console.log(api.nowUser.getJob(), constant.STAFF_JOBS.CONSOLER)
    if (api.nowUser.getJob() === constant.STAFF_JOBS.CONSOLER) {
      this.intoBelong()
    } else {
      this.timer = setInterval(this.checkStageUpdate.bind(this), 1000)
    }
  }
}
</script>

<style>
</style>
