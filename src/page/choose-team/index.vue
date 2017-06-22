<template>
  <div>
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>
    <main>
      <h5 class="headline">請選擇你的小隊</h5>
      <v-subheader class="subheader">隊輔請選擇你所屬的小隊</v-subheader>
      <v-layout row>
        <v-list class="list">
          <v-list-item v-for="item in itemTeam" v-bind:key="item">
            <v-list-tile v-on:click.native="intoTeam(item.index)">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-layout>
    </main>
  </div>
</template>

<script>
import {router} from '../../router'
import * as readable from '../../lib/readable'
import * as api from '../../lib/api'

export default {
  data () {
    return {
      stepCount: 0,
      teamNumber: 10
    }
  },
  computed: {
    itemTeam: function () {
      let list = []
      for (let i = 1; i <= this.teamNumber; i++) {
        list.push({
          index: i,
          title: readable.toReadableTeam(i)
        })
      }
      list.push({
        index: 0,
        title: readable.toReadableJob(api.Jobs.teamleader)
      })
      return list
    }
  },
  methods: {
    intoTeam: function (team) {
      console.log('User Team:', team)
      api.nowUser.setTeam(team)
      router.push('/choose/job')
    }
  }
}
</script>

<style>
.layout {
  margin-left: 0;
  margin-right: 0;
}

.list {
  width: 100%;
}

.headline {
  padding: 14px;
  padding-bottom: 2px;
  margin-bottom: 5px;
}

.subheader {
  padding: 14px;
  padding-top: 2px;
}
</style>
