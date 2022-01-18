<template>
  <div id="station-edit-wrapper">
  <div class="shadow-box">
    <h1>Add Station</h1>
    <form id="add-station-form" @submit.prevent="onClick">
      <div class="form-floating mb-3">
        <input class="form-control" v-model="stationName" type="text" name="username" placeholder="Username" required/>
        <label class="form-floating mb-4">Station Name: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="stationLocation" type="text" name="email" placeholder="Email" required/>
        <label class="form-floating mb-4">Location: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="stationRoom" type="number" name="password" placeholder="Password" required/>
        <label class="form-floating mb-4">Room: </label>
      </div>
      <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
      <input class="custom-btn" type="submit" value="Create" />
    </form>
  </div>
  <div class="shadow-box">
  <h1>All Stations</h1>
    <div id="flexbox" v-if="!isFetching">
      <station @delete-station="deleteStation" @edit-station="editStation" :key="station.id" v-for="station in stations" 
      :stationName="station.name" :stationLocation="station.location" :stationRoom="station.roomNr" :stationId="station.id"/>
    </div>
  </div>
</div>
</template>

<script>
import dataService from '../services/dataService'
import station from '../components/Station'

  export default {
  name: 'AddStations',
  components: {
    station
  },
  methods: {
    async deleteStation(id) {
      try{
        const res = await dataService.deleteStation(id)
        if(res.status != 200 && res.status != 204 ) {
          this.$store.dispatch('redirectError')
          return
        }
        this.stations = this.stations.filter((station) => station.id != id)
      } catch {
        console.log(err)
        this.$store.dispatch('redirectError')
      }
    },
    async editStation(id) {
      this.$store.dispatch('redirectStationEdit', id)
    },
    async onClick(e) {
        try{
          const res = await dataService.createStation(this.stationName, this.stationLocation, this.stationRoom)
          if(res.status != 201) {
            this.msgColor = "red"
            this.successMsg = res.response.data.message
          } else {
            this.msgColor = "green"
            this.successMsg = "You Successfully created a new station with the ID:\n" + res.data.id
            this.stations.push(res.data)
            this.stationName = ''
            this.stationLocation = ''
            this.stationRoom = null
          }
        } catch(err){
          console.log(err)
          this.msgColor = "red"
          this.successMsg = "There was an error while creating the station"
        }
      e.target.reset()
      setTimeout(() => this.successMsg = null, 7000)
  }
  },
  data() {
    return {
      stationName: '',
      stationLocation: '',
      stationRoom: null,
      successMsg: null,
      msgColor: "green",
      stations: [],
      isFetching: true
    }
  },
  async created() {
    try{
      const res = await dataService.getStations()
      if(res.status != 200){
        this.$store.dispatch('redirectError')
      }
      this.stations = res.data.results
      this.isFetching = false
    } catch(err){
      console.log(err)
      this.$store.dispatch('redirectError')
    }
  }
}
</script>

<style scoped>
@import "../styles/addStation.css";
</style>