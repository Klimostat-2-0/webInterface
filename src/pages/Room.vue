<template>
  <h1>Room</h1>
  <div>
    <h2>CO2</h2>
    <chart-component :chartTitle='"ppm"' :chartData="co2" v-if="!isFetching" ref="co2"/>
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
      stationId: String,
      isFetching: true,
      intervalls: []
    }
  },
  async created(){
    this.stationId = this.$route.params.id
    try {
      const res = await fetch(process.env.VUE_APP_BASEURL + 'measurement?station=' 
      + this.stationId + "&sortBy=timestamp%3Adesc&limit=100&page=1", {
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
      let modDate = /\d{4}-(\d{2}-\d{2})T(\d{2}:\d{2}):\d{2}.*/
      for (const element of chartData.results) {
        let date = modDate.exec(element.timestamp)
        let foramted = date[1] + " " + date[2]
        this.co2.push([foramted, element.co2])
        this.temp.push([foramted, element.temperature])
        this.humidity.push([foramted, element.humidity])
      }
      this.isFetching = false
    } catch(err) {
      console.log(err)
      this.$store.dispatch('redirectError')
    }

    let that = this
    this.intervalls.push(setInterval(function(){
      that.$refs.co2.updateData(Math.floor(Math.random()*1000));
    }, 1000))
},
  beforeUnmount() {
    for(const element of this.intervalls){
      clearInterval(element)
    }
  }
}
</script>

<style scoped>

</style>