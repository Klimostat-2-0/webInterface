<template>
  <h1>Compare</h1>
  <p>On this page you can compare the data of two stations.</p>
  <hr>
  <h2>Select you station</h2>
  <div :key="this.isFetching">
      <label>Station1</label>
      <div class="formElement">
      <select v-model="station1" name="station1" id="station1">
        <option v-for="station in stations" :key="station.id" :value="station.id">{{station.name}}</option>
      </select>
      </div>
      <br>
      <label>Station2</label>
      <div class="formElement">
      <select v-model="station2" name="station2" id="station2">
        <option v-for="station in stations" :key="station.id" :value="station.id">{{station.name}}</option>
      </select>
      </div>
      <br>
      <br>
      <input v-on:click="loadComparisonData" class="loadButton" type="button" value="Load"/>
  </div>
  <hr>
  <div v-if="this.dataLoaded">
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
  name: 'Compare',
  components: {
    ChartComponent,
    RoundChartComponent
  },
  methods: {
      loadComparisonData(){
          if(this.station1 != '' && this.station2 != ''){
            console.log(this.station1)
            console.log(this.station2)
          }
      }
  },
  data() {
    return {
      isFetching: 0,
      co2ChartOptions: chartStyle.co2ChartOptions(1500),
      tempChartOptions: chartStyle.tempChartOptions(),
      humChartOptions: chartStyle.humChartOptions(),
      stations: [],
      station1: '',
      station2: '',
      dataLoaded: false
    }
  },
  async created(){
      try {
      const res = await dataService.getStations()
      if(res.status != 200) {
        this.$store.dispatch('redirectError')
        return
      }
      const stations = res.data
      this.stations = stations.results
      this.isFetching++
    } catch(err) {
      console.log(err)
      this.$store.dispatch('redirectError')
    } 
  },
  beforeUnmount() {
  }
}
</script>

<style scoped>
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
.loadButton {
  background-color: #1a2815;
  border: none;
  color: #dbff78;
  padding: 5px;
  width: 80px;
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
}
</style>