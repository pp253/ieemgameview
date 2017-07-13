<template>
  <div>
    <v-card
      v-for="news in newsList"
      :key="news.id"
    >
      <v-card-media
        class="white--text"
        height="200px"
        :src="news.picture"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{ news.title }}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-title>
        <div>
          <span class="grey--text">發布時間：第{{ news.day }}天</span><br>
          <span class="grey--text">需求數量：{{ news.demanded }}臺車</span><br>
          <span>{{ news.content }}</span>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    'list'
  ],
  computed: {
    newsList: function () {
      if (this.list) {
        return this.list
      } else {
        return [{id:0, title:'123', content: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'}]
      }
    }
  }
}
</script>

<style>

</style>
