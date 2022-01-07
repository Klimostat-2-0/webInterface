<template>
  <div>
    <h2>Overview</h2>
    <round-chart-component :chartTitle='stationNames' :chartData="pieChartValues" :uniqueId="'overviewChart'"
     :key='isFetching' ref="overview"/>
    <hr>
    <h2>CO2</h2>
    <chart-component :options='this.co2ChartOptions' :chartTitle='stationNames' :chartLabel="displayXNames"
     :chartData="co2" :key='isFetching' :uniqueId="'co2Chart'" ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :options='this.tempChartOptions' :chartTitle='stationNames' :chartLabel="displayXNames"
     :chartData="temp" :key='isFetching' :uniqueId="'tempChart'" ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :options='this.humChartOptions' :chartTitle='stationNames' :chartLabel="displayXNames"
     :chartData="humidity" :key='isFetching' :uniqueId="'humChart'" ref="hum"/>
  </div>
</template>

<script>
  import ChartComponent from '../components/ChartComponent'
  import RoundChartComponent from '../components/RoundChartComponent.vue'
  import dataService from '../services/dataService'
  import handleCo2Data from '../services/handleCo2Data'
  import chartStyle from '../chartStyles/chartStyles'

  export default {
  name: 'MultiChartView',
  components: {
    ChartComponent,
    RoundChartComponent
  },
  methods: {
      loadOriginalData(chartData, co2Limit=1500, co2Reset=1100) {
        let co2Array = handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.map(e => e.co2).reverse())
        this.pieChartValues.push(handleCo2Data.analyseCo2(co2Array, co2Limit, co2Reset))
        this.co2.push(co2Array)
        this.temp.push(handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.map(e => e.temperature).reverse()))
        this.humidity.push(handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.map(e => e.humidity).reverse()))
      }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      timeArray: null,
      correctTimeArray: null,
      isFetching: 0,
      lastTimeStamp: "",
      co2ChartOptions: chartStyle.co2ChartOptions(1500),
      tempChartOptions: chartStyle.tempChartOptions(),
      humChartOptions: chartStyle.humChartOptions(),
      dayImportance: true,
      timeScale: 1,
      refreshInterval: 1,
      stationNames: [],
      displayXNames: [],
      pieChartValues: []
    }
  },
  props: {
      stationObj: {
          type: Array
      }
  },
  async created(){
    const currentDate = new Date()
    const fromTime = handleCo2Data.hoursAgoToTimestamp(this.timeScale, currentDate)
    for(const station of this.stationObj){
        try {
            let res = await dataService.updateCO2DataLongFormet(station.id, fromTime)
            if(res.length<=1) continue
            let chartData = res
            if (this.correctTimeArray==null){
                this.correctTimeArray = handleCo2Data.getAbsoluteTimeline(new Date(fromTime), currentDate)
                this.displayXNames = this.correctTimeArray.map(i => handleCo2Data.formatDate(this.dayImportance, i))
                this.lastTimeStamp = chartData[0].timestamp.toString()
                this.dayImportance = handleCo2Data.checkDayImportance(this.correctTimeArray)  
            }
            chartData = handleCo2Data.filterNewData(chartData, currentDate)
            this.timeArray = chartData.map(e => new Date(e.timestamp)).reverse()
            this.loadOriginalData(chartData)
            this.stationNames.push(station.name)
            this.co2ChartOptions = chartStyle.co2ChartOptions(0)
        } catch(err) {
            console.log(err)
            this.$store.dispatch('redirectError')
        }
        //this.intervalls = setInterval(this.updateData, 60000)
    }
    this.isFetching++
},
  beforeUnmount() {
    clearInterval(this.intervalls)
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