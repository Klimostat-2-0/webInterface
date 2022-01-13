<template>
<div class="wrapper">
  <nav id="sidebar" v-bind:class = "(toggle)?'show':'hide'">
      <div id="dismiss" v-bind:class = "(toggle)?'rotated':''" @click='toggle = !toggle'>
          <i class="fas fa-arrow-left"></i>
      </div>
      <div class="sidebar-header">
          <h3>Klimostat</h3>
      </div>
      <ul class="list-unstyled components">
          <li>
              <router-link class="sidebarelement" to="/" tag="div">
                <i class="icon" :class="'fas fa-sign-in-alt'" />
                <span class="sidebar-text">Login</span>
              </router-link>
          </li>
          <li>
              <router-link class="sidebarelement" to="/Dashboard" tag="div">
              <i class="icon" :class="'fas fa-columns'" />
              <span class="sidebar-text">Dashboard</span>
              </router-link>
          </li>
          <li>
              <router-link class="sidebarelement" to="/compare" tag="div">
              <i class="icon" :class="'fas fa-exchange-alt'" />
              <span class="sidebar-text">Compare</span>
              </router-link>
          </li>
          <li>
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
          <li>
              <router-link class="sidebarelement" to="/" tag="div">
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
      <div>
        <router-view>
        </router-view>
      </div>
  </div>
</div>

</template>
<script>

export default {
  data(){
  return {
     toggle: document.documentElement.clientWidth < 768
  }
  }
  }
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "../styles/sidebar.css";
</style>
