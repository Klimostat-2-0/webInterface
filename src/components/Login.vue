<template>
<div id="wrapLogin">
  <h1 class="mb-5">Welcome to Klimostat 2.0</h1>
  <form id="login-form" class="needs-validation" @submit.prevent="onClick">
    <img src="../assets/logo.svg" alt="Logo" class="mb-4">
    <div class="form-floating mb-4">
      <input v-model="username" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating mb-4">
      <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
      <label for="floatingPassword">Password</label>
    </div>
    <p class="error" v-if="this.$store.state.showLoginError != null">{{this.$store.state.showLoginError}}</p>
    <input class="custom-btn w-100 mb-4" type="submit" value="Login" />
    <div>
    <router-link id="forgotPasswordLink" to="/forgotPassword">Forgot password?</router-link>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    onClick(e) {
      this.$store.dispatch('login', JSON.stringify({"email": this.username, "password": this.password}))
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    if(localStorage.getItem("loggedIn")) {
      this.$store.dispatch('redirectAlreadyLoggedIn')
    }
  }
};
</script>

<style scoped>
@import "../styles/login.css";
</style>
