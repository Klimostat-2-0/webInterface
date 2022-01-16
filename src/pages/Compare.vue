<template>
  <div class="shadow-box compare-options">
  <h1>Compare</h1>
    <p>On this page you can compare the data of two stations.</p>
    <h2>Select you station</h2>
    <div :key="this.isFetching">
      <div class="formElement m-2">
        <label class="room-label">Station1:</label>
        <select class="form-select" v-model="station1" name="station1" id="station1">
          <option v-for="station in stations" :key="station.id" :value="JSON.stringify(station)">{{station.name}}</option>
        </select>
      </div>
      <br>
      <div class="formElement m-2">
        <label class="room-label">Station2:</label>
        <select class="form-select" v-model="station2" name="station2" id="station2">
          <option v-for="station in stations" :key="station.id" :value="JSON.stringify(station)">{{station.name}}</option>
        </select>
      </div>
      <br>
      <div class="formElement m-2">
        <label class="room-label">Time Period: </label>
        <select class="form-select" v-model="timeScale" v-on:change="changeScale" name="times" id="times">
          <option value=1>Last Hour</option>
          <option value=2>Last 2 Hours</option>
          <option value=6>Last 6 Hours</option>
          <option value=12>Last 12 Hours </option>
          <option value=24>Last Day</option>
          <option value=48>Last 2 Days</option>
        </select>
      </div>
      <br>
      <input v-on:click="loadComparisonData" class="custom-btn w-25 m-4" type="button" value="Load"/>
    </div>
  </div>
  
  <div v-if="this.dataLoaded" :key="isFetching">
    <multi-chart-view :stationObj="staionsForComparission"/>
  </div>
</template>

<script>
  import ChartComponent from '../components/ChartComponent'
  import RoundChartComponent from '../components/RoundChartComponent.vue'
  import dataService from '../services/dataService'
  import MultiChartView from '../components/MultiChartView.vue'
  import chartStyle from '../chartStyles/chartStyles'

  export default {
  name: 'Compare',
  components: {
    ChartComponent,
    RoundChartComponent,
    MultiChartView
  },
  methods: {
      loadComparisonData(){
          if(this.station1 != '' && this.station2 != ''){
            this.staionsForComparission=[JSON.parse(this.station1), JSON.parse(this.station2)]
            this.dataLoaded = true
            this.isFetching++
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
      dataLoaded: false,
      staionsForComparission: []
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
@import "../styles/compare.css";
</style>