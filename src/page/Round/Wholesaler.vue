<template>
  <div class="round wholesaler">
    <v-toolbar :class="color.primary + ' white--text'">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ toolbarInfo }}</span>
    </v-toolbar>
    <main>
      <v-layout row class="bg-box">

      </v-layout>
      <v-layout row>
        <v-tabs
          id="mobile-tabs-1"
          grow
          scroll-bars
          v-model="activeTab"
        >
          <v-tabs-bar
            :class="color.primary"
            slot="activators"
          >
            <v-tabs-item
              class="white--text"
              v-for="tab in tabs"
              :key="tab.index"
              :href="'#' + tab.id"
              ripple
            >
              {{ tab.title }}
            </v-tabs-item>
            <v-tabs-slider :class="color.accent"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-content
            :key="0"
            :id="'storage'"
          >
            <storage-list :list="state.storage" :announce="announce"></storage-list>
          </v-tabs-content>
          <v-tabs-content
            :key="1"
            :id="'received-order'"
          >
            <order-history :list="state.receivedOrder" type="list" :get-list="state.deliverHistory" :announce="announceReceivedOrder"></order-history>
          </v-tabs-content>
          <v-tabs-content
            :key="2"
            :id="'order-history'"
          >
            <order-history :list="state.orderHistory" type="number" :get-number="state.deliveredNumber"></order-history>
          </v-tabs-content>
          <v-tabs-content
            :key="3"
            :id="'deliver-history'"
          >
            <deliver-history :list="state.deliverHistory" :announce="announce"></deliver-history>
          </v-tabs-content>
        </v-tabs>
      </v-layout>

      <order-dialog :announce="announce" v-show="state.isWorking"></order-dialog>
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
      title: readable.toReadableTeam(api.nowUser.getTeam()) + ' ' + readable.toReadableJob(api.nowUser.getJob()),
      tabs: [
        { index: 0, id: 'storage', title: '庫存' },
        { index: 1, id: 'received-order', title: '收到的訂單' },
        { index: 2, id: 'order-history', title: '寄出的訂單' },
        { index: 3, id: 'deliver-history', title: '物流紀錄' }
      ],
      activeTab: null,
      state: api.nowUser.getState(),
      snackbar: false,
      snackbarText: '',
      color: api.nowUser.getColor()
    }
  },
  computed: {
    toolbarInfo: function () {
      return readable.toReadableGameTime(this.state)
        + ' ' + readable.toReadableDollar(this.state.balance)
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
    },
    announceReceivedOrder () {
      this.announce('收到的訂單更新了！')
    }
  }
}
</script>

<style>
.round.wholesaler .tabs__item {
  color: rgba(255,255,255,0.7) !important;
}

.round.wholesaler .tabs__item--active {
  color: rgba(255,255,255,1) !important;
}
</style>
