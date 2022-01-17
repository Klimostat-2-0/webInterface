<template>
<div class="station-box">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h3>{{stationName}}</h3>
            </div>
            <div class="col">
            Location: {{stationLocation}}
            <br>
            Room: {{stationRoom}}
            <br>
            ID: {{stationId}}
            </div>
            <div class="col-md-2">
                <div class="edit-icon user-list-icon" v-on:click="deleteStation">
                    <i :class="'fas fa-edit'" />
                </div>
                <div class="icon user-list-icon" v-on:click="editStation">
                    <i :class="'fas fa-trash-alt'" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default ({
    methods: {
        deleteStation(){
            if (confirm("Are you sure?")) {
                this.$emit('delete-station', this.stationId)
            }
            
        },
        editStation(){
            this.$emit('edit-station', this.stationId)
        }
    },
    props: {
      stationName: {
          type: String,
          default: "None"
      },
      stationLocation: {
          type: String,
          default: "None"
      },
      stationRoom: {
          type: Number,
          default: -1
      },
      stationId: {
          type: String
      }
    },
})
</script>

<style scoped>
@import "../styles/station.css";
</style>
