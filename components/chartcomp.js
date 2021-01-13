import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  props: ['options'],
  mixins: [reactiveProp],
  mounted () {
    console.log("mounted ")
    console.log(this.chartData)
    const options = {
      scales: {
          yAxes: [
              {
                  ticks: {
                      beginAtZero: true
                  }
              }]
      },
      responsive: true,
      maintainAspectRatio: true,
      height: 300
  }    
     this.renderChart(this.chartData, options)
  }
}

