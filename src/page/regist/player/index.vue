<template>
  <div class="regist">
    <v-toolbar class="green">
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-card>
        <v-card-text>
          <p>請輸入你的暱稱。</p>
          <v-text-field
            v-model="nickname"
            label="暱稱"
            style="margin-top: 70px;"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="blue--text darken-1" flat @click.native="intoRegistStaff">我是工作人員</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native="setName">確定</v-btn>
        </v-card-actions>
      </v-card>
      <v-layout row>
      </v-layout>
    </main>
  </div>
</template>

<script>
import {router} from '../../../router'
import * as constant from '../../../lib/constant'
import * as readable from '../../../lib/readable'
import * as api from '../../../lib/api'

export default {
  data () {
    return {
      title: '暱稱',
      code: '1234',
      nickname: ''
    }
  },
  methods: {
    setName () {
      this.intoChooseGame()
    },
    intoChooseGame () {
      router.push('/choose/game')
    },
    intoRegistStaff () {
      router.push('/regist/staff')
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
