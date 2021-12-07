<template>
<div :style="{'background-color': calcColor}" class="dashboardComponent">
    <router-link class="dashboardComponentLink" v-bind:id="stationID" :to="`/room/${routeId}`" tag="div">
        <h2>{{name}}</h2>
        <h3>{{stationID}} / {{location}}</h3>
        <p>Current CO2 Level: {{ this.$store.state.dashboardValues[co2] }}</p>
    </router-link>
</div>
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

  },
  computed: {
    calcColor: function () {
      if (this.$store.state.dashboardValues[this.co2] == "noValues") return "#bbbbbb"
      if (this.$store.state.dashboardValues[this.co2] > 1500) return "#ff9187"
      if (this.$store.state.dashboardValues[this.co2] > 600) return "#fcffb3"
      return "#bbffb3"
    }
  },
  data() {
      return {
          co2: String,
          stationID: String,
          routeId: String,
          name: String,
          location: String
      }
  },
  async created() {
      this.co2 = this.co2Prop
      this.stationID = this.stationIdProp
      this.routeId = this.routeIdProp
      this.name = this.nameProp
      this.location = this.locationProp
}
};
</script>

<style scoped>
.dashboardComponent {
    padding: 5%;
    width: 18%;
    border: 2px solid #2c3e50;
    text-align: center;
    margin: 20px;
    background: chartreuse;
}
.dashboardComponentLink {
    color: #1a2815;
    text-decoration: none; 
}
</style>