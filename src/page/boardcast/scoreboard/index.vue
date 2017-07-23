<template>
  <div id="scoreboard" class="scoreboard">
    <main>
      <v-layout row-sm column child-flex-sm>
        <v-card class="clock elevation-0">
          <v-card-text>
            <game-clock></game-clock>
          </v-card-text>
        </v-card>
        <v-card class="score elevation-0">
          <v-card-text>
            <div class="ranking">
              <h5>排行榜</h5>
              <div
                v-for="t in rankingList"
              >
                <div :class="t.isTop ? 'top-ranking primary--text' : ''">{{ t.readableTeam }}　{{ t.readableBalance }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-layout>
    </main>
  </div>
</template>

<script>
import * as api from '../../../lib/api'
import * as readable from '../../../lib/readable'
import * as dataApi from '../../../lib/api/data'
import * as constant from '../../../lib/constant'
import * as enterApi from '../../../lib/api/enter'
import {router} from '../../../router'

export default {
  data () {
    return {
      state: api.nowUser.getState(),
      rankingList: [],
      timer: null
    }
  },
  methods: {
    updateRanking () {
      dataApi.getBalanceByGame(api.nowUser.getGameId())
        .then((function (res) {
          let list = res.data.list
          let result = []

          list.forEach((function (i, k) {
            result.push({
              teamIndex: k + 1,
              readableTeam: readable.toReadableTeam(k + 1),
              isTop: false,
              balance: i,
              readableBalance: readable.toReadableDollar(i),
            })
          }).bind(this))

          result.sort((a, b) => {
            return a.balance < b.balance
          })

          let m = result[0].balance
          for (let i of result) {
            if (i.balance === m) {
              i.isTop = true
            }
          }

          this.rankingList.splice(0, this.rankingList.length)
          result.forEach((function (i) {
            this.rankingList.push(i)
          }).bind(this))
        }).bind(this))

      if (this.state.stage === constant.GAME_STAGE.END) {
        router.push('/boardcast/endpage')
      }
    }
  },
  mounted () {
    this.timer = setInterval(this.updateRanking.bind(this), 1000)
  }
}
</script>

<style>
.scoreboard .score {
  padding-top: 30vh;
  height: 100vh !important;
}

.scoreboard .clock {
  padding-top: 30vh;
  height: 100vh !important;
}

.scoreboard .ranking {
  text-align: center;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.6);
}

.scoreboard .ranking .top-ranking {
  font-size: 40px;
  color: rgba(0, 0, 0, 1);
}

.progress-circular__info {
  font-size: 30px;
}
</style>
