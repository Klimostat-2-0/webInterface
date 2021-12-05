<template>
  <h1>Dashboard</h1>
  <p>This is an Overview of all Stations</p>
  <div id="flexbox" v-if="!isFetching">
    <dashboard-field v-for="station in stations" :key="station.id" 
    :routeIdProp="station[3]" :stationIdProp='"Room" + station[2]' :co2Prop='station[4]'/>
  </div>
</template>

<script>
  import DashboardField from '../components/DashboardField'
  export default {

  name: 'Dashboard',
  components: {
    DashboardField
  },
  methods: {
      
  },
  data() {
    return {
      stations: [],
      isFetching: true
    }
  },
  async created(){
    try {
      const res = await fetch(process.env.VUE_APP_BASEURL + 'station', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.tokens, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      if(res.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const stationData = await res.json()
      for (const element of stationData.results) {
        const res2 = await fetch(process.env.VUE_APP_BASEURL + 'measurement?station=' + element.id + '&sortBy=desc&limit=1&page=1', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.tokens, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
      if(res2.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const co2Data = await res2.json()
      let currentCO2 = "noValues"
      if(co2Data.results.length > 0) {
        currentCO2 = co2Data.results[0].co2.toString()
      }
        this.stations.push([element.name, element.location, element.roomNr, element.id, currentCO2])
      }
      this.isFetching = false
    } catch(err) {
      this.$store.dispatch('redirectError')
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