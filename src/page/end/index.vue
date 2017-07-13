<template>
  <div>
    <main>
      <v-tabs
        v-model="activeTab"
        dark fixed centered
      >
        <v-toolbar dark class="cyan elevation-0">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar
          slot="activators"
          class="cyan"
        >
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.index"
            :href="'#' + tab.id"
          >
            {{ tab.title }}
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content
          :key="0"
          id="charts"
        >
          <v-select
            v-bind:items="itemTeam"
            v-model="selectedTeam"
            label="選擇小隊"
            single-line
            item-value="index"
            bottom
          ></v-select>
          
          <div
            v-for="(key, chart) in charts"
            :key="key"
          >
            <h5>{{ chart.title }}</h5>
            <line-chart
              v-if="chart.type == 'line'"
              :chart-data="chart.data"
              :option="chart.option"></line-chart>
            <bar-chart
              v-else-if="chart.type == 'bar'"
              :chart-data="chart.data"
              :option="chart.option"></bar-chart>
          </div>

          <h5>每日產量</h5>

          <h5>累積產量</h5>

        </v-tabs-content>
        <v-tabs-content
          :key="1"
          id="game-info"
        >
          <v-card>
            <v-card-title>資訊</v-card-title>
            <v-card-text>
              <ul>
                <li>天數</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs>
    </main>
    {{ loadChart }}
  </div>
</template>

<script>
import {router} from '../../router'
import * as constant from '../../lib/constant'
import * as readable from '../../lib/readable'
import * as api from '../../lib/api'
import * as accountApi from '../../lib/api/account'
import * as gameApi from '../../lib/api/game'

export default {
  data () {
    return {
      teamNumber: 4,
      title: api.nowUser.getGameConfig().title + ' 結果',
      dayTime: api.nowUser.getDayTime(),
      tabs: [
        { index: 0, id: 'charts', title: '圖表' },
        { index: 1, id: 'game-info', title: '遊戲資訊' }
      ],
      activeTab: null,
      selectedTeam: 1,
      charts: [
        {
          title: '淨利',
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              label: '毛利',
              backgroundColor: '#F44336',
              data: []
            }, {
              label: '淨利',
              backgroundColor: '#2196F3',
              data: []
            }]
          },
          option: { responsive: true, maintainAspectRatio: false }
        }
      ]
    }
  },
  computed: {
    itemTeam () {
      let list = [{
        index: 0,
        text: '全部'
      }]
      return list.concat(readable.toReadableTeamList(api.nowUser.getTeamNumber()))
    },
    loadChart () {
      accountApi.getHistory(api.nowUser.getGameId(), this.selectedTeam)
        .then((function (res) {
          let list = res.data.list
          let days = api.nowUser.getGameConfig().days
          let dayLong = api.nowUser.getGameConfig().dayLong
          let interval = 10
          let history = res.data.list

          let labels = []
          let netIncomeList = []
          let grossProfitList = []

          let calculate = (day, time) => {
            let n = 0
            let g = 0
            for (let key in history) {
              let item = history[key]
              if (item.day < day || (item.day === day && item.time <= time * 1000)) {
                if (item.balance > n) {
                  n += item.balance - n
                }
                g = item.balance
              } else {
                break
              }
            }
            return [g, n]
          }

          if (this.charts[0].data.labels.length === 0) {
            for (let d = 1; d <= days; d++) {
              for (let i = 0; i <= parseInt(dayLong / interval); i++) {
                this.charts[0].data.labels.push(i === 0 ? readable.toReadableDay(d) : '')
                this.charts[0].data.datasets[0].data.push(0)
                this.charts[0].data.datasets[1].data.push(0)
              }
            }
          } else {
            for (let d = 1; d <= days; d++) {
              for (let i = 0; i <= parseInt(dayLong / interval); i++) {
                this.charts[0].data.datasets[0].data.pop()
                this.charts[0].data.datasets[1].data.pop()
              }
            }
          }

          let k = 0
          for (let d = 1; d <= days; d++) {
            for (let i = 0; i <= parseInt(dayLong / interval); i++) {
              let result = calculate(d, i * interval)
              netIncomeList.push(result[0])
              netIncomeList.push(result[1])
              k++
            }
          }
          console.log(this.charts[0].data)
        }).bind(this))
        .catch((function (err) {
          console.error(err)
        }).bind(this))
      return ''
    }
  },
  mounted () {
    // this.loadChart()
  }
}
</script>

<style>
</style>
