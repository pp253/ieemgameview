<template>
  <div>
    <div>
      <div class="dialog">
        <v-btn
          primary
          fab
          :class="btnClass"
          :small="secondary"
          @click.native.stop="deliverDialog = true"
        >
          <v-icon class="white--text">local_shipping</v-icon>
        </v-btn>
      </div>
      <v-dialog
        v-model="deliverDialog"
        persistent
      >
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
              min="0"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native.stop="deliverDialog = false">取消</v-btn>
            <v-btn :disabled="!btnShow" class="blue--text darken-1" flat @click.native.stop="deliver">運貨</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <msg-dialog
      :msg-show="msgDialog"
      :msg-title="msgDialog.title"
      :msg-content="msgDialog.content"
    ></msg-dialog>
  </div>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'
import * as api from '../lib/api'
import * as deliverApi from '../lib/api/deliver'

export default {
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      deliverDialog: false,
      jobList: readable.readableJobList(),
      selectedJob: null,
      selectedTeam: null,
      amount: null,
      state: api.nowUser.getState(),
      msgDialog: {
        show: false,
        title: '',
        content: ''
      }
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(api.nowUser.getTeamNumber())
    },
    productList () {
      return [{
        index: 'CAR',
        text: constant.READABLE_PRODUCTS.CAR
      }]
    },
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    },
    btnShow () {
      return this.selectedTeam && this.selectedJob && this.amount
    }
  },
  methods: {
    deliver () {
      this.deliverDialog = false
      deliverApi.setDeliver(api.nowUser.getGameId(), this.selectedTeam, this.selectedJob, 'CAR', this.amount)
        .then((function (res) {
          let data = res.data
          this.msgBox('運輸成功', `成功運輸第${data.teamIndex}組${data.job}的${data.amount}臺車`)
        }).bind(this))
        .catch((function (err) {
          let data = err.data
          this.msgBox('運輸失敗', data.readableMsg)
        }).bind(this))
    },
    msgBox (title, content) {
      this.msgDialog.show = true
      this.msgDialog.title = title
      this.msgDialog.content = content
    }
  }
}
</script>

<style>
</style>
