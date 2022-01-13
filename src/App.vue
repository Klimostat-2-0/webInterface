<template>
  <MainComponent />
</template>

<script>
  import MainComponent from './components/MainComponent.vue'

export default {
  name: 'App',
  components: {
    MainComponent
  },
  data() {
    return {
      userKey: String
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#mainview {
  margin-left: 150px;
  margin-bottom: 100px;
}

</style>
