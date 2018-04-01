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
          <p>請輸入你的認證碼。</p>
          <input class="code-text" v-model="code"></input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary @click.native.stop="setCode" :disabled="btnDisabled">確定</v-btn>
        </v-card-actions>
      </v-card>
      <v-layout row>
      </v-layout>
    </main>
    <v-dialog v-model="errorDialog">
      <v-card>
        <v-card-title class="headline">錯誤</v-card-title>
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
  data() {
    return {
      title: '輸入認證碼',
      code: null,
      btnDisabled: true,
      errorDialog: false,
      errorDialogMsg: ''
    }
  },
  watch: {
    code() {
      this.btnDisabled = !this.code
    }
  },
  methods: {
    backToRegistNew() {
      this.$router.push('/regist/new')
    },
    setCode() {
      let code = parseInt(this.code)
      if (code < 0 || code > 9999) {
        this.errorDialogMsg = '你的認證碼不正確，應該是由四位數字組成。'
        this.errorDialog = true
      } else {
        this.intoChoose()
      }
    },
    intoChoose() {
      this.$router.push('/choose')
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
