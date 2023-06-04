<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    props: {
      labels: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      backgroundColors: {
        type: Array,
        required: false
      }
    },
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [{
              borderWidth: 1,
              backgroundColor: [
                '#2672A6',
                '#26A69A'
              ],
              data: []
            }]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.chartData.labels = this.labels
      this.chartData.datasets[0].data = this.data
      
      if (this.backgroundColors) {
        this.chartData.datasets[0].backgroundColor = this.backgroundColors
      }

      this.renderChart(this.chartData, this.options)
    }
  }
</script>