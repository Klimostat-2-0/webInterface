<template>
  <div>
    <h2>Overview</h2>
    <round-chart-component :chartTitle='stationNames' :chartData="pieChartValues" :uniqueId="'overviewChart'"
     :key='isFetching' ref="overview"/>
    <hr>
    <h2>CO2</h2>
    <chart-component :options='this.co2ChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
     :chartData="co2" :key='isFetching' :uniqueId="'co2Chart'" ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :options='this.tempChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
     :chartData="temp" :key='isFetching' :uniqueId="'tempChart'" ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :options='this.humChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
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
      async updateData(){
        const currentDate = new Date()
        const fromTime = this.lastTimeStamp
        let updatingCorrectTime = handleCo2Data.getAbsoluteTimeline(this.displayXNamesLastUpdate, currentDate)
        let updatingDisplayNames = updatingCorrectTime.map(i => handleCo2Data.formatDate(this.dayImportance, i))
        this.displayXNamesLastUpdate = currentDate
        let updatingCo2 = []
        let updatingHum = []
        let updatingTemp = []
        let updatePieChart = []
        for(let i = 0; i < this.nextStationObj.length; i++){
            try {
                let res = await dataService.updateCO2DataLongFormet(this.nextStationObj[i].id, fromTime[i])
                if(res.length<=0){
                  updatePieChart.push([])
                  updatingCo2.push([])
                  updatingTemp.push([])
                  updatingHum.push([])
                  continue
                } 
                let chartData = res
                this.lastTimeStamp[i] = chartData[0].timestamp.toString()
                let currentTimeArray = chartData.map(e => new Date(e.timestamp)).reverse()
                let co2Array = handleCo2Data.mapDataToTime(updatingCorrectTime, currentTimeArray, chartData.map(e => e.co2).reverse())
                updatePieChart.push(handleCo2Data.analyseCo2(co2Array, this.nextStationObj[i].co2_limit, this.nextStationObj[i].co2_reset))
                updatingCo2.push(co2Array)
                updatingTemp.push(handleCo2Data.mapDataToTime(updatingCorrectTime, currentTimeArray, chartData.map(e => e.temperature).reverse()))
                updatingHum.push(handleCo2Data.mapDataToTime(updatingCorrectTime, currentTimeArray, chartData.map(e => e.humidity).reverse()))
            } catch(err) {
                console.log(err)
                this.$store.dispatch('redirectError')
            }
        }
        this.$refs.overview.updateData(updatePieChart)
        this.$refs.co2.updateData(updatingDisplayNames, updatingCo2);
        this.$refs.temp.updateData(updatingDisplayNames, updatingTemp);
        this.$refs.hum.updateData(updatingDisplayNames, updatingHum);
      },
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
      lastTimeStamp: [],
      co2ChartOptions: chartStyle.co2ChartOptions(1500),
      tempChartOptions: chartStyle.tempChartOptions(),
      humChartOptions: chartStyle.humChartOptions(),
      dayImportance: true,
      timeScale: 1,
      refreshInterval: 1,
      stationNames: [],
      displayXNames: [],
      pieChartValues: [],
      displayXNamesLastUpdate: [],
      nextStationObj: []
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
    this.correctTimeArray = handleCo2Data.getAbsoluteTimeline(new Date(fromTime), currentDate)
    this.dayImportance = handleCo2Data.checkDayImportance(this.correctTimeArray)  
    this.displayXNames = this.correctTimeArray.map(i => handleCo2Data.formatDate(this.dayImportance, i))
    this.displayXNamesLastUpdate = currentDate
    for(const station of this.stationObj){
        try {
            let res = await dataService.updateCO2DataLongFormet(station.id, fromTime)
            if(res.length<=1) continue
            this.nextStationObj.push(station)
            let chartData = res
            chartData = handleCo2Data.filterOldData(chartData, new Date(fromTime))
            this.lastTimeStamp.push(chartData[0].timestamp.toString())
            this.timeArray = chartData.map(e => new Date(e.timestamp)).reverse()
            this.loadOriginalData(chartData, station.co2_limit, station.co2_reset)
            this.stationNames.push(station.name)
            this.co2ChartOptions = chartStyle.co2ChartOptions(station.co2_limit)
        } catch(err) {
            console.log(err)
            this.$store.dispatch('redirectError')
        }
    }
    this.intervalls = setInterval(this.updateData, 60000)
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