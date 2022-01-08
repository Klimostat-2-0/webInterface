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
      <input onkeydown="return false" step="100" v-model="co2_limit" min="300" max="3000" type="number" name="co2Limit" 
      :readonly="!this.$store.getters.getAdminAccess"/>
      <input v-on:click="changeLimit" class="changeButton" type="button" value="ChangeLimit" v-if="this.$store.getters.getAdminAccess"/>
      <p :style="{ color: 'red'}" class="userMsg" v-if="errorMsg != null">{{errorMsg}}</p>
      </div>
      <br>
      <label>Time Period: </label>
      <div class="formElement">
      <select v-model="timeScale" v-on:change="changeScale" name="times" id="times">
        <option value=1>Last Hour</option>
        <option value=2>Last 2 Hours</option>
        <option value=6>Last 6 Hours</option>
        <option value=12>Last 12 Hours </option>
        <option value=24>Last Day</option>
        <option value=48>Last 2 Days</option>
      </select>
      </div>
      <br>
      <label>Refresh interval: </label>
      <div class="formElement">
      <select v-model="refreshInterval" v-on:change="changeInterval" name="refreshIntervalls" id="refreshIntervalls">
        <option value=1>live</option>
        <option value=5>5min</option>
        <option value=10>10min</option>
        <option value=15>15min</option>
      </select>
      </div>
      <br>
      <br>
    </h4>
    <div :key="isFetching">
      <multi-chart-view :stationObj="station" :range="timeScale" ref="charts"/>
  </div>
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
        if(this.co2_limit != this.old_co2_limit){
          this.old_co2_limit = this.co2_limit
          try {
            const res = await dataService.setNewLimit(this.stationId, this.co2_limit, parseInt(this.co2_limit*0.7))
            if(res.status != 200) {
              this.errorMsg = "Couldn't update the limit"
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
        this.isFetching++
      },
      async changeInterval(){
        this.$refs.charts.changeInterval(this.refreshInterval)
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
      errorMsg: null,
      timeScale: 1,
      refreshInterval: 1,
      station: []
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