<template>
  <div>
    <main>
      <v-tabs
        v-model="activeTab"
        dark fixed centered
      >
        <v-toolbar dark class="cyan elevation-0">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <span>{{ ToolbarInfo }}</span>
        </v-toolbar>
        <v-tabs-bar
          slot="activators"
          class="cyan"
        >
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.index"
            :href="'#' + tab.id"
          >
            {{ tab.title }}
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content
          :key="0"
          id="online-status"
        >
          <online-status></online-status>
        </v-tabs-content>
        <v-tabs-content
          :key="1"
          id="dynamic-log"
        >
          <v-card>
            <v-card-title>階段管理</v-card-title>
            <v-card-text>
              <ul>
                <li>確定list</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary>下一階段</v-btn>
            </v-card-actions>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :key="2"
          id="game-info"
        >
          <v-card>
            <v-card-title>資訊</v-card-title>
            <v-card-text>
              <ul>
                <li>天數</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary>變更</v-btn>
            </v-card-actions>
          </v-card>
        </v-tabs-content>
      </v-tabs>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  data () {
    return {
      teamNumber: 4,
      title: readable.toReadableJob(api.nowUser.getJob()),
      days: 1,
      times: 22,
      money: 300,
      tabs: [
        { index: 0, id: 'online-status', title: '連線狀況' },
        { index: 1, id: 'dynamic-log', title: '即時動態' },
        { index: 2, id: 'game-info', title: '遊戲資訊' }
      ],
      activeTab: null,
      
      orderHistory: [],
      deliverHistory: [],
      receivedOrder: [],
      storage: []
    }
  },
  computed: {
    jobList () {
      if (api.nowUser.getTeam() === api.Team.staff) {
        return readable.readableStaffJobList()
      } else {
        return readable.readableJobList()
      }
    },
    teamList () {
      return readable.toReadableTeamList(this.teamNumber)
    },
    ToolbarInfo () {
      return readable.toReadableGameTime(this.days, this.times)
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
