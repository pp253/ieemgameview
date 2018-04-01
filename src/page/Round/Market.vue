<template>
  <div class="round">
    <v-toolbar :class="color.primary">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="white--text">{{ toolbarInfo }}</span>
    </v-toolbar>
    <main>
      <market-info :market="state.market"></market-info>
      <team-deliver-avaliable-list :order-vs-storage="state.orderVsStorage"></team-deliver-avaliable-list>
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
    toolbarInfo () {
      return readable.toReadableGameTime(this.state)
    },
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
