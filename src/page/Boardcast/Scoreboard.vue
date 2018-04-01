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
    <audio src="/sound/begin.mp3" id="sound-begin" class="audio"></audio>
    <audio src="/sound/break.mp3" id="sound-break" class="audio"></audio>
    {{ autoPlay }}
  </div>
</template>

<script>
import * as api from '@/lib/api'
import * as readable from '@/lib/readable'
import * as dataApi from '@/lib/api/data'
import * as constant from '@/lib/constant'
import * as enterApi from '@/lib/api/enter'

export default {
  data() {
    return {
      state: api.nowUser.getState(),
      rankingList: [],
      timer: null,
      lastIsWorking: false
    }
  },
  methods: {
    updateRanking() {
      dataApi.getBalanceByGame(api.nowUser.getGameId()).then(
        function(res) {
          let list = res.data.list
          let result = []

          list.forEach(
            function(i, k) {
              result.push({
                teamIndex: k + 1,
                readableTeam: readable.toReadableTeam(k + 1),
                isTop: false,
                balance: i,
                readableBalance: readable.toReadableDollar(i)
              })
            }.bind(this)
          )

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
          result.forEach(
            function(i) {
              this.rankingList.push(i)
            }.bind(this)
          )
        }.bind(this)
      )

      if (this.state.stage === constant.GAME_STAGE.END) {
        this.$router.push('/end')
      }
    }
  },
  computed: {
    autoPlay() {
      if (this.lastIsWorking !== this.state.isWorking) {
        this.lastIsWorking = this.state.isWorking
        if (this.lastIsWorking) {
          var audio = document.getElementById('sound-begin')
          audio.play()
        } else {
          var audio = document.getElementById('sound-break')
          audio.play()
        }
      }
    }
  },
  mounted() {
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

.scoreboard .game-clock {
  padding: 0 !important;
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

.scoreboard .audio {
  display: none;
}
</style>
