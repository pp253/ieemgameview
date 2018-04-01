<template>
  <div>
    <v-toolbar dark class="cyan">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-card>
        <v-card-title primary-title>Create a Game</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="configText"
            label="Config"
            multi-line
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="orange--text" @click.native="newGame">CREATE</v-btn>
        </v-card-actions>
      </v-card>
    </main>
    <v-snackbar
      :timeout="6000"
      secondary
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">知道了</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'
import * as enterApi from '@/lib/api/enter'

export default {
  data() {
    return {
      title: 'ADMIN',
      snackbar: false,
      snackbarText: '',
      configText: ''
    }
  },
  methods: {
    newGame() {
      this.$store.dispatch('game/newGame', {
        gameConfig: JSON.parse(this.configText)
      })
      /*
      enterApi
        .newGame(JSON.parse(this.configText))
        .then(
          function(res) {
            let data = res.data
            api.nowUser.setGameId(data.gameId)
            api.nowUser.setGameConfig(data.gameConfig)
            api.nowUser.setTeam(constant.TEAMS.STAFF)
            api.nowUser.setJob(constant.STAFF_JOBS.CONSOLER)
            this.$router.push('/round/consoler')
          }.bind(this)
        )
        .catch(function(err) {
          console.error(err)
        })
        */
    },
    announce(msg) {
      this.snackbarText = msg
      this.snackbar = true
    }
  },
  mounted() {
    this.configText = JSON.stringify(
      {
        title: '試玩場 REDRO',
        describe: '2017 工工營 產銷遊戲',
        teamNumber: 4,
        teammembers: [12, 12, 13, 14],
        days: 3,
        dayLong: 300,
        defaultBalance: 19400,
        cost: {
          storage: {
            [constant.JOBS.FACTORY]: {
              [constant.PRODUCTS.CAR]: 3000,
              [constant.PRODUCTS.WHEEL]: 200,
              [constant.PRODUCTS.BODY]: 200,
              [constant.PRODUCTS.ENGINE]: 200
            },
            [constant.JOBS.WHOLESALER]: {
              [constant.PRODUCTS.CAR]: 6000
            },
            [constant.JOBS.RETAILER]: {
              [constant.PRODUCTS.CAR]: 9000
            },
            patchSize: 10,
            permanent: true
          },
          transport: {
            cost: 200,
            patchSize: 4
          },
          wage: 100
        },
        updateInterval: 1000,
        news: [
          {
            day: 1,
            time: 0,
            title: '高田廠牌所製造的安全氣囊有瑕疵',
            content:
              '近幾個月各大車廠紛紛主動召回部分型號的車輛，主因是高田廠牌所製造的安全氣囊有瑕疵，當氣囊爆開，可能造成碎片、零件噴出，導致車內人員傷害。此一負面新聞發布後，使部分消費者打消買車的念頭，車市狀況慘淡。',
            picture: 'image/news/day1_rehearsal.jpg',
            demanded: 20,
            price: 3500
          },
          {
            day: 2,
            time: 0,
            title: '高田廠牌所製造的安全氣囊有瑕疵',
            content:
              '豐田汽車進一步表示，新的電池技術很有可能會讓旗下所有電動汽車性能都得到改進。電池技術研究人員指出，對於電動汽車來說，鋰離子電池是一項關鍵技術， 預估能讓每次充電行駛里程提高 10% 到 15% 的效能。全球汽車產業分析師評估這次的車用電池再進化會帶來50%的需求成長。',
            picture: 'image/news/day2_rehearsal.jpg',
            demanded: 30,
            price: 3500
          },
          {
            day: 3,
            time: 0,
            title: '高田廠牌所製造的安全氣囊有瑕疵',
            content:
              '3月11日發生在日本東北部的強烈地震及隨之引起的海嘯，重創日本各地並造成嚴重的人員傷亡和財物損失。而日本多家車廠亦在此次天災中受到影響。包含Toyota、Mitsubishi、Nissan等多家日本車廠皆已宣佈暫時停止生產，導致自用小客車的價格提高，民眾降低購買意願。',
            picture: 'image/news/day3_rehearsal.jpg',
            demanded: 20,
            price: 3500
          }
        ]
      },
      null,
      '  '
    )
  }
}
</script>

<style>
</style>
