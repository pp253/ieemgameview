<template>
  <div>
    <v-card
      v-for="news in newsList"
      :key="news.id"
    >
      <v-card-text>
        <div>
          <h5>{{ news.title }}</h5>
          <p>{{ news.content }}</p>
        </div>
      </v-card-text>
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
