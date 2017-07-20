<template>
  <div class="info-panel">
    <v-card>
      <v-card-title primary-title>{{ gameConfig.title }} 資訊</v-card-title>
      <v-card-text>
        <ul>
          <li>組別數：{{ gameConfig.teamNumber }}組</li>
          <li>各組人數：{{ JSON.stringify(gameConfig.teammembers) }}人</li>
          <li>天數：{{ gameConfig.days }}天</li>
          <li>每天長度：{{ gameConfig.dayLong }}秒</li>
          <li>預設帳戶餘額：{{ gameConfig.defaultBalance }}元</li>
          <li>工人薪資：{{ gameConfig.cost.wage }}元／日</li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'

export default {
  props: {
    'game-config': Object
  }
}
</script>

<style>
</style>
