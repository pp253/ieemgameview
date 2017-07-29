<template>
  <v-dialog
    class="inline-dialog"
    v-model="accountDialog"
    persistent
  >
    <v-btn
      class="activator"
      slot="activator"
      primary
    >
      變更組別金額
    </v-btn>
    <v-card>
      <v-card-title>變更組別金額</v-card-title>
      <v-card-text>
        <v-select
          v-bind:items="teamList"
          v-model="selectedTeam"
          label="選擇組別"
          single-line
          item-value="index"
          bottom
        ></v-select>
        <v-select
          v-bind:items="actionList"
          v-model="selectedAction"
          label="給予或拿取"
          single-line
          item-value="index"
          bottom
        ></v-select>
        <v-text-field
          v-model="balance"
          label="金額"
          type="number"
          suffix="元"
          min="0"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :class="color.accent" flat="flat" @click.native="accountDialog = false">取消</v-btn>
        <v-btn :class="color.accent" flat="flat" @click.native="act">登記</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as readable from '../lib/readable'
import * as constant from '../lib/constant'
import * as api from '../lib/api'
import * as accountApi from '../lib/api/account'

export default {
  props: {
    'announce': Function
  },
  data: function () {
    return {
      accountDialog: false,
      selectedAction: null,
      selectedTeam: null,
      amount: null,
      balance: null,
      state: api.nowUser.getState(),
      color: api.nowUser.getColor()
    }
  },
  computed: {
    teamList () {
      return readable.toReadableTeamList(api.nowUser.getTeamNumber())
    },
    actionList () {
      return [{
        index: 'TAKE',
        text: '扣款'
      }, {
        index: 'GIVE',
        text: '給予'
      }]
    }
  },
  methods: {
    act () {
      this.accountDialog = false
      switch (this.selectedAction) {
        case 'TAKE':
          accountApi.take(api.nowUser.getGameId(), this.selectedTeam, this.balance)
            .then((function (res) {
              let data = res.data
              this.announce(`成功拿取${data.teamIndex}組${data.balance}元`)
            }).bind(this))
            .catch((function (err) {
              console.log(err)
              this.announce(err.data && (err.data.readableMsg || err.data.msg))
            }).bind(this))
          break
        case 'GIVE':
          accountApi.give(api.nowUser.getGameId(), this.selectedTeam, this.balance)
            .then((function (res) {
              let data = res.data
              this.announce(`成功給予${data.teamIndex}組${data.balance}元`)
            }).bind(this))
            .catch((function (err) {
              console.log(err)
              this.announce(err.data && (err.data.readableMsg || err.data.msg))
            }).bind(this))
          break
      }
    }
  }
}
</script>

<style>
</style>
