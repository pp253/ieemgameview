<template>
  <div class="online-status">
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">小隊員</div>
        <v-card class="status-card">
          <v-layout row wrap v-for="team in teamList" :key="team.index">
            <v-flex xs3>
              <v-card dark class="secondary">
                <v-card-text>{{ team.text }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs3 v-for="job in jobList" :key="job.index">
              <v-card dark class="secondary">
                <v-card-text>{{ job.text }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">工作人員</div>
        <v-card class="status-card">
          <v-layout row wrap>
            <v-flex xs3 v-for="job in staffJobList" :key="job.index">
              <v-card dark class="secondary">
                <v-card-text>{{ job.text }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import * as api from '../lib/api'
import * as readable from '../lib/readable'

export default {
  props: [
    'list'
  ],
  data () {
    return {
      teamNumber: 4
    }
  },
  computed: {
    jobList () {
      return readable.readableJobList()
    },
    staffJobList () {
      return readable.readableStaffJobList()
    },
    teamList () {
      return readable.toReadableTeamList(this.teamNumber)
    }
  }
}
</script>

<style>
.online-status .status-card {
  color: #fff;
  text-align: center;
  font-size: 24px;
  padding: 0 14px;
}

.online-status .status-card .flex {
  padding-bottom: 16px;
}
</style>
