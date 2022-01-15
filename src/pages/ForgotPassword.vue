<template>
  <h1>Request Password Reset</h1>
  <form class="box-form" @submit.prevent="onClick">

    <div class="form-floating mb-4">
      <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
      <label for="floatingInput">Enter your email:</label>
    </div>
    <p class="error" v-if="error != null" :style="{ color: msgColor}">{{this.error}}</p>
    <input class="custom-btn w-100" type="submit" value="Send Reset Link" />
  </form>
</template>

<script>
import dataService from '../services/dataService'

export default {
  name: "ResetPassword",
  methods: {
    async onClick(e) {
      try {
        const res = await dataService.forgotPassword(this.email)
        if(res.status != 204){
          this.msgColor = "red"
          this.error = "Sorry but we couldn't send you an email"
        } else {
          this.msgColor = "green"
          this.error = "We sent you an email with a link to reset your password"
        }
      }catch(err){
        console.log(err)
        this.msgColor = "red"
        this.error = "Sorry but we couldn't send you an email"
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
@import "../styles/forms.css";

</style>
