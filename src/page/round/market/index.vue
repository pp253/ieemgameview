<template>
  <div class="round">
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ toolbarInfo }}</span>
    </v-toolbar>
    <main>
      <news-publisher-dialog :secondary="secondary"></news-publisher-dialog>
      <deliver-dialog :announce="announce"></deliver-dialog>
    </main>
    <v-snackbar
      :timeout="6000"
      secondary
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">知道了</v-btn>
    </v-snackbar>
    {{ intoBelong }}
  </div>
</template>

<script>
import {router} from '../../../router'
import * as constant from '../../../lib/constant'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  data () {
    return {
      secondary: true,
      title: readable.toReadableJob(api.nowUser.getJob()),
      state: api.nowUser.getState(),
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    toolbarInfo () {
      return readable.toReadableGameTime(this.state)
    },
    intoBelong () {
      switch (this.state.stage) {
        case constant.GAME_STAGE.END:
          router.push('/end')
          break
      }
      return ''
    }
  },
  methods: {
    announce (msg) {
      this.snackbarText = msg
      this.snackbar = true
    }
  }
}
</script>

<style>
</style>
