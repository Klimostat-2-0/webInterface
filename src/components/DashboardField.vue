<template>
<router-link class="dashboardComponentLink" v-bind:id="stationID" :to="`/room/${routeId}`" tag="span">
<div :style="{'background-color': calcColor}" class="dashboardComponent">
    
        <h2>{{name}}</h2>
        <h3>{{stationID}} / {{location}}</h3>
        <br>
        <p>Current CO2 Level: {{ this.$store.state.dashboardValues[co2] }}</p>
    
</div>
</router-link>
</template>

<script>
export default {
  props: {
      nameProp: {
          type: String,
          default: "StationX"
      },
      locationProp: {
          type: String,
          default: "HTL Rennweg"
      },
      co2Prop: {
          type: String,
      },stationIdProp: {
          type: String,
      },routeIdProp: {
          type: String,
      },
      co2LimitProp: {
          type: Number,
      },
      co2ResetProp: {
          type: Number,
      },

  },
  computed: {
    calcColor: function () {
      if (this.$store.state.dashboardValues[this.co2] == "noValues") return "rgba(70, 70, 70, 0.5)"
      if (this.$store.state.dashboardValues[this.co2] > this.co2Limit) return "rgba(255, 89, 89, 0.6)"
      if (this.$store.state.dashboardValues[this.co2] > this.co2Reset) return "rgba(250, 207, 90, 0.6)"
      return "rgb(73, 190, 182, 0.6)"
    }
  },
  data() {
      return {
          co2: String,
          stationID: String,
          routeId: String,
          name: String,
          location: String,
          co2Limit: Number,
          co2Reset: Number
      }
  },
  async created() {
      this.co2 = this.co2Prop
      this.stationID = this.stationIdProp
      this.routeId = this.routeIdProp
      this.name = this.nameProp
      this.location = this.locationProp
      this.co2Limit = this.co2LimitProp
      this.co2Reset = this.co2ResetProp
}
};
</script>

<style scoped>
    @import "../styles/DashboardField.css";
</style>