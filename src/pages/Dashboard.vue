<template>
  <h1>Dashboard</h1>
  <p>This is an Overview of all Stations</p>
  <div id="flexbox">
    <dashboard-field :stationIdProp='"Room 375"' :co2Prop='"1564"'/>
    <dashboard-field :stationIdProp='"Room 376"' :co2Prop='"453"'/>
    <dashboard-field :stationIdProp='"Room 377"' :co2Prop='"855"'/>
    <dashboard-field :stationIdProp='"Room 378"' :co2Prop='"855"'/>
    <dashboard-field :stationIdProp='"Room 379"' :co2Prop='"855"'/>

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
    }
  },
  async created(){
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