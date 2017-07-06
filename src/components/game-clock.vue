<template>
  <div class="game-clock">
    <v-card>
      <v-card-text>
        <span class="more-info">{{ readableDay }} {{ readableIsWorking }}</span>
        <span class="time">{{ readableTime }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as readable from '../lib/readable'

export default {
  props: [
    'game-time'
  ],
  computed: {
    readableTime: function () {
      return readable.toReadableTime(this.gameTime.getTime())
    },
    readableDay: function () {
      return readable.toReadableDay(this.gameTime.getDay())
    },
    readableIsWorking: function () {
      return this.gameTime.isWorking() ? '上班' : '下班'
    }
  }
}
</script>

<style>
.game-clock .more-info {
  font-size: 24px;
}

.game-clock .time {
  font-size: 90px;
  font-weight: bold;
  line-height: 85px;
}
</style>
