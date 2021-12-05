<template>
  <h1>Login</h1>
  <form @submit.prevent="onClick">
    <div>
      <label>Email: </label>
      <input v-model="username" type="text" name="username" placeholder="Username" />
    </div>
    <div>
      <label>Passwort: </label>
      <input v-model="password" type="password" name="password" placeholder="Password" />
    </div>
    <p class="error" v-if="this.$store.state.showLoginError != null">{{this.$store.state.showLoginError}}</p>
    <input class="loginbutton" type="submit" value="Login" />
  </form>
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
h1{
    margin-bottom: 50px;
}
div {
    margin-top: 10px;
    margin-bottom: 10px;
}
.loginbutton {
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
</style>
