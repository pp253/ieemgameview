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
          id="whole-charts"
        >
          <v-card>
            <v-card-text>
              <!--
              <v-layout row wrap class="wrap-info">
                <v-flex xs6>
                  <p class="title">總產量</p>
                  <p class="result">{{ dataWhole.totalProductivity }}</p>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              -->
              <div
                v-for="(chart, key) in chartsWhole"
                :key="key"
              >
                <h5 class="chart-title">{{ chart.title }}</h5>
                <div :id="chart.id"></div>
                <v-divider v-if="key + 1 < chartsWhole.length"></v-divider>
              </div>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :key="1"
          id="charts"
        >
          <v-card>
            <v-card-text>
              <v-select
                v-bind:items="itemTeam"
                v-model="selectedTeam"
                label="選擇小隊"
                item-value="index"
                bottom
              ></v-select>

              <v-layout row wrap class="wrap-info">
                <v-flex xs6>
                  <p class="title">淨利</p>
                  <p class="result">{{ dataTeam.netIncome }}</p>
                </v-flex>
                <v-flex xs6>
                  <p class="title">毛利</p>
                  <p class="result">{{ dataTeam.grossProfit }}</p>
                </v-flex>
                <v-flex xs6>
                  <p class="title">運輸次數</p>
                  <p class="result">{{ dataTeam.deliverCount }}</p>
                </v-flex>
                <!--
                <v-flex xs6>
                  <p class="title">總產量</p>
                  <p class="result">{{ dataTeam.totalProductivity }}</p>
                </v-flex>
                <v-flex xs6>
                  <p class="title">總成本</p>
                  <p class="result">{{ dataTeam.totalCost }}</p>
                </v-flex>
                <v-flex xs6>
                  <p class="title">囤貨成本</p>
                  <p class="result">{{ dataTeam.storageCost }}</p>
                </v-flex>
                -->
              </v-layout>
              <v-divider></v-divider>
              <div
                v-for="(chart, key) in chartsTeam"
                :key="key"
              >
                <h5 class="chart-title">{{ chart.title }}</h5>
                <div :id="chart.id"></div>
                <v-divider v-if="key + 1 < chartsTeam.length"></v-divider>
              </div>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :key="2"
          id="news"
        >
          <news-list :list="data.news"></news-list>
        </v-tabs-content>
        <v-tabs-content
          :key="3"
          id="game-info"
        >
          <info-panel :game-config="gameConfig"></info-panel>
        </v-tabs-content>
      </v-tabs>
    </main>
    {{ autoDraw }}
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'
import * as accountApi from '@/lib/api/account'
import * as storageApi from '@/lib/api/storage'
import * as gameApi from '@/lib/api/game'
import * as dataApi from '@/lib/api/data'

