<template>
    <div>
        <h1>There has been an Error</h1>
        <p>{{msg}}</p>
    </div>
    <router-link @click="logOut" to="/" tag="button">Go to Login</router-link>
</template>

<script>
  export default {
  name: 'ErrorPage',
  components: {
  },
  data(){
      return {
          msg: this.ErrorMsg
      }
  },
  props: {
      ErrorMsg: {
          type: String ,
          default: "There was an Error while rquesting the Data. Maybe your loggin token has expired. Please log in again."
      } 
  },
  methods: {
    logOut(e) {
        this.$store.dispatch('logout')
    }
    }
}
</script>

<style scoped>
p {
    width: 70%;
    display: inline-block;
}
button {
  background-color: #1a2815;
  border: none;
  color: #dbff78;
  padding: 5px 20px;
  display: inline-block;
  font-size: 16px;
  margin-top: 30px;
}
</style>