<template>
    <div class="shadow-box">
        <h1>Data History</h1>
        <p>Here you can download the entiere dataset of Klimostat2.0</p>
        <br>
        <h3>Download measurements</h3>
        <p>Download all the measurements that have ever been collected</p>
        <button v-on:click="startMeasurementDownload" class="custom-btn w-50 mb-4" type="button" 
        :disabled="mDownloadActive">
            <span v-if="mDownloadActive" class="spinner-border spinner-border-sm" 
            role="status" aria-hidden="true"></span>
            <span v-if="mDownloadActive"> Downloading...</span>
            <span v-if="!mDownloadActive">Download now</span>
        </button>
        <br>
        <br>

        <h3>Download stations</h3>
        <p>Download all stations that are registered</p>
        <button v-on:click="startStationDownload" class="custom-btn w-50 mb-4" type="button"
        :disabled="sDownloadActive">
            <span v-if="sDownloadActive" class="spinner-border spinner-border-sm" 
            role="status" aria-hidden="true"></span>
            <span v-if="sDownloadActive"> Downloading...</span>
            <span v-if="!sDownloadActive">Download now</span>
        </button>
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
      sDownloadActive: false
    }
  },
  methods: {
      async startMeasurementDownload() {
          this.mDownloadActive = true
          this.mButtonText = "Downloading..."
          const res = await dataService.downloadMeasurements()
          let blob = new Blob([JSON.stringify(res.data)], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, "measurements.json")
          this.mButtonText = "Download now"
          this.mDownloadActive = false
      },
      async startStationDownload() {
          this.sDownloadActive = true
          this.sButtonText = "Downloading..."
          const res = await dataService.downloadStations()
          let blob = new Blob([JSON.stringify(res.data)], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, "stations.json")
          this.sButtonText = "Download now"
          this.sDownloadActive = false
      }
  }
}
</script>

<style scoped>
@import "../styles/main.css";

</style>