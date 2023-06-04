<script>
  import { Bar } from 'vue-chartjs'
  export default {
    extends: Bar,
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
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [{
            label: 'Contagem',
            borderWidth: 1,
            backgroundColor: [
              '#26A69A',
              '#26A69A',
              '#26A69A',
              '#26A69A',
              '#26A69A',
              '#26A69A',
              '#26A69A'
            ],
            pointBorderColor: '#2554FF',
            data: []
          }]
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
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                autoSkip: false,
                maxRotation: 90              
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
    mounted() {
      this.chartData.labels = this.labels
      this.chartData.datasets[0].data = this.data
      
      if (this.backgroundColors) {
        this.chartData.datasets[0].backgroundColor = this.backgroundColors
      }

      this.renderChart(this.chartData, this.options)
    }
  }
</script>