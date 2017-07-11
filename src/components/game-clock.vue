<template>
  <div class="game-clock">
    <v-card>
      <v-card-text>
        <span class="more-info">{{ readableDay }}</span><br>
        <span class="time">{{ readableTime }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as api from '../lib/api'
import * as readable from '../lib/readable'

export default {
  data () {
    return {
      dayTime: api.nowUser.getDayTime()
    }
  },
  computed: {
    readableTime: function () {
      return readable.toReadableTime(this.dayTime.time)
    },
    readableDay: function () {
      return readable.toReadableDay(this.dayTime.day)
    }
  }
}
</script>

<style>
.game-clock .more-info {
  font-size: 20px;
}

.game-clock .time {
  font-size: 50px;
  line-height: 50px;
}
</style>
