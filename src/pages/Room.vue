<template>
  <h1>Room</h1>
  <div>
    <h2>CO2</h2>
      <chart-component :name="co2Diagramm" :chartData="co2" />
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
      humidity: []
    }
  },
  async created(){
    try {
      let res = await fetch(process.env.VUE_APP_BASEURL + 'measurement', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.tokens, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      let data = await res.json()
      for (const element of data.results) {
        let date = element.timestamp
        this.co2.push([date, element.co2])
        this.temp.push([date, element.temperature])
        this.humidity.push([date, element.humidity])
      }
    } catch(err) {
      this.$store.dispatch('redirectError')
    }
}
}
</script>

<style scoped>
p {
    width: 70%;
    display: inline-block;
}
</style>