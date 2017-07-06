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
          bottom
        ></v-select>
        <v-select
          v-bind:items="jobList"
          v-model="selectedJob"
          label="選擇工作"
          single-line
          bottom
        ></v-select>
        <v-text-field
          v-for="product in productList"
          :id="product.index"
          :key="product.index"
          :name="product.index.toLowerCase()"
          :label="product.text"
          type="number"
          suffix="個"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="storageRegisterDialog = false">取消</v-btn>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="storageRegisterDialog = false">登記</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'

export default {
  props: {
    'position': Object,
    'secondary': {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data: function () {
    return {
      teamNumber: 4,
      storageRegisterDialog: false,
      jobList: readable.readableJobList(),
      selectedJob: null,
      selectedTeam: null
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
      if (this.selectedJob.index === 'FACTORY') {
        return readable.readableProductList()
      } else {
        return [{
          index: 'CAR',
          text: constant.READABLE_PRODUCTS.CAR
        }]
      }
    },
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    }
  },
  methods: {
    order: function (amount) {

    }
  }
}
</script>

<style>
</style>
