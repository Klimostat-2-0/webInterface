<template>
  <h1>Request Password Reset</h1>
  <form @submit.prevent="onClick">
    <div>
      <label>Enter your email: </label>
      <input v-model="email" type="email" name="email" placeholder="example@gmail.com" />
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
      try {
        const res = await dataService.resetPassword(this.email)
        if(res.status != 204){
          this.msgColor = "red"
          this.error = "Sorry but we couldn't reset your password"
        } else {
          this.msgColor = "green"
          this.error = "We sent you an email with a link to reset your password"
        }
      }catch(err){
        console.log(err)
        this.msgColor = "red"
        this.error = "Sorry but we couldn't reset your password"
      }
      e.target.reset()
    }
  },
  data() {
    return {
      email: null,
      error: null,
      msgColor: "red"
    }
  },
  created() {
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
    width: 140px;
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
