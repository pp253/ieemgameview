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
  props: {
    'list': Array,
    'announce': Function
  },
  computed: {
    newsList: function () {
      if (this.list) {
        this.announce ? this.announce('市場新聞更新了！') : null
        return this.list
      } else {
        return []
      }
    }
  }
}
</script>

<style>

</style>
