<template>
  <div>
    <h2>CO2</h2>
    <chart-component :options='this.co2ChartOptions' :chartTitle='stationNames' :chartLabel="correctTimeArray"
     :chartData="co2" :key='isFetching' :uniqueId="'co2Chart'" ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :options='this.tempChartOptions' :chartTitle='stationNames' :chartLabel="correctTimeArray"
     :chartData="temp" :key='isFetching' :uniqueId="'tempChart'" ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :options='this.humChartOptions' :chartTitle='stationNames' :chartLabel="correctTimeArray"
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
      async changeScale(){
        try {
          const res = await dataService.updateCO2DataLongFormet(this.stationId, handleCo2Data.hoursAgoToTimestamp(this.timeScale))
          this.loadOriginalData({"results": res})
          this.isFetching++
        } catch(err){
          console.log(err)
          this.$store.dispatch('redirectError')
        }
      },
      async changeInterval(){
        clearInterval(this.intervalls)
        this.intervalls = setInterval(this.updateData, this.refreshInterval * 60000)
      },
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
            let foramted = handleCo2Data.formatDate(this.dayImportance, date)
            updateCo2.push([foramted, element.co2])
            updateTemp.push([foramted, element.temperature])
            humidity.push([foramted, element.humidity])
          }
          if(chartData.results.length > 0) {
            this.lastTimeStamp = chartData.results[0].timestamp.toString()
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
      },
      loadOriginalData(chartData) {
        this.co2.push(handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.results.map(e => e.co2)).reverse())
        this.temp.push(handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.results.map(e => e.temperature)).reverse())
        this.humidity.push(handleCo2Data.mapDataToTime(this.correctTimeArray, this.timeArray, chartData.results.map(e => e.humidity)).reverse())
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
      stationNames: []
    }
  },
  props: {
      stationObj: {
          type: Array
      }
  },
  async created(){
    const fromTime = handleCo2Data.hoursAgoToTimestamp(this.timeScale)
    let newestTimestamp = null;
    for(const station of this.stationObj){
        try {
            let res = await dataService.updateCO2DataLongFormet(station.id, fromTime)
            if(res.length<=0) res = [handleCo2Data.generateEmptyRequestData(fromTime, station.id)]
            let chartData = {"results": res}
            if (newestTimestamp==null){
                this.timeArray = chartData.results.map(e => new Date(e.timestamp))
                this.correctTimeArray = handleCo2Data.getValidTimeLine(this.timeArray)
                this.lastTimeStamp = chartData.results[0].timestamp.toString()
                this.dayImportance = handleCo2Data.checkDayImportance(this.timeArray)  
                newestTimestamp = this.lastTimeStamp
            } else {
                chartData = {"results": handleCo2Data.filterNewData(chartData.results, newestTimestamp)}
            }
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