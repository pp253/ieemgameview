<template>
  <div class="home choose">
    <v-toolbar class="light-blue white--text elevation-5">
      <v-toolbar-title>準備開始</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="white--text"></span>
      <v-progress-circular indeterminate v-bind:size="25" class="white--text"></v-progress-circular>
    </v-toolbar>
    <main>
      <div class="head text-xs-center">
        <div class="logo"></div>
        <h5 class="headline">請稍後，遊戲即將開始</h5>
        <span class="gray--text">如果剛剛的講解有任何不清楚的地方，你現在可以向身旁的隊輔們提出疑問，他們會為你解答。</span>
        <br /><br /><br />
        <span class="gray--text">{{ readableTeam }} {{ readableJob }}</span>
      </div>
    </main>
    {{ intoBelong }}
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'
import * as gameApi from '@/lib/api/game'

export default {
  data() {
    return {
      timer: null,
      state: api.nowUser.getState()
    }
  },
  computed: {
    readableTeam() {
      return readable.toReadableTeam(api.nowUser.getTeam())
    },
    readableJob() {
      return readable.toReadableJob(api.nowUser.getJob())
    },
    intoBelong() {
      if (api.nowUser.getJob() === constant.STAFF_JOBS.CONSOLER) {
        this.$router.push('/round/' + api.nowUser.getJob().toLowerCase())
      }
      switch (this.state.stage) {
        case constant.GAME_STAGE.START:
        case constant.GAME_STAGE.FINAL:
          this.$router.push('/round/' + api.nowUser.getJob().toLowerCase())
          break
        case constant.GAME_STAGE.END:
          this.$router.push('/end')
          break
      }
      return ''
    }
  }
}
</script>

<style>
</style>
