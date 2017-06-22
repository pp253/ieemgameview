<template>
  <div>
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>
    <main>
      <h5 class="headline">請選擇你的工作</h5>
      <v-subheader class="subheader">隊輔請協助小組分配工作</v-subheader>
      <v-layout row>
        <v-list class="list">
          <v-list-item v-for="item in itemJob" v-bind:key="item">
            <v-list-tile v-on:click.native="intoJob(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-layout>
    </main>
  </div>
</template>

<script>
import {router} from '../../router'
import * as readable from '../../lib/readable'
import * as api from '../../lib/api'

export default {
  computed: {
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
      router.push(JobsPage[job])
    }
  }
}
</script>

<style>
.layout {
  margin-left: 0;
  margin-right: 0;
}

.list {
  width: 100%;
}

.headline {
  padding: 14px;
  padding-bottom: 2px;
  margin-bottom: 5px;
}

.subheading {
  padding: 14px;
  padding-top: 2px;
}
</style>
