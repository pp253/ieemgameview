<template>
  <div class="choose">
    <v-toolbar class="light-blue white--text">
      <v-btn icon v-on:click.native="backToChoose">
        <v-icon class="white--text">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>選擇組別</v-toolbar-title>
    </v-toolbar>
    <main>
      <h5>請選擇你的小隊</h5>
      <v-layout row>
        <v-list class="list">
          <template
            v-for="(item, index) in itemTeam"
          >
            <v-list-tile :key="index" v-on:click.native="intoTeam(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < itemTeam.length"></v-divider>
          </template>
        </v-list>
      </v-layout>
    </main>
    {{ intoBelong }}
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'

export default {
  data() {
    return {
      stepCount: 0,
      teamNumber: api.nowUser.getTeamNumber(),
      state: api.nowUser.getState()
    }
  },
  computed: {
    itemTeam() {
      return readable.toReadableTeamListWithStaff(this.teamNumber)
    },
    intoBelong() {
      switch (this.state.stage) {
        case constant.GAME_STAGE.END:
          this.$router.push('/end')
          break
      }
      return ''
    }
  },
  methods: {
    backToChoose() {
      this.$router.push('/choose')
    },
    intoTeam: function(team) {
      console.log('User Team:', team)
      api.nowUser.setTeam(team)
      this.$router.push('/choose/job')
    }
  }
}
</script>

<style>
</style>
