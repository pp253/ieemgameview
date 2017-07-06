<template>
  <v-data-table
    v-bind:headers="header"
    :items="readableDeliverList"
    hide-actions
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
  props: [
    'list'
  ],
  data: function () {
    return {
      header: [
        {text: '時間', align: 'left', value: 'readableGameTime'},
        {text: '數量', value: 'amount'}
      ]
    }
  },
  computed: {
    readableDeliverList: function () {
      if (this.list) {
        return readable.toReadableDeliverList(this.list)
      } else {
        return [{readableGameTime:'A', amount:123}, {readableGameTime:'B', amount:456}]
      }
    }
  }
}
</script>

<style>

</style>
