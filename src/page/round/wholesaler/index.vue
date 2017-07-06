<template>
  <div class="round">
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <span class="white--text toolbar-right">{{ ToolbarInfo }}</span>
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
          light
        >
          <v-tabs-bar
            class="tabs"
            slot="activators"
          >
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.index"
              :href="'#' + tab.id"
              ripple
            >
              {{ tab.title }}
            </v-tabs-item>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-content
            :key="0"
            :id="'storage'"
          >
            <storage-list></storage-list>
          </v-tabs-content>
          <v-tabs-content
            :key="1"
            :id="'received-order'"
          >
            <order-history></order-history>
          </v-tabs-content>
          <v-tabs-content
            :key="2"
            :id="'order-history'"
          >
            <order-history></order-history>
          </v-tabs-content>
          <v-tabs-content
            :key="3"
            :id="'deliver-history'"
          >
            <deliver-history></deliver-history>
          </v-tabs-content>
        </v-tabs>
      </v-layout>
      
      <v-dialog v-model="orderDialog">
        <v-btn slot="activator" primary fab floating="floating" class="floating-right-bottom">
          <v-icon class="white--text">add</v-icon>
        </v-btn>
          <v-card class="real-bg">
          <v-card-title>你想要訂購多少呢？</v-card-title>
          <v-card-text>
            <v-text-field
              name="order-number"
              label="訂購數量"
              id="order-number"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="orderDialog = false">取消</v-btn>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="orderDialog = false">訂購</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>

    <!-- Order Dialog -->

  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  data () {
    return {
      title: readable.toReadableTeam(api.nowUser.getTeam()) + " " + readable.toReadableJob(api.nowUser.getJob()),
      days: 1,
      times: 22,
      money: 300,
      tabs: [
        { index: 0, id: 'storage', title: '庫存' },
        { index: 1, id: 'received-order', title: '收到的訂單' },
        { index: 2, id: 'order-history', title: '寄出的訂單' },
        { index: 3, id: 'deliver-history', title: '運送紀錄' }
      ],
      active: null,
      text: 'asd',
      activeTab: null,
      orderDialog: false,
      
      orderHistory: [],
      deliverHistory: [],
      receivedOrder: [],
      storage: []
    }
  },
  computed: {
    itemJob: function () {
      if (api.nowUser.getTeam() === api.Team.staff) {
        return readable.readableStaffJobList()
      } else {
        return readable.readableJobList()
      }
    },
    ToolbarInfo: function () {
      return readable.toReadableGameTime(this.days, this.times)
        + ' ' + readable.toReadableDollar(this.money)
    }
  },
  methods: {
    intoJob: function (job) {
      console.log('User Job:', job, readable.toReadableJob(job))
      api.nowUser.setJob(job)
    }
  }
}
</script>

<style>
</style>
