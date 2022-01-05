<template>
  <h1>Dashboard</h1>
  <p>This is an Overview of all Stations</p>
  <div id="flexbox" v-if="!isFetching">
    <dashboard-field v-for="station in stations" :key="station.id" 
    :routeIdProp="station[3]" :stationIdProp='"Room" + station[2]' :co2Prop='station[4]' :nameProp='station[0]' 
    :locationProp='station[1]'/>
  </div>
</template>

<script>
  import DashboardField from '../components/DashboardField'
  import dataService from '../services/dataService'
  export default {

  name: 'Dashboard',
  components: {
    DashboardField
  },
  methods: {
    async requestDataUpdate(element) {
      const res2 = await dataService.requestDataUpdateDashboard(element.id)
      if(res2.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const co2Data = res2.data
      let currentCO2 = "noValues"
      if(co2Data.results.length > 0) {
        currentCO2 = co2Data.results[0].co2.toString()
      }
      return currentCO2
    }
  },
  data() {
    return {
      stations: [],
      isFetching: true,
      intervalls: []
    }
  },
  async created(){
    try {
      const res = await dataService.getStations()
      if(res.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const stationData = res.data
      let index = 0
      for (const element of stationData.results) {
      this.$store.commit("updateDashboard", [index, await this.requestDataUpdate(element)])
      this.stations.push([element.name, element.location, element.roomNr, element.id, 
      index.toString()])
      let that = this
      const constIndex = index
      this.intervalls.push(setInterval(async function(idx = constIndex){
        const resultCO2 = await that.requestDataUpdate(element)
        that.$store.commit("updateDashboard", [idx, resultCO2])
      }, 5000))
      index++
      }
      this.isFetching = false
    } catch(err) {
      this.$store.dispatch('redirectError')
    }
  },
  beforeUnmount() {
    for(const element of this.intervalls){
      clearInterval(element)
    }
  }
}
</script>

<style scoped>
#flexbox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>