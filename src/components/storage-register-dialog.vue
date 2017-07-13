<template>
  <v-dialog
    class="dialog"
    v-model="storageRegisterDialog"
    persistent
    fullscreen
  >
    <v-btn
      slot="activator"
      primary
      fab
      :class="btnClass"
      :small="secondary === true"
    >
      <v-icon class="white--text">widgets</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>登記囤貨</v-card-title>
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
          label="選擇工作"
          single-line
          item-value="index"
          bottom
        ></v-select>
        <div
          v-for="product in productList"
        >
          <v-text-field
            :key="product.index"
            v-model.number="amount[product.index]"
            :label="product.text"
            type="number"
            suffix="個"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="storageRegisterDialog = false">取消</v-btn>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="register">登記</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'
import * as api from '../lib/api'
import * as storageApi from '../lib/api/storage'

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
      teamNumber: 4,
      storageRegisterDialog: false,
      jobList: readable.readableJobList(),
      selectedJob: null,
      selectedTeam: null,
      amount: {
        'CAR': 0,
        'WHEEL': 0,
        'BODY': 0,
        'ENGINE': 0
      }
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(this.teamNumber)
    },
    productList () {
      if (!this.selectedJob) {
        return []
      }

      let list = []
      if (this.selectedJob === 'FACTORY') {
        list = readable.readableProductList()
      } else {
        list = [{
          index: 'CAR',
          text: constant.READABLE_PRODUCTS.CAR
        }]
      }
      return list
    },
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    }
  },
  methods: {
    register () {
      this.storageRegisterDialog = false
      let user = api.nowUser

      console.log(this.amountCar)
      console.log(this.amount)
      for (let key in this.amount) {
      console.log(this.amount[key])
        if (!this.amount[key]) {
          continue
        }
        storageApi.setStorage(user.getGameId(), this.selectedTeam, this.selectedJob, key, this.amount[key])
          .then((function (res) {
            let data = res.data
            this.announce(`成功登記第${data.teamIndex}組${data.job}的${data.product}庫存`)
          }).bind(this))
          .catch((function (err) {
            let data = err.data
            this.announce(data.readableMsg || data.msg)
          }).bind(this))
        this.amount[key] = 0
      }
    }
  }
}
</script>

<style>
</style>
