<template>
  <div class="choose">
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>
    <main>
      <h5 class="headline">請選擇你的工作</h5>
      <v-subheader class="subheader" v-show="showSubTitle">隊輔請協助小組分配工作</v-subheader>
      <v-layout row>
        <v-divider></v-divider>
        <v-list class="list">
          <template
            v-for="(item, index) in itemJob"
          >
            <v-list-tile :key="index" v-on:click.native.stop="previewJob(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.text"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < itemJob.length"></v-divider>
          </template>
        </v-list>
      </v-layout>
      <v-dialog class="dialog" v-model="dialog">
        <v-card>
          <v-card-title>工作確認</v-card-title>
          <v-card-text>
            請確定你是{{ readableTeam }}的{{ readableJob }}。
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">重新選擇</v-btn>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="intoJob(job)">確定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  data () {
    return {
      dialog: false,
      job: ''
    }
  },
  computed: {
    showSubTitle () {
      return !api.nowUser.isStaffTeam()
    },
    itemJob () {
      if (api.nowUser.getTeam() === api.Team.staff) {
        return readable.readableStaffJobList()
      } else {
        return readable.readableJobList()
      }
    },
    readableTeam () {
      return readable.toReadableTeam(api.nowUser.getTeam())
    },
    readableJob () {
      return readable.toReadableJob(this.job)
    }
  },
  methods: {
    previewJob (job) {
      this.job = job
      this.dialog = true
    },
    intoJob (job) {
      console.log('User Job:', job, readable.toReadableJob(job))
      api.nowUser.setJob(job)

      router.push('/choose/ready')
    }
  }
}
</script>

<style>
</style>
