<template>
  <h1>Dashboard</h1>
  <p>This is an Overview of all Stations</p>
  <div id="dashboard-search-bar">
    <div class="input-group">
      <input v-model="searchTerm" type="text" class="form-control" 
      aria-label="Search" placeholder="Search..." 
      v-on:keyup="searchDashboard">
      <span class="input-group-text">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
  <div id="flexbox" :key="isFetching">
    <dashboard-field v-for="station in stationSearches" :key="station.id" 
    :routeIdProp="station[3]" :stationIdProp='"Room" + station[2]' :co2Prop='station[4]' :nameProp='station[0]' 
    :locationProp='station[1]'  :co2LimitProp='station[5]' :co2ResetProp='station[6]'/>
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
    searchDashboard() {
      this.stationSearches = this.stations.filter((station) => station[0].toLowerCase()
      .includes(this.searchTerm.toLowerCase()))
      this.isFetching++
    },
    async requestDataUpdate(element) {
      try{
        const res2 = await dataService.requestDataUpdateDashboard(element.id)
        if(res2.status != 200) {
          this.$store.dispatch('redirectError')
          return
        }
        const co2Data = res2.data
        let currentCO2 = "noValues"
        if(co2Data.results.length > 0) {
          currentCO2 = co2Data.results[0].co2.toString()
        }
        return currentCO2
      } catch(err){
        console.log(err)
        this.$store.dispatch('redirectError')
      }
    }
  },
  data() {
    return {
      stations: [],
      stationSearches: [],
      isFetching: 0,
      intervalls: [],
      searchTerm: ''
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
      index.toString(), element.co2_limit, element.co2_reset])
      this.stationSearches = this.stations
      let that = this
      const constIndex = index
      this.intervalls.push(setInterval(async function(idx = constIndex){
        const resultCO2 = await that.requestDataUpdate(element)
        that.$store.commit("updateDashboard", [idx, resultCO2])
      }, 5000))
      index++
      }
      this.isFetching++
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

#dashboard-search-bar{
  width: 400px;
  display: inline-block;
}
</style>