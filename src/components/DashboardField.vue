<template>
<div :style="{'background-color': calcColor}" class="dashboardComponent">
    <router-link class="dashboardComponentLink" v-bind:id="stationID" to="/" tag="div">
        <h2>{{stationID}}</h2>
        <p>Current CO2 Level: {{ co2 }}</p>
    </router-link>
</div>
</template>

<script>
export default {
  props: {
      co2Prop: {
          type: String,
      },stationIdProp: {
          type: String,
      },
  },
  computed: {
    calcColor: function () {
      if (this.co2 > 1500) return "#ff9187"
      if (this.co2 > 800) return "#fcffb3"
      return "#bbffb3"
    }
  },
  data() {
      return {
          co2: String,
          stationID: String
      }
  },
  async created() {
      this.co2 = this.co2Prop
      this.stationID = this.stationIdProp
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