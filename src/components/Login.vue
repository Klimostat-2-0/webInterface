<template>
  <h1>Login</h1>
  <form>
    <div>
      <label>Email: </label>
      <input type="text" name="username" placeholder="Username" />
    </div>
    <div>
      <label>Passwort: </label>
      <input type="password" name="password" placeholder="Password" />
    </div>
    <input class="loginbutton" type="submit" value="Login" />
  </form>
</template>

<script>
export default {
  name: "Login",
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
</style>
