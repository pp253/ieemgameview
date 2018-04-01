<template>
  <div class="choose">
    <v-toolbar class="light-blue white--text">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="(game, index) in availableList" :key="index" xs12>
            <v-card class="blue darken-2 white--text">
              <v-card-title primary-title>
                <div class="headline">{{ game.text }}</div><br />
                <div>{{ game.describe }}</div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline flat dark @click.native="intoGame(game.index, game.gameConfig)">進入遊戲</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <div v-show="availableList.length === 0" style="text-align: center; width: 100%;">
            <br /><br /><br /><br /><br /><br />
            <p>尚無進行中的遊戲</p>
          </div>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
import * as api from '@/lib/api'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title: '選擇遊戲',
      gameList: []
    }
  },
  computed: {
    ...mapState('game', ['availableList'])
  },
  methods: {
    intoGame(gameId, gameConfig) {
      console.log('User Game:', gameId)
      api.nowUser.setGameId(gameId)
      api.nowUser.setGameConfig(gameConfig)
      this.$router.push('/choose/team')
    }
  },
  created() {
    // load gameList and use promise to change the gameList
    api.nowUser.resetState()

    this.$store.dispatch('game/getAvailableList')
  }
}
</script>

<style>
</style>
