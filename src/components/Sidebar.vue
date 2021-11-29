<template>
    <div class="sidebar">
        <div class="element">
            <img src="../assets/logo.svg" alt="Logo">
        </div>
        <div class="element">
            Home
        </div>
        <div class="element">
            About
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scope>
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
}
</style>
