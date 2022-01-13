<template>
  <Sidebarnew />
</template>

<script>
  import Footer from './components/Footer.vue'
  import Sidebar from './components/Sidebar.vue'
  import Sidebarnew from './components/Sidebarnew.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Sidebar,
    Sidebarnew
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
