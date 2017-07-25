<template>
  <v-dialog v-model="msgShow.show">
    <v-card>
      <v-card-title>{{ msgTitle ? msgTitle : '訊息' }}</v-card-title>
      <v-card-text>
        {{ msgContent ? msgContent : '' }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-show="msgConfirmAction" class="green--text darken-1" flat="flat" @click.native="deny">{{ msgDenyText ? msgDenyText : '取消' }}</v-btn>
        <v-btn class="green--text darken-1" flat="flat" @click.native="confirm">{{ msgConfirmText ? msgConfirmText : '確認' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as api from '../lib/api'
import * as orderApi from '../lib/api/order'

export default {
  props: {
    'msgShow': Object,
    'msgTitle': String,
    'msgContent': String,
    'msgConfirmText': String,
    'msgDenyText': String,
    'msgConfirmAction': Function,
    'msgDenyAction': Function
  },
  methods: {
    confirm () {
      this.msgShow.show = false
      this.msgConfirmAction ? this.msgConfirmAction() : ''
    },
    deny () {
      this.msgShow.show = false
      this.msgDenyAction ? this.msgDenyAction() : ''
    }
  }
}
</script>

<style>
</style>
