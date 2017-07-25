<template>
  <div class="end">
    <main>
      <v-tabs
        v-model="activeTab"
        dark fixed centered
      >
        <v-toolbar dark class="light-blue elevation-0">
          <v-btn icon v-on:click.native="backToHome">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs-bar
          slot="activators"
          class="light-blue"
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
          <v-card>
            <v-card-text>
              <v-select
                v-bind:items="itemTeam"
                v-model="selectedTeam"
                label="選擇小隊"
                item-value="index"
                single-line
                bottom
              ></v-select>

              <div v-if="selectedTeam === 0">

              </div>

              <div v-else>
                <v-layout row wrap>
                  <v-flex xs6>
                    <p class="title">毛利</p>
                    <p class="result">$10000</p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="title">淨利</p>
                    <p class="result">$10000</p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="title">總產量</p>
                    <p class="result">$10000</p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="title">總成本</p>
                    <p class="result">$10000</p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="title">運輸次數</p>
                    <p class="result">10次，150臺</p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="title">囤貨成本</p>
                    <p class="result">$10000</p>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <div
                  v-for="(chart, key) in charts"
                  :key="key"
                >
                  <h5 class="chart-title">{{ chart.title }}</h5>
                  <div :id="chart.id"></div>
                  <v-divider v-if="key + 1 < charts.length"></v-divider>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :key="1"
          id="game-info"
        >
          <info-panel :game-config="gameConfig"></info-panel>
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
import * as storageApi from '../../lib/api/storage'
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
          id: 'chart-profit',
          title: '淨利與毛利'
        },
        {
          id: 'chart-productivity',
          title: '產量'
        }
      ],
      gameConfig: api.nowUser.getGameConfig(),
      data: null
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
      if (this.selectedTeam === 0) {
        return
      }

      let days = api.nowUser.getGameConfig().days
      let dayLong = api.nowUser.getGameConfig().dayLong
      let interval = 10

      accountApi.getHistory(api.nowUser.getGameId(), this.selectedTeam)
        .then((function (res) {
          let history = res.data.list

          let calculate = (day, time) => {
            let n = 0
            let g = 0
            for (let key in history) {
              let item = history[key]
              if (item.day < day || (item.day === day && item.time <= time * 1000)) {
                if (item.balance > g) {
                  n += item.balance - g
                }
                g = item.balance
              } else {
                break
              }
            }
            return [g, n]
          }

          let dataTable = [['時間', '毛利', '淨利']]
          for (let d = 1; d <= days; d++) {
            for (let i = 0; i <= parseInt(dayLong / interval); i++) {
              let result = calculate(d, i * interval)
              dataTable.push([i === 0 ? d + '' : '', result[0], result[1]])
            }
          }
          let data = google.visualization.arrayToDataTable(dataTable)

          let options = {
            chartArea: {left: '15%', width: '85%', height: '70%'},
            legend: { position: 'bottom' },
            height: 300
          }

          // material design charts
          // remember to add 'line' package to 'google.charts.load' before using this
          // let chart = new google.charts.Line(document.getElementById('chart-profit'))
          // chart.draw(data, google.charts.Line.convertOptions(options))

          let chart = new google.visualization.LineChart(document.getElementById('chart-profit'))
          chart.draw(data, options)
        }).bind(this))
        .catch((function (err) {
          console.error(err)
        }).bind(this))
      
      storageApi.getHistory(api.nowUser.getGameId(), this.selectedTeam, constant.JOBS.FACTORY)
        .then((function (res) {
          let history = res.data.list

          // chart-productivity
          let calculate = (day) => {
            let n = 0 // accumulate
            let g = 0
            for (let key in history) {
              let item = history[key]
              if (item.day <= day) {
                if (item.product === constant.PRODUCTS.CAR && item.amount > g) {
                  n += item.amount - g
                }
                g = item.amount
              } else {
                break
              }
            }
            return n
          }

          let dataTable = [['日子', '累積產量', '單日產量']]
          let k = 0
          for (let d = 1; d <= days; d++) {
            let result = calculate(d)
            k = result - k
            dataTable.push([readable.toReadableDay(d), result, k])
          }
          let data = google.visualization.arrayToDataTable(dataTable)

          let options = {
            chartArea: {left: '15%', width: '85%', height: '70%'},
            legend: { position: 'bottom' },
            height: 300
          }

          let chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'))
          chart.draw(data, options)
        }).bind(this))
        .catch((function (err) {
          console.error(err)
        }).bind(this))

      return ''
    }
  },
  methods: {
    backToHome () {
      router.push('/')
    },
    load () {
      dataApi.getData(api.nowUser.getGameId())
        .then((function (res) {
          Object.assign(this.data, res.data)
          this.draw()
        }).bind(this))
        .catch((err) => { console.error(err) })
    },
    draw () {
      if (!this.data) {
        this.load()
        return
      }


    },
    toReadableDollar (val) {
      return readable.toReadableDollar(val)
    }
  },
  mounted () {
    // this.loadChart()
    // google.charts.setOnLoadCallback(this.loadChart)
    this.load()
  }
}
</script>

<style>
.end .chart-title {
  margin-bottom: 0;
  margin-top: 20px;
}

.end .divider {
  margin-top: 20px;
}

.end .title {
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px !important;
  margin-bottom: 0;
}

.end .result {
  font-size: 20px;
}
</style>
