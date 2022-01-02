<template>
  <h1>Room</h1>
  <div>
    <h2>CO2</h2>
    <chart-component :chartTitle='"ppm"' :chartData="co2" v-if="!isFetching" ref="co2"/>
    <hr>
    <h2>Temperatur</h2>
    <chart-component :chartTitle='"Grad"' :chartData="temp" v-if="!isFetching" ref="temp"/>
    <hr>
    <h2>Luftfeuchtigkeit</h2>
    <chart-component :chartTitle='"Prozent"' :chartData="humidity" v-if="!isFetching" ref="hum"/>
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
      async updateData(){
        try {
          const that = this
          let getString = 'measurement?station=' 
          + this.stationId + "&sortBy=timestamp%3Adesc&limit=100&page=1&" + new URLSearchParams({
            fromTimestamp: that.lastTimeStamp,
          })
          const res = await fetch(process.env.VUE_APP_BASEURL + getString, {
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
          let updateCo2 = []
          let updateTemp = []
          let humidity = []
          for (const element of chartData.results) {
            let date = new Date(element.timestamp)
            let foramted = date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth()+1) + "-" + date.getDate()
            updateCo2.push([foramted, element.co2])
            updateTemp.push([foramted, element.temperature])
            humidity.push([foramted, element.humidity])
            this.lastTimeStamp = element.timestamp.toString()
          }
          if(updateCo2.length > 0) {
            that.$refs.co2.updateData(updateCo2.reverse());
            that.$refs.temp.updateData(updateTemp.reverse());
            that.$refs.hum.updateData(humidity);
          }
        } catch(err) {
          console.log(err)
          this.$store.dispatch('redirectError')
        }
      }
  },
  data() {
    return {
      co2: [],
      temp: [],
      humidity: [],
      stationId: String,
      isFetching: true,
      intervalls: [],
      lastTimeStamp: ""
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
      for (const element of chartData.results) {
        let date = new Date(element.timestamp)
        let foramted = date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth()+1) + "-" + date.getDate()
        this.co2.push([foramted, element.co2])
        this.temp.push([foramted, element.temperature])
        this.humidity.push([foramted, element.humidity])
        if (this.lastTimeStamp == "") {
          this.lastTimeStamp = element.timestamp.toString()
        }
      }
      this.isFetching = false
    } catch(err) {
      console.log(err)
      this.$store.dispatch('redirectError')
    }
    this.intervalls.push(setInterval(this.updateData, 10000))
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