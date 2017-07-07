<template>
  <div class="choose">
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>
    <main>
      <h5 class="headline">請選擇你的工作</h5>
      <v-subheader class="subheader" v-show="showSubTitle">隊輔請協助小組分配工作</v-subheader>
      <v-layout row>
        <v-divider></v-divider>
        <v-list class="list">
          <template
            v-for="(item, index) in itemJob"
          >
            <v-list-tile :key="index" v-on:click.native="intoJob(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < itemJob.length"></v-divider>
          </template>
        </v-list>
      </v-layout>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  computed: {
    showSubTitle: function () {
      return !api.nowUser.isStaffTeam()
    },
    itemJob: function () {
      if (api.nowUser.getTeam() === api.Team.staff) {
        return readable.readableStaffJobList()
      } else {
        return readable.readableJobList()
      }
    }
  },
  methods: {
    intoJob: function (job) {
      console.log('User Job:', job, readable.toReadableJob(job))
      api.nowUser.setJob(job)
      
      let JobsPage = {
        [api.Jobs.factory]: '/round/factory',
        [api.Jobs.wholeseller]: '/round/wholeseller',
        [api.Jobs.retailer]: '/round/retailer',
        [api.Jobs.teamleader]: '/round/teamleader',
        [api.StaffJobs.exchange]: '/round/exchange',
        [api.StaffJobs.market]: '/round/market'
      }
      router.push('/round/' + job.toLowerCase())
    }
  }
}
</script>

<style>
</style>
