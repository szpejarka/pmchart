<template>
  <div class="small">
    <line-chart :chartData="datacollection" :styles="myStyles"></line-chart>
    <button @click="getData()">Refresh</button>
  </div>
</template>
 
<script>
  import LineChart from '../components/chartcomp.js'
  import axios from 'axios'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.getData()
    },
    computed: {
      myStyles () {
        return {
          height: '300px',
          position: 'relative'
        }
      }
    },
    methods: {
      getData() {
        axios.get('https://prod-38.northeurope.logic.azure.com/workflows/03eff1cdb34342e69cfbfd547964fc58/triggers/manual/paths/invoke/now/now?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1G6pFtIX5agmK4tM3VZhi-jKeHMzGASS8tRM66doacs')
          .then((response) => {
            console.log(response)
            const sorted = response.data/*.sort(function(a,b){
              console.log("sort "+a+" "+b)
              if(a.dateNorm < b.dateNorm)
                return -1
              if(a.dateNorm > b.dateNorm)
                return -1
              return 0
            })*/
          
            const chartdata025 = sorted.map(function (i) {
              return i.pms025n
            })
            const chartdata100 = sorted.map(function (i) {
              return i.pms100n
            })
            let idx = 1
            const labels = sorted.map(function (i) {
              return i.dateNorm
            })
            this.datacollection = {
              labels,
              datasets: [
                {
                  label: 'PM 2.5um',
                  backgroundColor: 'green',
                  data: chartdata025
                }, {
                  label: 'Pm 10um',
                  backgroundColor: '#f87979',
                  data: chartdata100
                }
              ]
            }     
          })
      }
    }
  }
</script>

<style>
  .small {
    max-width: 90%;
    margin:  auto;
    height: 300px;
  }
</style>