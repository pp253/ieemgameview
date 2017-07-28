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
  props: {
    'list': Array,
    'announce': Function
  },
  data () {
    return {
      header: [
        {text: '產品', align: 'left', value: 'readableProduct'},
        {text: '數量', value: 'amount'}
      ],
      lastList: []
    }
  },
  computed: {
    readableStorageList () {
      if (this.list) {
        let same = true
        // check last list
        for (let i of this.list) {
          let founded = false
          for (let n of this.lastList) {
            if (n.product === i.product) {
              founded = true
              if (n.amount !== i.amount) {
                same = false
              }
              break
            }
          }
          if (!founded || !same) {
            same = false
            break
          }
        }

        // copy lastList
        this.lastList = []
        for (let i of this.list) {
          this.lastList.push({
            product: i.product,
            amount: i.amount
          })
        }
        if (!same) {
          this.announce ? this.announce('庫存更新了！') : null
        }
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