export default {
  data () {
    return {
      title: api.nowUser.getGameConfig().title + ' 結果',
      dayTime: api.nowUser.getDayTime(),
      tabs: [
        { index: 0, id: 'whole-charts', title: '全部圖表' },
        { index: 1, id: 'charts', title: '各組圖表' },
        { index: 2, id: 'news', title: '新聞' },
        { index: 3, id: 'game-info', title: '遊戲資訊' }
      ],
      activeTab: null,
      selectedTeam: 1,
      chartsTeam: [
        {
          id: 'chart-profit',
          title: '淨利與毛利'
        },
        {
          id: 'chart-productivity',
          title: '產量'
        }
      ],
      dataTeam: {
        netIncome: 0,
        grossProfit: 0,
        totalProductivity: 0,
        deliverCount: 0,
        totalCost: 0,
        storageCost: 0
      },
      chartsWhole: [
        {
          id: 'chart-whole-profit',
          title: '各組毛利'
        },
        {
          id: 'chart-whole-productivity',
          title: '各組產量'
        }
      ],
      dataWhole: {
        totalProductivity: 0,
      },
      gameConfig: api.nowUser.getGameConfig(),
      data: {},
      stage: constant.GAME_STAGE.UNKNOWN,
      timer: null
    }
  },
  computed: {
    itemTeam () {
      return readable.toReadableTeamList(api.nowUser.getTeamNumber())
    },
    autoDraw () {
      this.draw(this.selectedTeam)
      return ''
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/')
    },
    load () {
      dataApi.getData(api.nowUser.getGameId())
        .then((function (res) {
          Object.assign(this.data, res.data)
          this.stage = res.data.stage
          this.draw(this.selectedTeam)
        }).bind(this))
        .catch((err) => { console.error(err) })
    },
    draw (teamIndex) {
      if (!this.data.gameId) {
        this.load()
        return
      }

      let teamNumber = api.nowUser.getGameConfig().teamNumber
      let days = api.nowUser.getGameConfig().days
      let dayLong = api.nowUser.getGameConfig().dayLong
      let interval = 30

      let calculateAccount = (history, day, time) => {
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

      let calculateProductivity = (history, day) => {
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

      // whole
      this.dataWhole.totalProductivity = 0
      for (let i = 1; i <= teamNumber; i++) {
        this.dataWhole.totalProductivity += calculateProductivity(this.data.teamDataList[i - 1].FACTORY.storage, days + 1)
      }
      this.dataWhole.totalProductivity += '臺'

      {
        let header = ['時間']
        for (let i = 1; i <= teamNumber; i++) {
          header.push(readable.toReadableTeam(i))
        }
        let dataTable = [header]
        for (let d = 1; d <= days; d++) {
          for (let i = 0; i <= parseInt(dayLong / interval); i++) {
            let row = []
            for (let t = 1; t <= teamNumber; t++) {
              let result = calculateAccount(this.data.teamDataList[t - 1].account, d, i * interval)
              row.push(result[0])
            }
            row.unshift(i === 0 ? d + '' : '')
            dataTable.push(row)
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

        let chart = new google.visualization.LineChart(document.getElementById('chart-whole-profit'))
        chart.draw(data, options)
      }

      {
        let header = ['日子']
        for (let i = 1; i <= teamNumber; i++) {
          header.push(readable.toReadableTeam(i))
        }
        let dataTable = [header]
        let k = {}
        for (let d = 1; d <= days; d++) {
          let row = []
          for (let t = 1; t <= teamNumber; t++) {
            let result = calculateProductivity(this.data.teamDataList[t - 1].FACTORY.storage, d)
            row.push(result - (k[t - 1] ? k[t - 1] : 0))
            k[t - 1] = result
          }
          row.unshift(readable.toReadableDay(d))
          dataTable.push(row)
        }
        let data = google.visualization.arrayToDataTable(dataTable)
        let options = {
          chartArea: {left: '15%', width: '85%', height: '70%'},
          legend: { position: 'bottom' },
          height: 300,
          isStacked: true
        }

        let chart = new google.visualization.ColumnChart(document.getElementById('chart-whole-productivity'))
        chart.draw(data, options)
      }

      // single

      let teamData = this.data.teamDataList[teamIndex - 1]

      let netIncome = teamData.account[teamData.account.length - 1].balance
      let grossProfit = calculateAccount(teamData.account, days + 1, dayLong)[1]
      let deliverCount = teamData.FACTORY.deliver.length + teamData.WHOLESALER.deliver.length + teamData.RETAILER.deliver.length

      this.dataTeam.netIncome = readable.toReadableDollar(netIncome)
      this.dataTeam.grossProfit = readable.toReadableDollar(grossProfit)
      this.dataTeam.totalProductivity = calculateProductivity(teamData.FACTORY.storage, days + 1) + '臺'
      this.dataTeam.deliverCount = deliverCount + '次'
      this.dataTeam.totalCost = readable.toReadableDollar(grossProfit - netIncome)
      this.dataTeam.storageCost = readable.toReadableDollar(teamData.cost.storage)

      {
        let dataTable = [['時間', '淨利', '毛利']]
        for (let d = 1; d <= days; d++) {
          for (let i = 0; i <= parseInt(dayLong / interval); i++) {
            let result = calculateAccount(teamData.account, d, i * interval)
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
      }

      {
        let dataTable = [['日子', '累積產量', '單日產量']]
        let last = 0
        for (let d = 1; d <= days; d++) {
          let result = calculateProductivity(teamData.FACTORY.storage, d)
          dataTable.push([readable.toReadableDay(d), result, result - last])
          last = result
        }
        let data = google.visualization.arrayToDataTable(dataTable)

        let options = {
          chartArea: {left: '15%', width: '85%', height: '70%'},
          legend: { position: 'bottom' },
          height: 300
        }

        let chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'))
        chart.draw(data, options)
      }
    },
    toReadableDollar (val) {
      return readable.toReadableDollar(val)
    },
    update () {
      switch (this.stage) {
        case constant.GAME_STAGE.UNKNOWN:
        case constant.GAME_STAGE.PREPARE:
        case constant.GAME_STAGE.READY:
        case constant.GAME_STAGE.START:
        case constant.GAME_STAGE.FINAL:
          this.load()
          break
        case constant.GAME_STAGE.END:
          break
      }
    }
  },
  mounted () {
    // this.loadChart()
    // google.charts.setOnLoadCallback(this.loadChart)
    this.timer = setInterval(this.update.bind(this), 1000)
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
</style>
