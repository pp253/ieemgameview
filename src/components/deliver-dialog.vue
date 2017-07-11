<template>
  <v-dialog
    class="dialog"
    v-model="deliverDialog"
    persistent
  >
    <v-btn
      slot="activator"
      primary
      fab
      :class="btnClass"
      :small="secondary"
    >
      <v-icon class="white--text">local_shipping</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>運輸貨物</v-card-title>
      <v-card-text>
        <v-select
          v-bind:items="teamList"
          v-model="selectedTeam"
          label="選擇組別"
          single-line
          item-value="index"
          bottom
        ></v-select>
        <v-select
          v-bind:items="jobList"
          v-model="selectedJob"
          label="從什麼工作"
          single-line
          item-value="index"
          bottom
        ></v-select>
        <v-text-field
          v-model="amount"
          key="car"
          name="car"
          label="車子"
          type="number"
          suffix="臺"
          item-value="index"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="deliverDialog = false">取消</v-btn>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="deliver">運貨</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'
import * as api from '../lib/api'
import * as deliverApi from '../lib/api/deliver'

export default {
  props: [
    'position',
    'secondary'
  ],
  data: function () {
    return {
      teamNumber: 4,
      deliverDialog: false,
      jobList: readable.readableJobList(),
      selectedJob: null,
      selectedTeam: null,
      amount: null
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(this.teamNumber)
    },
    productList () {
      return [{
        index: 'CAR',
        text: constant.READABLE_PRODUCTS.CAR
      }]
    },
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    }
  },
  methods: {
    deliver: function () {
      this.deliverDialog = false
      deliverApi.setDeliver(api.nowUser.getGameId(), this.selectedTeam, this.selectedJob, 'CAR', this.amount)
        .then((res) => console.log(res)).catch((err) => console.error(err))
    }
  }
}
</script>

<style>
</style>
