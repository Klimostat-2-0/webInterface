<template>
  <Login />
  <Footer />
</template>

<script>
  import Login from './components/Login.vue'
  import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Login,
    Footer
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
</style>
