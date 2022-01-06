<template>
  <h1>Room {{roomName}}</h1>
  <hr>
  <div>
    <h2>Overview</h2>
      <h4>
      {{locationName}}
      <br>
      <label>CO2 Limit:</label>
      <div class="formElement">
      <input onkeydown="return false" step="100" v-model="co2_limit" min="300" max="3000" type="number" name="co2Limit" />
      <input v-on:click="changeLimit" class="changeButton" type="button" value="ChangeLimit" />
      <p :style="{ color: 'red'}" class="userMsg" v-if="errorMsg != null">{{errorMsg}}</p>
      </div>
      <br>
      <label>Time Period: </label>
      <div class="formElement">
      <select v-model="timeScale" v-on:change="changeScale" name="times" id="times">
        <option value="1">Last Hour</option>
        <option value="6">Last 6 Hours</option>
        <option value="12">Last 12 Hours </option>
        <option value="24">Last Day</option>
        <option value="3072">Last Half Year</option>
      </select>
      </div>
      <br>
      <br>
    </h4>
    <round-chart-component :co2Limit='co2_limit' :co2Reset='co2_reset' 
    :chartTitle='"overview"' :chartData="co2" :key='isFetching' ref="overview"/>
    <hr>
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
      async changeLimit() {
        if(this.co2_limit != this.old_co2_limit){
          this.old_co2_limit = this.co2_limit
          try {
            const res = await dataService.setNewLimit(this.stationId, this.co2_limit, parseInt(this.co2_limit*0.7))
            if(res.status != 200) {
              this.errorMsg = "Couldn't update the limit"
              return
            }
            const changedData = res.data
            this.co2_limit = changedData.co2_limit
            this.co2_reset = changedData.co2_reset
            this.co2ChartOptions = chartStyle.co2ChartOptions(this.co2_limit)
            this.isFetching++
            this.errorMsg = null
          } catch(err) {
            console.log(err)
            this.errorMsg = "Couldn't update the limit"
        }
        }
      },
      async changeScale(){
        console.log("I was called: " + this.timeScale)
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
      }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      stationId: String,
      isFetching: 0,
      intervalls: [],
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
      errorMsg: null,
      timeScale: 1
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
      this.lastTimeStamp = chartData.results[0].timestamp.toString()
      let timeArray =  chartData.results.map(e => new Date(e.timestamp))
      let correctTimeline = handleCo2Data.getValidTimeLine(timeArray)
      this.co2 = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.co2))
      this.temp = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.temperature))
      this.humidity = handleCo2Data.mapDataToTime(correctTimeline, timeArray, chartData.results.map(e => e.humidity))
      this.dayImportance = handleCo2Data.checkDayImportance(timeArray)

      this.stationName = stationData.name
      this.locationName = stationData.location
      this.roomName = stationData.roomNr
      this.co2_limit = stationData.co2_limit
      this.old_co2_limit = stationData.co2_limit
      this.co2_reset = stationData.co2_reset
      this.co2ChartOptions = chartStyle.co2ChartOptions(this.co2_limit)
      this.isFetching++
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