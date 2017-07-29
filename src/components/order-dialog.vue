<template>
  <div>
    <v-dialog class="dialog" v-model="orderDialog">
      <v-btn
        slot="activator"
        fab
        :class="color.accent + ' ' + btnClass"
        :small="secondary"
      >
        <v-icon class="white--text">add_shopping_cart</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>你想要訂購多少呢？</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="amount"
            name="order-number"
            label="訂購數量"
            id="order-number"
            type="number"
            suffix="臺"
            min="0"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :class="color.primary + '--text'" flat @click.native="orderDialog = false">取消</v-btn>
          <v-btn
            :disabled="!amount"
            :class="color.primary + '--text'"
            flat
            @click.native="order">訂購</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <msg-dialog
      :msg-show="msgDialog"
      :msg-title="msgDialog.title"
      :msg-content="msgDialog.content"
    ></msg-dialog>
  </div>
</template>

<script>
import * as readable from '../lib/readable'
import * as api from '../lib/api'
import * as orderApi from '../lib/api/order'

export default {
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      amount: null,
      orderDialog: false,
      msgDialog: {
        show: false,
        title: '',
        content: ''
      },
      color: api.nowUser.getColor()
    }
  },
  computed: {
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    }
  },
  methods: {
    order () {
      let user = api.nowUser
      this.orderDialog = false
      orderApi.setOrder(user.getGameId(), user.getTeam(), user.getJob(), 'CAR', this.amount)
        .then((function (res) {
          let data = res.data
          this.msgBox('訂購成功', `成功訂購${data.amount}臺車`)
        }).bind(this))
        .catch((function (err) {
          let data = err.data
          this.msgBox('訂購失敗', data.readableMsg || data.msg)
        }).bind(this))
    },
    msgBox (title, content) {
      this.msgDialog.show = true
      this.msgDialog.title = title
      this.msgDialog.content = content
    }
  }
}
</script>

<style>
</style>
