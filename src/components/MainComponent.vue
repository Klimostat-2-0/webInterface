<template>
<div class="wrapper">
  <nav id="sidebar" v-bind:class = "(toggle)?'show':'hide'">
      <div class="sidebar-header">
          <h3>Klimostat</h3>
          <div id="dismiss" v-bind:class = "(toggle)?'rotated':''" @click='toggle = !toggle'>
            <i class="fas fa-arrow-left"></i>
          </div>
      </div>
      <ul class="list-unstyled components">
          <li v-if="!this.$store.state.loggedIn" >
              <router-link  class="sidebarelement" to="/" tag="div">
                <i class="icon" :class="'fas fa-sign-in-alt'" />
                <span class="sidebar-text">Login</span>
              </router-link>
          </li>
          <li v-if="this.$store.state.loggedIn">
              <router-link class="sidebarelement" to="/Dashboard" tag="div">
              <i class="icon" :class="'fas fa-columns'" />
              <span class="sidebar-text">Dashboard</span>
              </router-link>
          </li>
          <li v-if="this.$store.state.loggedIn">
              <router-link class="sidebarelement" to="/compare" tag="div">
              <i class="icon" :class="'fas fa-exchange-alt'" />
              <span class="sidebar-text">Compare</span>
              </router-link>
          </li>
          <li v-if="this.$store.state.loggedIn">
              <router-link class="sidebarelement" to="/history" tag="div">
              <i class="icon" :class="'fas fa-history'" />
              <span class="sidebar-text">History</span>
              </router-link>
          </li>
          <li v-if="this.$store.getters.getAdminAccess">
              <router-link class="sidebarelement" to="/adduser" tag="div">
              <i class="icon" :class="'fas fa-user-alt'" />
              <span class="sidebar-text">Edit Users</span>
              </router-link>
          </li>
          <li>
              <router-link class="sidebarelement" to="/about" tag="div">
              <i class="icon" :class="'fas fa-info'" />
              <span class="sidebar-text">About</span>
              </router-link>
          </li>
          <li v-if="this.$store.state.loggedIn">
              <router-link @click="logOut" class="sidebarelement" to="/" tag="div">
              <i class="icon" :class="'fas fa-sign-out-alt'" />
              <span class="sidebar-text">Logout</span>
              </router-link>
          </li>
      </ul>
  </nav>

  <div id="content" v-bind:class = "(toggle)?'collapsed':'extended'">
      <nav class="navbar d-md-none navbar-light bg-light">
          <div class="container-fluid">
              <button type="button" id="sidebarCollapse" class="btn" @click='toggle = !toggle'>
                    <i class="icon" :class="'fas fa-bars'" />
              </button>
          </div>
      </nav>

      <div class="contentOffset">
        <router-view>
        </router-view>
      </div>

      <footer class="container-fluid custom-footer">
        <div class="row footer-indent">
            <div class="col">Klimostat 2.0</div>
            <div class="col">Copyright &copy; 2021</div>
            <a class="col" href="https://klimostat.at/login.html">Website</a>
        </div>
        <p></p>
    </footer>
  </div>
</div>

</template>
<script>

export default {
  name: 'MainComponent',
  components: {
  },
  data(){
  return {
     toggle: document.documentElement.clientWidth < 768
  }
  },
  methods: {
        logOut(e) {
            this.$store.dispatch('logout')
        }
    },
    computed: {
        checkAdminRights: function() {
            let allowed = (this.$store.state.loggedIn && this.$store.state.isAdmin)
            return allowed
        }
    }
  }
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "../styles/sidebar.css";
</style>
