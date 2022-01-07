<template>
  <h1>Compare</h1>
  <p>On this page you can compare the data of two stations.</p>
  <hr>
  <div>
    <h2>CO2</h2>
    <chart-component :options='this.co2ChartOptions' :chartTitle='"ppm"' :chartData="co2" :key='isFetching' ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :options='this.tempChartOptions' :chartTitle='"Grad"' :chartData="temp" :key='isFetching' ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :options='this.humChartOptions' :chartTitle='"Prozent"' :chartData="humidity" :key='isFetching' ref="hum"/>
  </div>
</template>

<script>
  import ChartComponent from '../components/ChartComponent'
  import RoundChartComponent from '../components/RoundChartComponent.vue'
  import dataService from '../services/dataService'
  import handleCo2Data from '../services/handleCo2Data'
  import chartStyle from '../chartStyles/chartStyles'

  export default {
  name: 'Room',
  components: {
    ChartComponent,
    RoundChartComponent
  },
  methods: {
      loadOriginalData(chartData) {
        this.lastTimeStamp = chartData.results[0].timestamp.toString()
        let timeArray =  chartData.results.map(e => new Date(e.timestamp))
        let correctTimeline = handleCo2Data.getValidTimeLine(timeArray)
        this.co2 = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.co2))
        this.temp = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.temperature))
        this.humidity = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.humidity))
        this.dayImportance = handleCo2Data.checkDayImportance(timeArray)
      }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      stationId: String,
      isFetching: 0,
      lastTimeStamp: "",
      stationName: "",
      locationName: "",
      roomName: "",
      co2_limit: 1500,
      old_co2_limit: 1500,
      co2_reset: 1100,
      co2ChartOptions: chartStyle.co2ChartOptions(1500),
      tempChartOptions: chartStyle.tempChartOptions(),
      humChartOptions: chartStyle.humChartOptions(),
      dayImportance: true,
      timeScale: 1,
    }
  },
  created(){   
  },
  beforeUnmount() {
  }
}
</script>

<style scoped>
.changeButton {
  background-color: #1a2815;
  border: none;
  color: #dbff78;
  padding: 5px 5px;
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
}
label {
    display: inline-block;
    width: 140px;
    text-align: right;
    margin-right: 20px;
}
.formElement {
    display: inline-block;
    width: 200px;
    text-align: left;
    margin: 5px
}
</style>