<template>
    <div class="shadow-box">
        <h1>Data History</h1>
        <p>Here you can download the entiere dataset of Klimostat2.0</p>
        <br>
        <h3>Download measurements</h3>
        <p>Download all the measurements that have ever been collected</p>
        <input v-on:click="startMeasurementDownload" class="custom-btn w-50 mb-4" type="button" :value="mButtonText" 
        :disabled="mDownloadActive"/>

        <br>
        <br>

        <h3>Download stations</h3>
        <p>Download all stations that are registered</p>
        <input v-on:click="startStationDownload" class="custom-btn w-50 mb-4" type="button" value="Download now" 
        :disabled="sDownloadActive"/>
    </div>
</template>

<script>
  import dataService from '../services/dataService'
  import { saveAs } from 'file-saver';
  export default {
  name: 'DataHistory',
  components: {
  },
  data() {
    return {
      mDownloadActive: false,
      sDownloadActive: false,
      mButtonText: "Download now",
      sButtonText: "Download now"
    }
  },
  methods: {
      async startMeasurementDownload() {
          this.mDownloadActive = true
          this.mButtonText = "Downloading..."
          const res = await dataService.downloadMeasurements()
          let blob = new Blob([JSON.stringify(res)], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, "measurements.txt")
          this.mButtonText = "Download now"
          this.mDownloadActive = false
      },
      async startStationDownload() {
          this.sDownloadActive = true
          this.sButtonText = "Downloading..."
          const res = await dataService.downloadStations()
          let blob = new Blob([JSON.stringify(res)], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, "stations.txt")
          this.sButtonText = "Download now"
          this.sDownloadActive = false
      }
  }
}
</script>

<style scoped>
@import "../styles/main.css";

</style>