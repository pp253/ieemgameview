<template>
  <v-data-table
    v-bind:headers="header"
    :items="readableDeliverList"
    hide-actions
    no-data-text="還沒有物流紀錄"
  >
    <template slot="items" scope="props">
      <td>{{ props.item.readableGameTime }}</td>
      <td class="text-xs-right">{{ props.item.amount }}</td>
    </template>
  </v-data-table>
</template>

<script>
import * as readable from '../lib/readable'

export default {
  props: {
    'list': Array,
    'announce': Function
  },
  data: function () {
    return {
      header: [
        {text: '時間', align: 'left', value: 'readableGameTime'},
        {text: '數量', value: 'amount'}
      ]
    }
  },
  computed: {
    readableDeliverList () {
      if (this.list) {
        this.announce('物流紀錄更新了！')
        return readable.toReadableDeliverList(this.list)
      } else {
        return []
      }
    }
  }
}
</script>

<style>

</style>
