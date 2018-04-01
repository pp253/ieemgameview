<template>
  <div class="regist">
    <v-toolbar class="green">
      <v-btn icon v-on:click.native="backToRegistNew">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-card>
        <v-card-text>
          <p>請輸入你的暱稱。</p>
          <p>你的暱稱可以是你的名字、你的綽號，或任何你想的到的字詞。</p>
          <v-text-field
            v-model="nickname"
            label="暱稱"
            style="margin-top: 70px;"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="blue--text darken-1" flat @click.native="intoRegistStaff">我是工作人員</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native.stop="setName">確定</v-btn>
        </v-card-actions>
      </v-card>
    </main>
    <v-dialog v-model="errorDialog">
      <v-card>
        <v-card-title class="headline">你的暱稱不適用</v-card-title>
        <v-card-text>{{ errorDialogMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="errorDialog = false">知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as constant from '@/lib/constant'
import * as readable from '@/lib/readable'
import * as api from '@/lib/api'

export default {
  data () {
    return {
      title: '暱稱',
      code: '1234',
      nickname: '',
      errorDialog: false,
      errorDialogMsg: ''
    }
  },
  methods: {
    backToRegistNew () {
      this.$router.push('/regist/new')
    },
    setName () {
      if (this.nickname.length > 10) {
        this.errorDialogMsg = '暱稱字數不可超過10字。'
        this.errorDialog = true
      } else if (this.nickname.length < 1) {
        this.errorDialogMsg = '你的暱稱太短了。'
        this.errorDialog = true
      } else {
        this.intoChooseGame()
      }
    },
    intoChooseGame () {
      this.$router.push('/choose/game')
    },
    intoRegistStaff () {
      this.$router.push('/regist/staff')
    },
    announce (msg) {
      this.snackbarText = msg
      this.snackbar = true
    }
  }
}
</script>

<style>
</style>
