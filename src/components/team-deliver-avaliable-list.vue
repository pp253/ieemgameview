<template>
  <div class="team-storage-list">
    <v-card>
      <v-card-text>
        <v-select
          v-bind:items="jobList"
          v-model="selectedJob"
          item-value="index"
          label="選擇工作"
          single-line
          bottom
        ></v-select>
      </v-card-text>
      <v-data-table
        :headers="header"
        :items="readableOrderVsStorageList"
        hide-actions
        no-data-text="尚未載入"
      >
        <template slot="items" scope="props">
          <td>{{ props.item.readableTeam }}</td>
          <td class="text-xs-right">{{ props.item.notDeliveredAmount }}</td>
          <td class="text-xs-right">{{ props.item.storageAmount }}</td>
          <td class="text-xs-right">{{ props.item.avaliableForDeliveringAmount }}</td>
        </template>
      </v-data-table>
      <v-card-actions></v-card-actions>
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
  props: {
    'orderVsStorage': Object
  },
  data: function () {
    return {
      header: [
        {text: '組別', align: 'left', value: 'readableTeam'},
        {text: '未運輸', value: 'notDeliveredAmount'},
        {text: '囤貨', value: 'storageAmount'},
        {text: '可運輸', value: 'avaliableForDeliveringAmount'}
      ],
      selectedJob: constant.JOBS.FACTORY,
      state: api.nowUser.getState()
    }
  },
  computed: {
    jobList () {
      return readable.readableJobList()
    },
    readableOrderVsStorageList () {
      let list = []
      let data = this.orderVsStorage[this.selectedJob]

      for (let i of data) {
        let notDeliveredAmount = parseInt(i.orderAmount) - parseInt(i.deliveredAmount)
        let avaliableForDeliveringAmount = i.storageAmount > notDeliveredAmount ?
          notDeliveredAmount : i.storageAmount
        list.push({
          readableTeam: readable.toReadableTeam(i.teamIndex),
          notDeliveredAmount: notDeliveredAmount,
          storageAmount: i.storageAmount,
          avaliableForDeliveringAmount: avaliableForDeliveringAmount
        })
      }
      return list
    }
  }
}
</script>

<style>
</style>
