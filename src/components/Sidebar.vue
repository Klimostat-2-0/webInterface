<template>
    <div class="sidebar">
        <div class="element">
            <img src="../assets/logo.svg" alt="Logo">
        </div>
        
        <router-link v-if="!this.$store.state.loggedIn" class="element linkHighlight" to="/" tag="div">
        <i class="icon" :class="'fas fa-sign-in-alt'" />
        Login
        </router-link>
        <router-link v-if="this.$store.state.loggedIn" class="element linkHighlight" to="/Dashboard" tag="div">
        <i class="icon" :class="'fas fa-columns'" />
        Dashboard
        </router-link>
        <router-link v-if="this.$store.getters.getAdminAccess" class="element linkHighlight" to="/adduser" tag="div">
        <i class="icon" :class="'fas fa-user-alt'" />
        Edit Users
        </router-link>
        <router-link class="element linkHighlight" to="/about" tag="div">
        <i class="icon" :class="'fas fa-info'" />
        About
        </router-link>
        <router-link @click="logOut" v-if="this.$store.state.loggedIn" class="element linkHighlight" to="/" tag="div">
        <i class="icon" :class="'fas fa-sign-out-alt'" />
        Logout
        </router-link>
    </div>
</template>

<script>
export default {
    methods: {
        logOut(e) {
            this.$store.dispatch('logout')
        }
    },
    computed: {
        checkAdminRights: function() {
            let allowed = (this.$store.state.loggedIn && this.$store.state.isAdmin)
            console.log("Perm: " + allowed)
            return allowed
        }
    }
}
</script>

<style scoped>
.icon {
    display: inline-block;
    width: 30px;
}
.sidebar {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #1a2815;
  border-right: 2px solid #2c3e50;
  background: rgb(255, 255, 255);

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
    margin: 4px;
    border-radius: 10px;
    width:auto;

    color: #1a2815;
    text-decoration: none;
}

.linkHighlight:hover {
    background: rgba(20, 20, 20, 0.3);
}
</style>
