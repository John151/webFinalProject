
<script>

import { Bar, mixins} from 'vue-chartjs'
let {reactiveProp} = mixins

export default {
    extends: Bar,
    name: 'LineChart',
    mixins: [reactiveProp],
    mounted() {
        this.renderChart(this.chartData, this.chartOptions)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>