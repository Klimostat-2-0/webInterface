<template>
<div id="station-detail-wrapper">
  <div class="shadow-box">
    <h1>Edit Station {{ stationName }}</h1>
    <p>Station ID: {{ stationId }}</p>
    <form id="edit-station-form" @submit.prevent="onClick">
      <div class="form-floating mb-3">
        <input class="form-control" v-model="stationName" type="text" name="name" placeholder="name" required/>
        <label class="form-floating mb-4">Name: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="stationLocation" type="text" name="location" placeholder="location" required/>
        <label class="form-floating mb-4">Location: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="roomNr" type="number" name="roomNr" placeholder="roomNr" required/>
        <label class="form-floating mb-4">Room: </label>
      </div>
      <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
      <input class="custom-btn" type="submit" value="Apply" />
    </form>
  </div>
</div>
</template>

<script>
import dataService from '../services/dataService'
  export default {

  name: 'Edit User',
  components: {
    
  },
  methods: {
    async onClick(e) {
      try{
        const res = await dataService.patchStation(this.stationId, this.stationName, this.stationLocation, this.roomNr)
        if(res.status != 200) {
          this.msgColor="red"
          this.successMsg="There was an error while updating the station"
          return
        }
        this.msgColor="green"
        this.successMsg="You successfully updated the station"
      } catch(err) {
        console.log(err)
        this.$store.dispatch('redirectError')
      }
    }
  },
  data() {
    return {
      stationId: '',
      stationName: '',
      stationLocation: '',
      roomNr: null,
      successMsg: null,
      msgColor: "green"
    }
  },
  async created() {
      this.stationId = this.$route.params.id
      try{
        const res = await dataService.getStationsById(this.stationId)
        if(res.status != 200) {
          this.$store.dispatch('redirectError')
          return
        }
        this.stationName = res.data.name
        this.stationLocation = res.data.location
        this.roomNr = res.data.roomNr
      } catch(err){
        console.log(err)
        this.$store.dispatch('redirectError')
      }
  }
}
</script>

<style scoped>
@import "../styles/editStation.css";
</style>