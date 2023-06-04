<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: {
      labels: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Contagem',
              data: [],
              fill: false,
              borderColor: '#26A69A',
              backgroundColor: '#26A69A',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.chartData.labels = this.labels
      this.chartData.datasets[0].data = this.data
      this.options.maintainAspectRatio = !this.$q.screen.gt.sm
      this.renderChart(this.chartData, this.options)
    }
  }
</script>