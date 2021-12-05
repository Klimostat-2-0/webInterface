<template>
  <h1>Room</h1>
  <div>
    <h2>CO2</h2>
    <chart-component :chartTitle='"ppm"' :chartData="co2" v-if="!isFetching"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :chartTitle='"Grad"' :chartData="temp" v-if="!isFetching"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :chartTitle='"Prozent"' :chartData="humidity" v-if="!isFetching"/>
  </div>
</template>

<script>
  import ChartComponent from '../components/ChartComponent'

  export default {
  name: 'Room',
  components: {
    ChartComponent
  },
  methods: {
      
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      isFetching: true
    }
  },
  async created(){
    try {
      const res = await fetch(process.env.VUE_APP_BASEURL + 'measurement', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.tokens, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      if(res.status != 200) {
        this.$store.dispatch('redirectError')
      }
      const chartData = await res.json()
      for (const element of chartData.results) {
        let date = element.timestamp
        this.co2.push([date, element.co2])
        this.temp.push([date, element.temperature])
        this.humidity.push([date, element.humidity])
      }
      this.isFetching = false
    } catch(err) {
      this.$store.dispatch('redirectError')
    }
}
}
</script>

<style scoped>

</style>