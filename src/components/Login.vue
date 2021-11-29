<template>
  <h1>Login</h1>
  <form>
    <div>
      <label>User: </label>
      <input type="text" name="username" placeholder="Username" />
    </div>
    <div>
      <label>Password: </label>
      <input type="password" name="password" placeholder="Password" />
    </div>
    <input type="submit" value="Login" />
  </form>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
