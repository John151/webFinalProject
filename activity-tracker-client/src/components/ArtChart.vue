
<script>

import { Pie, mixins} from 'vue-chartjs'
let {reactiveProp} = mixins

export default {
    extends: Pie,
    name: 'ArtChart',
    mixins: [reactiveProp],
    mounted() {
        this.renderChart(this.chartData, this.chartOptions)
    },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>