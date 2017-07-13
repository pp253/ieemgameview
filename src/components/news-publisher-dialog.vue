<template>
  <v-dialog
    class="dialog"
    v-model="newsPublisherDialog"
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
      <v-icon class="white--text">subject</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>發布新聞</v-card-title>
      <v-card-text>
        <v-text-field
          name="title"
          label="標題"
        ></v-text-field>
        <v-text-field
          name="demanded"
          label="需求量"
          type="number"
          suffix="臺"
        ></v-text-field>
        <v-text-field
          name="content"
          label="內文"
          multi-line
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="newsPublisherDialog = false">取消</v-btn>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="newsPublisherDialog = false">發布</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'

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
  data: function () {
    return {
      teamNumber: 4,
      newsPublisherDialog: false,
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
