<template>
  <div id="home" class="home" style="height: 100%;">
    <v-card class="card">
      <v-card-text class="text-xs-center">
        <h3>2017工工營</h3>
        <h5>PRE-ALPHA</h5>
      </v-card-text>
      <v-layout row>
        <v-list class="list">
          <template
            v-for="(item, index) in gameList"
          >
            <v-list-tile :key="index" v-on:click.native="intoGame(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < gameList.length"></v-divider>
          </template>
        </v-list>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import * as api from '../../lib/api'
import {router} from '../../router'

export default {
  data () {
    return {
      gameList: [
        {
          text: '試玩場',
          index: 123
        }
      ]
    }
  },
  methods: {
    intoGame (gameId) {
      console.log('User Game:', gameId)
      api.nowUser.setGame(gameId)
      router.push('/choose')
    }
  },
  created: function () {
    // load gameList and use promise to change the gameList
    
  }
}
</script>

<style>
.home .layout {
  margin-left: 0;
  margin-right: 0;
}

.home .card {
  height: 100% !important;
}

.home .list {
  width: 100%;
}

.home .card__text {
  padding-right: 0;
  padding-left: 0;
}

.home .list__tile__title {
  color: rgba(0, 0, 0, 0.87);
}
</style>
