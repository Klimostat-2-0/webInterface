<template>
  <h1 v-if="this.success">Thank you for verifying your email!</h1>
  <h1 v-if="this.failed">Sorry but we couldn't verify your email!</h1>
</template>

<script>
  import dataService from '../services/dataService'
  export default {
  name: 'VerifyEmail',
  components: {
  },
  data() {
    return {
      success: false,
      failed: false
    }
  },
  async created(){
    console.log(this.$store.getters.getAdminAccess)
    try{
      const token = new URLSearchParams(window.location.search).get('token')
      const res = await dataService.verifyEmail(token)
      this.success = true
    }catch(err){
      console.log(err)
      this.failed = true
    }
}
}
</script>