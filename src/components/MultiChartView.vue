<template>
  <div>
    <div class="shadow-box">
      <h2>Overview</h2>
      <p>
        Looking at Data from <b>{{displayFrom}}</b> to <b>{{displayTo}}</b>
        <br>
        {{infoText}} 
      </p>
      <div>
        <input v-on:click="previousData" class="custom-btn modified-btn" type="button" value="Previous" />
        <input v-on:click="nextData" class="custom-btn modified-btn" type="button" value="Next" />
      </div>
      <br>
      <round-chart-component :chartTitle='stationNames' :chartData="pieChartValues" :uniqueId="'overviewChart'"
      :key='isFetching' :co2Limit="stationLimits" :co2Reset="stationResets" ref="overview"/>
    </div>
    <div class="shadow-box">
      <h2>CO2</h2>
      <chart-component :options='this.co2ChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
      :chartData="co2" :key='isFetching' :uniqueId="'co2Chart'" ref="co2"/>
    </div>
    <div class="shadow-box">
      <h2>Temperatur</h2>
      <chart-component :options='this.tempChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
      :chartData="temp" :key='isFetching' :uniqueId="'tempChart'" ref="temp"/>
    </div>
    <div class="shadow-box">
      <h2>Luftfeuchtigkeit</h2>
      <chart-component :options='this.humChartOptions' :chartTitle='stationNames' :chartLabels="displayXNames"
      :chartData="humidity" :key='isFetching' :uniqueId="'humChart'" ref="hum"/>
    </div>
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
      async previousData(){
        this.$emit('previousData', this.userId)
      },
      async nextData(){
        this.$emit('nextData', this.userId)
      },
      async updateData(){
        const currentDate = handleCo2Data.roundDate(new Date())
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
                let co2Array = handleCo2Data.mapDataToTime(this.dayImportance, currentTimeArray, chartData.map(e => e.co2).reverse())
                updatePieChart.push(handleCo2Data.analyseCo2(co2Array, this.nextStationObj[i].co2_limit, this.nextStationObj[i].co2_reset))
                updatingCo2.push(co2Array)
                updatingTemp.push(handleCo2Data.mapDataToTime(this.dayImportance, currentTimeArray, chartData.map(e => e.temperature).reverse()))
                updatingHum.push(handleCo2Data.mapDataToTime(this.dayImportance, currentTimeArray, chartData.map(e => e.humidity).reverse()))
            } catch(err) {
                console.log(err)
                this.$store.dispatch('redirectError')
            }
        }
        this.$refs.overview.updateData(updatePieChart)
        this.$refs.co2.updateData(updatingDisplayNames, updatingCo2);
        this.$refs.temp.updateData(updatingDisplayNames, updatingTemp);
        this.$refs.hum.updateData(updatingDisplayNames, updatingHum);
        this.countDown = 60 * this.intervallValue
      },
      async setupData() {
        const currentDate = handleCo2Data.hoursAgoToTimestamp(this.range*this.indexBack, currentDate)
        const fromTime = handleCo2Data.hoursAgoToTimestamp(this.range, currentDate)
        let timeArray = null
        let co2Array = null
        this.correctTimeArray = handleCo2Data.getAbsoluteTimeline(fromTime, currentDate)
        this.dayImportance = handleCo2Data.checkDayImportance(this.correctTimeArray)  
        this.displayXNames = this.correctTimeArray.map(i => handleCo2Data.formatDate(this.dayImportance, i))
        this.displayXNamesLastUpdate = currentDate
        this.displayFrom = handleCo2Data.formatDate(this.dayImportance, fromTime)
        if(this.indexBack > 0) this.displayTo = handleCo2Data.formatDate(this.dayImportance, currentDate)
        for(const station of this.stationObj){
            try {
                let res = null
                if(this.indexBack==0){
                  res = await dataService.updateCO2DataLongFormet(station.id, handleCo2Data.addMinutes(1, fromTime))
                } else {
                  res = await dataService.updateCO2DataHistorical(station.id, handleCo2Data.addMinutes(1, fromTime),
                  currentDate)
                }
                if(res.length<=1) continue
                this.nextStationObj.push(station)
                let chartData = res
                this.lastTimeStamp.push(chartData[0].timestamp.toString())
                timeArray = chartData.map(e => new Date(e.timestamp)).reverse()
                co2Array = handleCo2Data.mapDataToTime(this.dayImportance, timeArray, chartData.map(e => e.co2).reverse())
                this.pieChartValues.push(handleCo2Data.analyseCo2(co2Array, station.co2_limit, station.co2_reset))
                this.co2.push(co2Array)
                this.temp.push(handleCo2Data.mapDataToTime(this.dayImportance, timeArray, chartData.map(e => e.temperature).reverse()))
                this.humidity.push(handleCo2Data.mapDataToTime(this.dayImportance, timeArray, chartData.map(e => e.humidity).reverse()))
                this.stationNames.push(station.name)
                this.stationResets.push(station.co2_reset)
                this.stationLimits.push(station.co2_limit)
                this.co2ChartOptions = chartStyle.co2ChartOptions(station.co2_limit)
            } catch(err) {
                console.log(err)
                this.$store.dispatch('redirectError')
            }
        }
      },
      async changeInterval(newIntervall){
        clearInterval(this.intervalls)
        this.intervalls = setInterval(this.updateData, newIntervall * 60000)
        this.intervallValue = newIntervall
        this.countDown = 60 * this.intervallValue
      },
      getRemaningTime: function() {
      if(this.indexBack > 0) {
        this.infoText = "Not updating while viewing the history";
        return
      }
      this.countDown--
      if(this.countDown < 0) this.countDown = 0
      this.infoText = "Next update in: " + this.countDown + "s"
    }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      displayXNames: [],
      pieChartValues: [],
      correctTimeArray: null,
      isFetching: 0,
      lastTimeStamp: [],
      co2ChartOptions: chartStyle.co2ChartOptions(1500),
      tempChartOptions: chartStyle.tempChartOptions(),
      humChartOptions: chartStyle.humChartOptions(),
      dayImportance: true,
      stationNames: [],
      stationLimits: [],
      stationResets: [],
      displayXNamesLastUpdate: [],
      nextStationObj: [],
      intervalls: null,
      displayFrom: "notSelected",
      displayTo: "Now",
      intervallValue: 1,
      calcTimeToUpdateInterval: null,
      infoText: "Configuring updates...",
      countDown: 60
    }
  },
  props: {
      stationObj: {
          type: Array
      },
      range: {
          type: Number,
          default: 1
      },
      indexBack: {
        type: Number,
        default: 0
      }
  },
  async created(){
    await this.setupData()
    if(this.indexBack == 0) this.intervalls = setInterval(this.updateData, 60000)
    this.calcTimeToUpdateInterval = setInterval(this.getRemaningTime, 1000)
    this.isFetching++
},
  beforeUnmount() {
    clearInterval(this.intervalls)
    clearInterval(this.calcTimeToUpdateInterval)
  }
}
</script>

<style scoped>

</style>