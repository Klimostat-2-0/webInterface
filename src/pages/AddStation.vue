<template>
  <div id="station-edit-wrapper">
  <div class="shadow-box">
    <h1>Add Station</h1>
    <form id="add-station-form" @submit.prevent="onClick">
      <div class="form-floating mb-3">
        <input class="form-control" v-model="username" type="text" name="username" placeholder="Username" required/>
        <label class="form-floating mb-4">Station Name: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="email" type="text" name="email" placeholder="Email" required/>
        <label class="form-floating mb-4">Location: </label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" v-model="password" type="number" name="password" placeholder="Password" required/>
        <label class="form-floating mb-4">Room: </label>
      </div>
      <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
      <input class="custom-btn" type="submit" value="Create" />
    </form>
  </div>
  <div class="shadow-box">
  <h1>All Stations</h1>
    
  </div>
</div>
</template>

<script>
  export default {

  name: 'AddStations',
  components: {
    
  },
  methods: {
   
  },
  data() {
    return {
      
    }
  },
  async created() {
    
  }
}
</script>

<style scoped>
@import "../styles/addStation.css";
</style>