<template>
  <v-data-table
    :headers="header"
    :items="readableOrderList"
    hide-actions
    no-data-text="還沒有訂貨紀錄"
  >
    <template slot="items" scope="props">
      <td>{{ props.item.readableGameTime }}</td>
      <td class="text-xs-right">{{ props.item.amount }}</td>
      <!--<td class="text-xs-right">{{ props.item.delivered }}</td>-->
    </template>
  </v-data-table>
</template>

<script>
import * as readable from '../lib/readable'

export default {
  props: {
    'list': Array,
    'get-list': Array
  },
  data () {
    return {
      header: [
        { text: '時間', align: 'left', value: 'readableGameTime' },
        { text: '數量', value: 'amount' }/*,
        { text: '已送達', value: 'delivered' }*/
      ]
    }
  },
  computed: {
    readableOrderList () {
      if (this.list) {
        console.log(readable.toReadableOrderList(this.list/*, this.getList*/))
        return readable.toReadableOrderList(this.list/*, this.getList*/)
      } else {
        return [{readableGameTime:'A', amount:123}, {readableGameTime:'B', amount:456}]
      }
    }
  }
}
</script>

<style>

</style>
