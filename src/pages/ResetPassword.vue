<template>
  <h1>Reset Password</h1>
  <form @submit.prevent="onClick">
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
h1{
    margin-bottom: 50px;
}
div {
    margin-top: 10px;
    margin-bottom: 10px;
}
.resetButton {
  background-color: #1a2815;
  border: none;
  color: #dbff78;
  padding: 5px 20px;
  display: inline-block;
  font-size: 16px;
  margin-top: 30px;
}
label {
    display: inline-block;
    width: 180px;
    text-align: right;
    margin-right: 20px;
}
.error {
  font-size: 14px;
  color: red;
}
a {
  color:#1a2815
}
</style>
