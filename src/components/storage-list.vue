<template>
  <v-data-table
    v-bind:headers="header"
    :items="readableStorageList"
    hide-actions
    no-data-text="還沒有囤貨紀錄"
  >
    <template slot="items" scope="props">
      <td>{{ props.item.readableProduct }}</td>
      <td class="text-xs-right">{{ props.item.amount }}</td>
    </template>
  </v-data-table>
</template>

<script>
import * as readable from '../lib/readable'

export default {
  props: [
    'list'
  ],
  data: function () {
    return {
      header: [
        {text: '產品', align: 'left', value: 'readableProduct'},
        {text: '數量', value: 'amount'}
      ]
    }
  },
  computed: {
    readableStorageList: function () {
      if (this.list) {
        return readable.toReadableStorageList(this.list)
      } else {
        return [{readableProduct:'A', amount:123}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}, {readableProduct:'B', amount:456}]
      }
    }
  }
}
</script>

<style>

</style>
