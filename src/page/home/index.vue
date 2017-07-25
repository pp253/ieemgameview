<template>
  <div id="home" class="home">
    <v-card>
      <v-card-text class="text-xs-center head">
        <div class="logo"></div>
        <!--<h3>REDRO產銷遊戲</h3>-->
        <h5>2017 工工營 BETA</h5>
        <v-btn primary v-on:click.native="intoRegist">進入遊戲</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as api from '../../lib/api'
import * as enterApi from '../../lib/api/enter'
import {router} from '../../router'

export default {
  methods: {
    intoRegist () {
      router.push('/regist')
      // router.push('/choose')
    }
  }
}
</script>

<style>

.home .head {
  padding-top: 60px;
  padding-bottom: 60px;
}

.home .layout {
  padding-left: 14px;
  padding-right: 14px;
}

.home .card {
  height: 100vh !important;
}

.home .card__text {
  padding-right: 0;
  padding-left: 0;
}
</style>
