<template>
  <div class="info-panel">
    <v-card>
      <v-card-title primary-title>市場資訊</v-card-title>
      <v-card-text>
        <v-layout row wrap class="wrap-info">
          <v-flex xs6>
            <p class="title">市場需求量</p>
            <p class="result">{{ market.orderAmount }}臺</p>
          </v-flex>
          <v-flex xs6>
            <p class="title">市場供應量</p>
            <p class="result">{{ market.storageAmount }}臺</p>
          </v-flex>
          <v-flex xs6>
            <p class="title">剩餘需求量</p>
            <p class="result">{{ parseInt(market.orderAmount) - parseInt(market.storageAmount) }}臺</p>
          </v-flex>
          <v-flex xs6>
            <p class="title">市場價格</p>
            <p class="result">{{ readableMarketPrice }}</p>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'

export default {
  props: {
    'market': Object
  },
  computed: {
    readableMarketPrice () {
      return readable.toReadableDollar(this.market.price)
    }
  }
}
</script>

<style>
</style>
