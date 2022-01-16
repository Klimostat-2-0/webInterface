<template>
    <div class="shadow-box">
        <h1>Data History</h1>
        <p>Here you can download the entiere dataset of Klimostat2.0</p>
        <br>
        <input v-on:click="startDownload" class="custom-btn w-50 mb-4" type="button" value="Download now" />
    </div>
</template>

<script>
  import dataService from '../services/dataService'
  export default {
  name: 'DataHistory',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
      startDownload() {
          console.log("Downloading now")
      }
  }
}
</script>

<style scoped>
@import "../styles/main.css";

</style>