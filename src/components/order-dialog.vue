<template>
  <v-dialog class="dialog" v-model="orderDialog">
    <v-btn
      slot="activator"
      primary
      fab
      :class="btnClass"
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
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="orderDialog = false">取消</v-btn>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="order">訂購</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as api from '../lib/api'
import * as orderApi from '../lib/api/order'

export default {
  props: [
    'position',
    'secondary'
  ],
  data () {
    return {
      amount: null,
      orderDialog: false
    }
  },
  computed: {
    btnClass () {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom'
    }
  },
  methods: {
    order () {
      this.orderDialog = false
      let user = api.nowUser
      orderApi.setOrder(user.getGameId(), user.getTeam(), user.getJob(), 'CAR', this.amount)
    }
  }
}
</script>

<style>
</style>
