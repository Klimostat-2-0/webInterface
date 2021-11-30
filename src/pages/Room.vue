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
      console.log(this.$store.state.tokens)
      console.log(btoa(this.$store.state.tokens))
          let res = await fetch(process.env.VUE_APP_BASEURL + 'measurement', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer '+ this.$store.state.tokens, 
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          console.log(await res.json())
      }
}
</script>

<style scoped>
p {
    width: 70%;
    display: inline-block;
}
</style>