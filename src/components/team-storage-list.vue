<template>
  <div class="team-storage-list">
    <v-card class="elevation-0">
      <v-card-text>
          <v-select
            v-bind:items="teamList"
            v-model="selectedTeam"
            item-value="index"
            label="選擇組別"
            single-line
            bottom
          ></v-select>
          <v-select
            v-bind:items="jobList"
            v-model="selectedJob"
            item-value="index"
            label="選擇工作"
            single-line
            bottom
          ></v-select>
          <storage-list list="storageList"></storage-list>
      </v-card-text>
    </v-card>
    {{ getStorageList }}
  </div>
</template>

<script>
import * as constant from '../lib/constant'
import * as readable from '../lib/readable'
import * as api from '../lib/api'
import * as storageApi from '../lib/api/storage'

export default {
  data: function () {
    return {
      selectedTeam: 1,
      selectedJob: constant.JOBS.FACTORY,
      state: api.nowUser.getState(),
      storageList: []
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(api.nowUser.getGameConfig().teamNumber)
    },
    jobList () {
      return readable.readableJobList()
    },
    getStorageList () {
      storageApi.getHistory(api.nowUser.getGameId(), this.selectedTeam, this.selectedJob)
        .then((function (res) {
          console.log(res.data)
          console.log(readable.toReadableStorageList(res.data.list))
          this.storageList = readable.toReadableStorageList(res.data.list)
        }).bind(this))
        .catch((function (err) {
          console.error(err)
        }).bind(this))
      return ''
    }
  }
}
</script>

<style>

</style>
