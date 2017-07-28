<template>
  <div class="team-storage-list">
    <v-card>
      <v-card-title>各組囤貨</v-card-title>
      <v-card-text>
          <v-select
            v-bind:items="jobList"
            v-model="selectedJob"
            item-value="index"
            label="選擇工作"
            single-line
            bottom
          ></v-select>
          <v-select
            v-bind:items="teamList"
            v-model="selectedTeam"
            item-value="index"
            label="選擇組別"
            single-line
            bottom
          ></v-select>
      </v-card-text>
      <storage-list :list="teamStorageList"></storage-list>
      <v-card-actions></v-card-actions>
    </v-card>
  </div>
</template>

<script>
import * as constant from '../lib/constant'
import * as readable from '../lib/readable'
import * as api from '../lib/api'
import * as storageApi from '../lib/api/storage'

export default {
  data () {
    return {
      selectedTeam: 1,
      selectedJob: constant.JOBS.FACTORY,
      state: api.nowUser.getState()
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(api.nowUser.getGameConfig().teamNumber)
    },
    jobList () {
      return readable.readableJobList()
    },
    teamStorageList () {
      return this.state.teamStorageList[this.selectedJob][this.selectedTeam - 1]
    }
  }
}
</script>

<style>

</style>
