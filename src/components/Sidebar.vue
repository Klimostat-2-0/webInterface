<template>
    <div class="sidebar">
        <div class="element">
            <img src="../assets/logo.svg" alt="Logo">
        </div>
        <router-link class="element" to="/" tag="div">Login</router-link>
        <router-link class="element" to="/about" tag="div">About</router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.sidebar {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border-right: 2px solid #2c3e50;
  background: white;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width:150px;
}
.element {
    padding: 5%;
    width:auto;
    border-bottom: 2px solid #2c3e50;
    color: #1a2815;
    text-decoration: none;
}

.element:hover {
    background: rgb(211, 255, 211);
}
</style>
