<template>
  <Sidebar />
  <div id="mainview">
    <router-view>
    </router-view>
  </div>
  <Footer />
</template>

<script>
  import Footer from './components/Footer.vue'
  import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Sidebar
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
