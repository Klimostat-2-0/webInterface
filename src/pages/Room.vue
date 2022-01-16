<template>
  <h1>Room {{roomName}}</h1>
  <h4>{{locationName}}</h4>
  <br>
    <div class="shadow-box room-options">
    <h2>Controls</h2>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="formElement">
              <label class="room-label">CO2 Limit:</label>
              <input class="form-control" onkeydown="return false" step="100" v-model="co2_limit" min="300" max="3000" type="number" name="co2Limit" 
              :readonly="!this.$store.getters.getAdminAccess"/>
            </div>
            <br>
            <div class="formElement">
              <label class="room-label">CO2 Reset:</label>
              <input class="form-control" onkeydown="return false" step="100" v-model="co2_reset" min="200" max="2900" type="number" name="co2Limit" 
              :readonly="!this.$store.getters.getAdminAccess"/>
              <p :style="{ color: 'red'}" class="userMsg" v-if="errorMsg != null">{{errorMsg}}</p>
            </div>
            <div v-if="this.$store.getters.getAdminAccess">
              <input v-on:click="changeLimit" class="custom-btn modified-btn" type="button" value="Change" />
            </div>
          </div>
          <div class="col">
            <div class="formElement">
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
            <div class="formElement">
              <label class="room-label">Refresh interval: </label>
              <select class="form-select" v-model="refreshInterval" v-on:change="changeInterval" name="refreshIntervalls" id="refreshIntervalls">
                <option value=1>live</option>
                <option value=5>5min</option>
                <option value=10>10min</option>
                <option value=15>15min</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :key="isFetching">
      <multi-chart-view @previousData="previousData" @nextData="nextData" 
      :stationObj="station" :range="timeScale" :indexBack="indexBack" ref="charts"/>
    </div>
</template>

<script>
  import dataService from '../services/dataService'
  import MultiChartView from '../components/MultiChartView.vue'

  export default {
  name: 'Room',
  components: {
    MultiChartView
  },
  methods: {
      async changeLimit() {
        if(this.co2_limit != this.old_co2_limit || this.co2_reset != this.old_co2_reset){
          this.old_co2_limit = this.co2_limit
          this.old_co2_reset = this.co2_reset
          try {
            const res = await dataService.setNewLimit(this.stationId, this.co2_limit, this.co2_reset)
            if(res.status != 200) {
              this.errorMsg = "Couldn't update the limits"
              return
            }
            const res2 = await dataService.getStationsById(this.stationId)
            if(res2.status != 200) {
              this.$store.dispatch('redirectError')
            }
            const changedData = res2.data
            this.co2_limit = changedData.co2_limit
            this.co2_reset = changedData.co2_reset
            this.station = [changedData]
            this.isFetching++
            this.errorMsg = null
          } catch(err) {
            console.log(err)
            this.errorMsg = "Couldn't update the limit"
        }
        }
      },
      async changeScale(){
        this.indexBack = Math.floor((this.indexBack*this.previousTimeScale)/this.timeScale)
        this.previousTimeScale = this.timeScale
        this.isFetching++
      },
      async changeInterval(){
        this.$refs.charts.changeInterval(this.refreshInterval)
      },
      async previousData(){
        this.indexBack++
        this.isFetching++
      },
      async nextData(){
        if(this.indexBack>0) this.indexBack--
        this.isFetching++
      }
  },
  data() {
    return {
      stationId: String,
      isFetching: 0,
      stationName: "",
      locationName: "",
      roomName: "",
      co2_limit: 1500,
      old_co2_limit: 1500,
      co2_reset: 1100,
      old_co2_reset: 1100,
      errorMsg: null,
      timeScale: 1,
      previousTimeScale: 1,
      refreshInterval: 1,
      station: [],
      indexBack: 0
    }
  },
  async created(){
    this.stationId = this.$route.params.id
    try {
      const res = await dataService.getStationsById(this.stationId)
      if(res.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const stationData = res.data
      this.stationName = stationData.name
      this.locationName = stationData.location
      this.roomName = stationData.roomNr
      this.co2_limit = stationData.co2_limit
      this.old_co2_limit = stationData.co2_limit
      this.co2_reset = stationData.co2_reset
      this.old_co2_reset = stationData.co2_reset
      this.station = [stationData]
      this.isFetching++
    } catch(err) {
      console.log(err)
      this.$store.dispatch('redirectError')
    }
}
}
</script>

<style scoped>
@import "../styles/room.css";
</style>