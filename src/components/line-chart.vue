<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['type', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>