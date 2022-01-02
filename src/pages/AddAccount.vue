<template>
  <h1>Add User</h1>
  <p>Add or delete User Accounts here</p>
  <form @submit.prevent="onClick">
    <div>
      <label>Email: </label>
      <input v-model="email" type="email" name="username" placeholder="Email" />
    </div>
    <div>
      <label>Passwort: </label>
      <input v-model="password" type="password" name="password" placeholder="Password" />
    </div>
    <div>
      <label>Repeat password: </label>
      <input v-model="secondPassword" type="password" name="password" placeholder="Password" />
    </div>
    <p :style="{ color: msgColor}" class="userMsg" v-if="successMsg != null">{{successMsg}}</p>
    <input class="createButton" type="submit" value="Create" />
  </form>
</template>

<script>
  export default {

  name: 'AddAccount',
  components: {
    
  },
  methods: {
    onClick(e) {
      if (this.password == this.secondPassword) {
        this.msgColor = "green"
        this.successMsg = "You Successfully created a new user"
      } else {
        this.msgColor = "red"
        this.successMsg = "There was an error while creating the user"
      }
      
    }
  },
  data() {
    return {
      email: '',
      password: '',
      secondPassword: '',
      successMsg: null,
      msgColor: "green"
    }
  },
}
</script>

<style scoped>
h1{
    margin-bottom: 50px;
}
div {
    margin-top: 10px;
    margin-bottom: 10px;
}
.createButton {
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