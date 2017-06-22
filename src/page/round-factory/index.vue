<template>
  <div>
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">工廠</v-toolbar-title>
      <span class="white--text">{{ ToolbarInfo }}</span>
    </v-toolbar>
    <main>
      <v-layout row class="bg-box">

      </v-layout>
      <v-layout row>
        <v-tabs
          id="mobile-tabs-1"
          grow
          scroll-bars
          v-model="active"
          light
          class="tabs"
        >
          <v-tabs-bar
              class="tabs" slot="activators">
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.index"
              :href="'#' + tab.id"
              ripple
              class="tabs"
            >
              {{ tab.title }}
            </v-tabs-item>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-content
            v-for="tab in tabs"
            :key="tab.index"
            :id="tab.id"
            ripple
          >
            <v-card flat>
              {{ tab.content }}
            </v-card>
          </v-tabs-content>
        </v-tabs>
        <v-dialog v-model="orderDialog">
          <v-btn slot="activator" primary floating="floating" class="floating-right-bottom">
            <v-icon class="white--text">add</v-icon>
          </v-btn>
          <v-card class="real-bg">
            <v-card-row>
              <v-card-title>你想要訂購多少呢？</v-card-title>
            </v-card-row>
            <v-card-row>
              <v-card-text>
                <v-text-field
                  name="order-number"
                  label="訂購數量"
                  id="order-number"
                  type="number"
                ></v-text-field>
              </v-card-text>
            </v-card-row>
            <v-card-row actions>
              <v-btn class="green--text darken-1" flat="flat" @click.native="orderDialog = false">取消</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click.native="orderDialog = false">訂購</v-btn>
            </v-card-row>
          </v-card>
        </v-dialog>
      </v-layout>
    </main>

    <!-- Order Dialog -->

  </div>
</template>

<script>
import {router} from '../../router'
import * as readable from '../../lib/readable'
import * as api from '../../lib/api'

export default {
  data () {
    return {
      days: 1,
      times: 22,
      money: 300,
      tabs: [
        { index: 0, id: 'storage', title: '庫存', content: 'something1...' },
        { index: 1, id: 'received-order', title: '收到的訂單', content: 'something2...' },
        { index: 2, id: 'deliver-history', title: '運送紀錄', content: 'something3...' }
      ],
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
        + '，' + readable.toReadableDollar(this.money)
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

.bg-box {
  height: 140px;
}

.tabs {
  height: 45px;
}

.layout {
  margin-left: 0;
  margin-right: 0;
}

.floating-right-bottom {
  position: fixed;
  right: 16px;
  bottom: 16px;
}

.real-bg {
  background-color: #fff;
}
</style>
