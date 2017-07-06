<template>
  <div class="team-storage-list">
    <v-card class="elevation-0">
      <v-card-text>
          <v-select
            v-bind:items="teamList"
            v-model="selectedTeam"
            label="選擇組別"
            single-line
            bottom
          ></v-select>
          <storage-list list=""></storage-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as readable from '../lib/readable'

export default {
  props: [
    'position'
  ],
  data: function () {
    return {
      selectedTeam: -1,
      teamNumber: 4
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(this.teamNumber)
    }
  }
}
</script>

<style>

</style>
