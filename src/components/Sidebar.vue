<template>
    <div class="sidebar">
        <div class="element">
            <img src="../assets/logo.svg" alt="Logo">
        </div>
        <router-link v-if="!this.$store.state.loggedIn" class="element linkHighlight" to="/" tag="div">Login</router-link>
        <router-link class="element linkHighlight" to="/about" tag="div">About</router-link>
        <router-link v-if="this.$store.state.loggedIn" class="element linkHighlight" to="/Room" tag="div">Rooms</router-link>
        <router-link v-if="this.$store.state.loggedIn" class="element linkHighlight" to="/about" tag="div">Add Account</router-link>
        <router-link @click="logOut" v-if="this.$store.state.loggedIn" class="element linkHighlight" to="/" tag="div">Logout</router-link>
    </div>
</template>

<script>
export default {
    methods: {
        logOut(e) {
            this.$store.dispatch('logout')
        }
    }
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

.linkHighlight:hover {
    background: #cecece;
}
</style>
