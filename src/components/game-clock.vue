<template>
  <div class="game-clock">
    <h5 class="more-info">{{ readableDay }}</h5>
    <v-progress-circular
      :size="200"
      :width="15"
      :rotate="-90"
      :value="timeValue"
      class="primary--text"
    >
      {{ readableTime }}
    </v-progress-circular>
  </div>
</template>

<script>
import * as api from '../lib/api'
import * as constant from '../lib/constant'
import * as readable from '../lib/readable'

export default {
  data () {
    return {
      state: api.nowUser.getDayTime()
    }
  },
  computed: {
    timeValue () {
      // full round is 100
      if (this.state.isWorking) {
        return 100 - (this.state.time / api.nowUser.getGameConfig().dayLong) / 10
      } else {
        return 0
      }
    },
    readableTime () {
      return readable.toReadableTime(this.state.time, this.state.isWorking, true)
    },
    readableDay () {
      return readable.toReadableDay(this.state.day)
    }
  }
}
</script>

<style>
.game-clock {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
}

.game-clock .time {
  font-size: 50px;
  line-height: 50px;
}

.game-clock .progress-circular__info {
  font-size: 30px;
}
</style>
