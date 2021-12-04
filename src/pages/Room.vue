<template>
    <div>
        <h1>Room</h1>
    </div>
</template>

<script>

  export default {
  name: 'Room',
  components: {
  },
  methods: {
      
  },
  async created(){
    try {
      let res = await fetch(process.env.VUE_APP_BASEURL + 'measurement', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ this.$store.state.tokens, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      let data = await res.json()
      console.log(data)
    } catch(err) {
      this.$store.dispatch('redirectError')
    }
}
}
</script>

<style scoped>
p {
    width: 70%;
    display: inline-block;
}
</style>