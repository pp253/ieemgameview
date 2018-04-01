<template>
  <div class="round">
    <v-toolbar :class="color.primary">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-card>
        <v-card-text>
          <game-clock></game-clock>
        </v-card-text>
      </v-card>
      <team-storage-list></team-storage-list>
      <storage-register-dialog :announce="announce"></storage-register-dialog>
    </main>
    <v-snackbar
      :timeout="6000"
      secondary
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn :class="color.accent" dark flat @click.native="snackbar = false">知道了</v-btn>
    </v-snackbar>
    {{ intoBelong }}
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'

export default {
  data () {
    return {
      secondary: true,
      title: readable.toReadableJob(api.nowUser.getJob()),
      state: api.nowUser.getState(),
      snackbar: false,
      snackbarText: '',
      color: api.nowUser.getColor()
    }
  },
  computed: {
    intoBelong () {
      switch (this.state.stage) {
        case constant.GAME_STAGE.END:
          this.$router.push('/end')
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
