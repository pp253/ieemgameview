<template>
  <div class="round">
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <game-clock v-bind:game-time="gameTime"></game-clock>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'
import * as constant from '../../../lib/constant'

export default {
  data () {
    return {
      title: readable.toReadableJob(api.nowUser.getJob()),
      gameTime: api.nowUser.getDayTime()
    }
  }
}
</script>

<style>
</style>
