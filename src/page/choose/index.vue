<template>
  <div>
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-stepper v-model="stepCount" vertical style="width: 100%;">
        <v-stepper-step step="1" v-bind:complete="stepCount > 1">
          選擇組別
          <small>各小隊隊輔也請選擇你的組別</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-row class="stepper-content-row">
            <v-select
              v-bind:items="itemTeam"
              v-model="choosedTeam"
              label="Select"
               class="com"
            >
            </v-select>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 2" :disabled="choosedTeam === ''">下一步</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-step step="2" v-bind:complete="stepCount > 2">
          選擇工作
          <small>請各小隊隊輔協助分配工作</small>
        </v-stepper-step>
        <v-stepper-content step="2" class="stepper-content">
          <v-row class="stepper-content-row">
            <v-select
              v-bind:items="itemJob"
              v-model="choosedJob"
              label="Select"
              single-line
            >
            </v-select>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 3" :disabled="choosedJob === ''">下一步</v-btn>
            <v-btn flat @click.native="stepCount = 1">上一步</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-step step="3" v-bind:complete="stepCount > 3">
          準備進入
        </v-stepper-step>
        <v-stepper-content step="3" class="stepper-content">
          <v-row class="stepper-content-row">
            <p>歡迎來到工工營~</p>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 4">進入</v-btn>
            <v-btn flat @click.native="stepCount = 2">上一步</v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper>
    </main>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        stepCount: 0,
        itemTeam: [
          '第1組',
          '第2組',
          '第3組',
          '第4組',
          '第5組',
          '第6組',
          '第7組',
          '第8組',
          '第9組',
          '第10組',
          '工作人員'
        ],
        choosedTeam: '',
        choosedJob: ''
      }
    },
    computed: {
      itemJob: function () {
        let list = []
        switch (this.choosedTeam) {
        case '工作人員':
          list = ['交換處', '市場']
          break
        default:
          list = ['製造工廠', '零售商', '批發商', '隊輔']
          break
        }
        return list
      }
    }
  }
</script>

<style>
  .com {
    z-index: 1000000000000 !important;
  }
</style>
