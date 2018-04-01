<template>
  <div class="regist">
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-card>
        <v-card-text>
          <p>這個認證碼代表著你的身分，如果之後想要重新進入遊戲的話，你必須輸入這個認證碼。</p>
          <p><b>請將認證碼記錄下來</b>，以備等一下所需。</p>
          <input :value="code" class="code-text" readonly></input>
        </v-card-text>
        <v-card-actions>
          <v-btn class="blue--text darken-1" flat @click.native="intoRegistOld">我已經有認證碼</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native="intoRegistPlayer">知道了</v-btn>
        </v-card-actions>
      </v-card>
      <v-layout row>
      </v-layout>
    </main>
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'

export default {
  data() {
    return {
      title: '認證碼',
      code: '1234'
    }
  },
  methods: {
    intoRegistOld() {
      this.$router.push('/regist/old')
    },
    intoRegistPlayer() {
      this.$router.push('/regist/player')
    },
    announce(msg) {
      this.snackbarText = msg
      this.snackbar = true
    }
  }
}
</script>

<style>
.regist .code-text {
  width: 100%;
  margin-top: 10px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #ddd;
}
</style>
