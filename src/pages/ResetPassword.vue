<template>
  <h1>Reset Password</h1>
  <form class="box-form" @submit.prevent="onClick">
    <div class="form-floating mb-4">
      <input v-model="password" type="password" name="passwd" class="form-control" id="floatingInput"
       placeholder="new password" />
      <label for="floatingInput">Enter new password: </label>
    </div>
    <div class="form-floating mb-4">
      <input v-model="repeatPassword" type="password" class="form-control" id="floatingInputTwo" 
      name="passwd" placeholder="repeat password" />
      <label for="floatingInputTwo">Repeat new password: </label>
    </div>
    <p class="error" v-if="error != null" :style="{ color: msgColor}">{{this.error}}</p>
    <input class="custom-btn w-100" type="submit" value="Reset Password" />
  </form>
</template>

<script>
import dataService from '../services/dataService'

export default {
  name: "ResetPassword",
  methods: {
    async onClick(e) {
      this.msgColor = "red"
      if(this.password != this.repeatPassword){
        this.error = "The passwords don't match"
        return
      }
      if(this.password.length < 8 || !/\d/.test(this.password) || !/\w/.test(this.password)){
        this.error = "Please pick a stronger password"
        return
      }
      try {
        const res = await dataService.resetPassword(this.token, this.password)
        if(res.status != 204){
          this.error = "Sorry but we couldn't reset your password"
        } else {
          this.msgColor = "green"
          this.error = "We updated your password"
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.$store.dispatch("redirectLogin")
        }
      }catch(err){
        console.log(err)
        this.error = "Sorry but we couldn't reset your password"
      }
      e.target.reset()
    }
  },
  data() {
    return {
      password: null,
      repeatPassword: null,
      error: null,
      msgColor: "red",
      token: null
    }
  },
  created() {
      this.token = new URLSearchParams(window.location.search).get('token')
  }
};
</script>

<style scoped>
@import "../styles/forms.css";

</style>
