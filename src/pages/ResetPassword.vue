<template>
  <h1>Reset Password</h1>
  <form class="box-form" @submit.prevent="onClick">
    <div>
      <label>Enter new password: </label>
      <input v-model="password" type="password" name="passwd" placeholder="new password" />
    </div>
    <div>
      <label>Repeat new password: </label>
      <input v-model="repeatPassword" type="password" name="passwd" placeholder="repeat password" />
    </div>
    <p class="error" v-if="error != null" :style="{ color: msgColor}">{{this.error}}</p>
    <input class="resetButton" type="submit" value="Reset Password" />
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
