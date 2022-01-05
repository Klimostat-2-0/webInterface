<template>
  <h1>Room {{roomName}}</h1>
  <hr>
  <div>
    <h2>Overview</h2>
      <h4>
      {{locationName}}
      <br>
      CO2 Limit: {{co2_limit}}
      <br>
      <br>
    </h4>
    <round-chart-component :co2Limit='co2_limit' :co2Reset='co2_reset' 
    :chartTitle='"overview"' :chartData="co2" v-if="!isFetching" ref="overview"/>
    <hr>
    <h2>CO2</h2>
    <chart-component :chartTitle='"ppm"' :chartData="co2" v-if="!isFetching" ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :chartTitle='"Grad"' :chartData="temp" v-if="!isFetching" ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :chartTitle='"Prozent"' :chartData="humidity" v-if="!isFetching" ref="hum"/>
  </div>
</template>

<script>
  import ChartComponent from '../components/ChartComponent'
  import RoundChartComponent from '../components/RoundChartComponent.vue'
  import dataService from '../services/dataService'

  export default {
  name: 'Room',
  components: {
    ChartComponent,
    RoundChartComponent
  },
  methods: {
      async updateData(){
        try {
          const res = await dataService.updateCO2Data(this.stationId, this.lastTimeStamp)
          if(res.status != 200) {
            this.$store.dispatch('redirectError')
          }
          const chartData = res.data
          let updateCo2 = []
          let updateTemp = []
          let humidity = []
          for (const element of chartData.results) {
            let date = new Date(element.timestamp)
            let foramted = date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth()+1) + "-" + date.getDate()
            updateCo2.push([foramted, element.co2])
            updateTemp.push([foramted, element.temperature])
            humidity.push([foramted, element.humidity])
          }
          if(chartData.results.length > 0) {
            this .lastTimeStamp = chartData.results[0].timestamp.toString()
          }
          if(updateCo2.length > 0) {
            this.$refs.co2.updateData(updateCo2.reverse());
            this.$refs.overview.updateData(updateCo2.reverse())
            this.$refs.temp.updateData(updateTemp.reverse());
            this.$refs.hum.updateData(humidity);
          }
        } catch(err) {
          console.log(err)
          this.$store.dispatch('redirectError')
        }
      }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      stationId: String,
      isFetching: true,
      intervalls: [],
      lastTimeStamp: "",
      stationName: "",
      locationName: "",
      roomName: "",
      co2_limit: 1500,
      co2_reset: 1100
    }
  },
  async created(){
    this.stationId = this.$route.params.id
    try {
      const res = await dataService.getCO2Data(this.stationId)
      const res2 = await dataService.getStationsById(this.stationId)
      if(res.status != 200 || res2.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const chartData = res.data
      const stationData = res2.data
      for (const element of chartData.results) {
        let date = new Date(element.timestamp)
        let foramted = date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth()+1) + "-" + date.getDate()
        this.co2.push([foramted, element.co2])
        this.temp.push([foramted, element.temperature])
        this.humidity.push([foramted, element.humidity])
        if (this.lastTimeStamp == "") {
          this.lastTimeStamp = element.timestamp.toString()
        }
      }
      this.stationName = stationData.name
      this.locationName = stationData.location
      this.roomName = stationData.roomNr
      this.co2_limit = stationData.co2_limit
      this.co2_reset = stationData.co2_reset
      this.isFetching = false
    } catch(err) {
      console.log(err)
      this.$store.dispatch('redirectError')
    }
    this.intervalls.push(setInterval(this.updateData, 10000))
},
  beforeUnmount() {
    for(const element of this.intervalls){
      clearInterval(element)
    }
  }
}
</script>

<style scoped>

</style>